// implemented from: https://github.com/alexdiliberto/emberconf-2014-demo/
/**
 Analytics Send Handlers - These help facilitate the communication between your code and your analytics
 library.
*/
//TODO: Replace this with the actual analytics library calls for your specific implementation
//  e.g.: ga('send', 'pageview', value);
//  e.g.: ga('send', 'event', 'button', 'click', 'nav buttons', value);
export default {
  route: function(information) { console.log('*** Page View: '+JSON.stringify(information)); },
  action: function(information) { console.log('*** Action: '+JSON.stringify(information)); }
};
