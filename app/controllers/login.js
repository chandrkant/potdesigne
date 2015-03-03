import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';
import Ember from 'ember';
import config from 'portola/config/environment';

var loginController  = Ember.Controller.extend(LoginControllerMixin,{
  authenticator: 'simple-auth-authenticator:devise',
  authErrorMessage: null,

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

  },{scope: 'email,user_likes'});

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
  Ember.$.ajax({url : adapter.host+"/v2/sessions/add_providers",
    type: "POST",

    data:{
      'provider[uid]' : response.id,
      'provider[provider]' : provider,
      'provider[email]' :  response.email,
      'provider[name]' :  response.name,
      'provider[facebook_image]' :  fimage,
      'provider[google_image]' :  gimage
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
     var attemptedTransition = self.get('attemptedTransition');
     if (attemptedTransition) {
      attemptedTransition.retry();
      self.set('attemptedTransition', null);
    } else {

      self.transitionToRoute('application');
    }
    var date = new Date();
    var minutes = 120;
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    Ember.$.cookie("authentication_token",data.applicant.email,{ expires: date });
    self.transitionToRoute('application');

  },error: function(jqXHR, textStatus, errorThrown) {
    self.set('authErrorMessage',errorThrown);
  }
});

},

actions :{
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
  },
  googleSignIn: function(){
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

export default loginController;
