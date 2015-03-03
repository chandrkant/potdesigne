import Ember from 'ember';
export default Ember.Component.extend({
type: "file",
init: function (){
var self = this;
this._super();
self.fileToUpload = null;
self.fileLimit = 10;
self.fileReader = new FileReader();
self.fileReader.onload = function (e) {
self.set('fileToUpload',e.target.result);
var prop = 'object.'+ self.get('property');
self.set(prop, self.fileToUpload);
Ember.run.next(function(){
Ember.$('.image-holder img').attr('src',self.fileToUpload);

});
};
},
change: function (evt) {
var self = this;
var input = evt.target;
if (input.files && input.files[0]){
if (input.files[0].size/1000000 <= this.fileLimit){
self.fileReader.readAsDataURL(input.files[0]);
} else {
Ember.$(input).val('').blur();
alert("File is too big, must be under "+ this.fileLimit + "megabytes.");
}
}
},
save: function () {
this.object.save().then();
}
});
