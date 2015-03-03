import DS from 'ember-data';

export default DS.Model.extend({
  fullName:           DS.attr('string'),
  firstName:          DS.attr('string'),
  lastName:           DS.attr('string'),
  email:              DS.attr('string'),
  authenticationToken:DS.attr('string'),
  avatar:             DS.attr('string', {defaultValue: "https://073c0e0cd96b8ddfddbc6592f60b54fa75cf5284.googledrive.com/host/0B9LVk4xbDIJTbEZRaGI4SG9HVGc/user-icon.svg"}),
  avatarFileName:     DS.attr('string'),
  google:             DS.attr('boolean'),
  facebook:           DS.attr('boolean'),
  linkedin:           DS.attr('boolean'),
  providers:          DS.hasMany('provider', {async: true}),
  profile:            DS.belongsTo('profile', {async: true}),
  starredProperties:  DS.hasMany('starred-property',{async: true}),
  propertyManager:    DS.belongsTo('property-manager', {async: true})
});
