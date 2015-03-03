// Use this function ot log into the system.
// The helper function, authenticateSession(), does not work here.
import config from 'portola/config/environment';

export default function initializeSession (contain, sess, content, route) {

  var container = contain || config.__container__;
  var session = sess || container.lookup('simple-auth-session:main');
  var applicationRoute = container.lookup('router:main');

  var store = container.lookup('store:main');
  //use raw payload push instead
  var applicant_json = content || JSON.parse(JSON.stringify(session.content));

  // Remove anything from a previous session
  if (applicant_json.currentApplicant){
    delete applicant_json.currentApplicant;
  }
  // if (applicant_json.co_signers){
  //   delete applicant_json.co_signers;
  // }

  // if (applicant_json.profiles){
  //   delete applicant_json.profiles;
  // }

  if (applicant_json.token){
    delete applicant_json.token;
  }

  if (applicant_json.email){
    delete applicant_json.email;
  }

  // if (applicant_json.property_managers){
  //   delete applicant_json.property_managers;
  // }

  // if (applicant_json.providers){
  //   delete applicant_json.providers;
  // }

  store.pushPayload('applicant', applicant_json);
  var applicant = store.getById('applicant', applicant_json.applicant.id);

  session.setProperties({
    token: applicant.get('authenticationToken'),
    email: applicant.get('email'),
    currentApplicant: applicant
  });

  // Redirect if a route is present
  if (route){
    var attemptedTransition = container.lookup("controller:login").get("attemptedTransition");
    if(attemptedTransition)
    {
      applicationRoute.transitionTo(attemptedTransition.intent.url);
    }
    else{
      applicationRoute.transitionTo('application');  
    } 
  }

}
