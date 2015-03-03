import { test, moduleFor } from 'ember-qunit';

moduleFor('controller:sign-up', 'SignUpController', {
  // Specify the other units that are required for this test.
  needs: ['controller:application','controller:co-signers/co-sign-property']
});

// Replace this with your real tests.
test('it exists', function() {
  var controller = this.subject();
  ok(controller);
});
