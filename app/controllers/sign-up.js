import Ember from 'ember';
import config from 'portola/config/environment';

export default Ember.ObjectController.extend({

	needs: ['application','co-signers/co-sign-property'],
  authErrorMessage: null,
  transition: Ember.computed.alias("controllers.co-signers/co-sign-property.transition"),
  statusChangeCallback: function(response){
    var self=this;
    var FB=Ember.get('FB');
    if (response.status === 'connected') {
      self.testAPI();
      self.transitionToRoute('application');
    } else if (response.status === 'not_authorized') {
      FB.login();
    } else {
     FB.login(function(response){
       if (response.authResponse) {
        self.testAPI();
      } else {
        self.set('authErrorMessage','User cancelled login or did not fully authorize.');
      }

    },{scope: 'email,user_likes'}
    );
   }
 },
 testAPI: function(){
  var self=this;
  var FB=Ember.get('FB');
  FB.api('/me', function(response) {
    self.providerSession(response,'facebook');

  },
  {scope: 'email,user_likes'}
  );

},
providerSession:function(response,provider){
  var self=this;
  var adapter = this.container.lookup('adapter:application');
  var fimage='';
  var gimage='';
  if(provider==='facebook')
  {
    fimage="https://graph.facebook.com/"+response.id+"/picture?type=large";
  }
  else if(provider==='google')
  {
    gimage=response.picture;
  }
  Ember.$.ajax({url :adapter.host+"/v2/sessions/add_providers",
    type: "POST",
    xhrFields:{withCredentials: true},
    data:{
      'provider[uid]' : response.id,
      'provider[provider]' : provider,
      'provider[email]' :  response.email,
      'provider[name]' :  response.name,
      'provider[facebook_image]' : fimage,
      'provider[google_image]' : gimage
    },success:function(data){
      var applicant = data.applicant;
      var session = self.container.lookup('simple-auth-session:main');
      session.setProperties({
        isAuthenticated: true,
        authenticator: 'simple-auth-authenticator:devise',
        token: applicant.authenticationToken,
        email: applicant.email,
        applicant: applicant,
        co_signers: data.co_signers,
        profiles: data.profiles,
        property_managers: data.property_managers,
        providers: data.providers,
      });
      self.transitionToRoute('application');

    },error: function(jqXHR, textStatus, errorThrown) {
      self.set('authErrorMessage',errorThrown);
    }
  });
},

actions:{
  registration: function() {
    var me;
    me = this;
    var formData = Ember.$("#applicant-registration-form").serialize();
    var adapter = me.container.lookup('adapter:application');
    if (true){
      Ember.$.ajax({
        url: adapter.host+'/applicants',
        xhrFields:{withCredentials: true},
        processData: false,
      			// contentType: false,
            type: "POST",
            data: formData,

            success:function(response){

              var applicant = response.applicant;
              if (applicant !== undefined){


                // var date = new Date();
                // var minutes = 120;

                // me.set("currentUser",response.applicant);

                // date.setTime(date.getTime() + (minutes * 60 * 1000));

                // Ember.$.cookie("authentication_token",response.applicant.email,{ expires: date });
                var session = me.container.lookup('simple-auth-session:main');
                session.setProperties({
                  isAuthenticated: true,
                  authenticator: 'simple-auth-authenticator:devise',
                  token: applicant.authentication_token,
                  email: applicant.email,
                  applicant: applicant
                });

                var attemptedTransition = me.get('transition');
                if(attemptedTransition){
                  attemptedTransition.retry();
                  me.set('transition',null);
                }
                else{
                  me.transitionToRoute('auth.payment');
                }
              }else{
                var i;
                var data = "";
                for (i = 0; i < response.error.length; ++i) {

                  data = data+'<li class="list-group-item">'+response.error[i]+'</li>';
                }
                Ember.$("#applicant-registration-error-messages-container").html('<ul class="list-group">'+data+'</ul>');
                Ember.$("#applicant-registration-success-message-container").hide();
                Ember.$("#applicant-registration-error-messages-container" ).show();
              }
            },
            error: function(response) {
              var i;
              var data = "";
              for (i = 0; i < response.responseJSON.error.length; ++i) {

                data = data+'<li class="list-group-item">'+response.responseJSON.error[i]+'</li>';
              }
              Ember.$("#applicant-registration-error-messages-container").html('<div class="panel-heading">Uh oh! Your Tenant Registration has the following issues:</div><div class="panel-body"><ul class="list-group">'+data+'</ul><p>Please make the necessary changes and try again.</p></div>');
              Ember.$("#applicant-registration-success-message-container").hide();
              Ember.$("#applicant-registration-error-messages-container" ).show();
            }
          });
}

},
cancel: function(){
  return this.transitionToRoute('application');
},
checkLoginState: function(){
  var self=this;
  var FB=Ember.get('FB');
  FB.init({
    appId  : config.APP.FACEBOOK_APPID,
    status : true,
    cookie : true,
    xfbml  : true
  });
  FB.getLoginStatus(function(response) {
    self.statusChangeCallback(response);
  });
},googleSignIn: function(){
  var self=this;
  var gapi=Ember.get('gapi');
  var myParams = {
   'clientid' : config.APP.GOOGL_CLIENT_ID,
   'cookiepolicy' : config.APP.COOKIEPOLICY,
   'callback':  function(data){
    if(data['status']['signed_in']){
      var access_token=data['access_token'];

      if (data['status']['method'] === 'PROMPT') {
        Ember.$.ajax({
         url: config.APP.GOOGLE_USER_USERINFO_URL+access_token,
         dataType: "jsonp",
         jsonp : "callback",
         type:'get',success:function(response){
          self.providerSession(response,'google');

        },
        error: function(jqXHR, textStatus, errorThrown) {
          if(errorThrown ==='Unauthorized'){
            self.set('authErrorMessage',"Invalid Username or Password");
          }else{
            self.set('authErrorMessage',errorThrown);
          }

        }
      });
      }
    }
    else{
     console.log(data);
   }
 },
 'scope' : config.APP.GOOGL_CLIENT_SCOPE
};
gapi.auth.signIn(myParams);
}

}


});

