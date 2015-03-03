import Ember from 'ember';
import ApplicantMixin from 'portola/mixins/applicant';

module('ApplicantMixin');

// Replace this with your real tests.
test('it works', function() {
  var ApplicantObject = Ember.Object.extend(ApplicantMixin);
  var subject = ApplicantObject.create();
  ok(subject);
});
