import Ember from "ember";
import config from 'portola/config/environment';

export default Ember.Mixin.create({

  statusChangeCallback: function(response){
    var self=this;
    var FB=Ember.get('FB');
    if (response.status === 'connected') {
      self.testAPI();
    } else if (response.status === 'not_authorized') {
      FB.login();
    } else {
     FB.login(function(response){
       if (response.authResponse) {
        self.testAPI();
      } else {
        self.set('authErrorMessage','User cancelled login or did not fully authorize.');
        console.log('User cancelled login or did not fully authorize.');
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
    var self = this;
    var email = null;
    var name = null;
    var uid = response.id;
    if (provider === 'linkedin'){
      email = response.emailAddress;
      name = response.firstName+' '+response.lastName;
    }else{
      email = response.email;
      name = response.name;
    }
    var adapter = this.container.lookup('adapter:application');
    Ember.$.ajax({url :adapter.host+"/v2/sessions/add_providers",
      type: "POST",
      xhrFields:{withCredentials: true},
      data:{
        'provider[uid]' : uid,
        'provider[provider]' : provider,
        'provider[email]' :  email,
        'provider[name]' :  name,
        'link_account' : true,
        'applicant_id' : self.session.get('currentApplicant.id')
      },success:function(data){
        self.session.setProperties({
          applicant:data.applicant
        });
        Ember.RSVP.hash({
          providers: self.store.find('provider'),
          applies: self.store.find('apply',{count:3}),
          starred_properties: self.store.find('starred_property',{count:3})
        });
      },error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.status);
        self.set('authErrorMessage',errorThrown);
        console.log(errorThrown);
      }
    });
  },
  onLinkedInAuth: function() {
    var self = this;
    var IN=Ember.get('IN');
    IN.API.Profile("me")
    .fields("id","firstName", "lastName", "email-address")
    .result(function(me){
      self.displayProfiles(me);
    });
  },
  displayProfiles: function(profiles) {
    var self = this;
    var member = profiles.values[0];
    self.providerSession(member,'linkedin');
  },

  actions:{
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
    linkedinSignIn: function(){
      var self = this;
      var IN=Ember.get('IN');
      IN.User.authorize(function(){
       IN.Event.on(IN, "auth", self.onLinkedInAuth());
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
                type:'get',
                success:function(response){
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
