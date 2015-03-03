import Ember from 'ember';

export default Ember.ArrayController.extend({
  successTransaction: null,
  errorMessage:null,
  actions:{
    brainTreeAction:function(){
      var $=Ember.$;
      var Braintree=Ember.get('Braintree');
      var me=this;
      var adapter = this.container.lookup('adapter:application');
      var message="";
      var applicant_id=this.session.get('currentApplicant.id');
      me.set('errorMessage',null);
      me.set('successTransaction',null);
      var braintree = Braintree.create('MIIBCgKCAQEA02ZOdtD3s537KPCRBXeKSLypMOeyB+T9u6YWgEytP181qAP31xZ2jGkwJgCaxZJZhQZavmKenN+hf2JYaddmF7itc9lB0I1BnUeOu2OQV0bkQl4aQ2Rl7g88aPV469DyU7AsV8VYFnl8ZgZxTGJnBk/m7safmdHq2w2NNLzaC9t5B6aqoNMXxVh0qFxKeWmTmV8g3yy8nNugJPLDD52jgBxYQjtFDytx9eTRsIVL6qabLyXaArBTL5t1uEeMydZAR6QpyFt8TYWO2ftsH16j3X9XO6leBzCql/bhEGxfrEs8DrEOMEm6iLMUoBPZ2i5hboR7rmfC1K7LN0spuoWa5QIDAQAB');
      braintree.onSubmitEncryptForm('transaction_form');
      Ember.$.ajax({ type:'post' ,
        url : adapter.host+'/v2/transactions',
        xhrFields:{withCredentials: true},
        data:{
         'card[card_no]': $('#card_no').val(),
         'card[cvv]':$('#cvv').val(),
         'card[mm]':$('#mm').val(),
         'card[yyyy]':$('#yyyy').val(),
         'card[applicant_id]':applicant_id
        },
        success:function(res){
          me.session.setProperties({
            'applicant.payment':true
          });
          $('#card_no').val('');
          $('#cvv').val('');
          $('#mm').val('');
          $('#yyyy').val('');
          message="Your transaction has successfully completed for $ "+res.transaction.amount+" with transaction id "+res.transaction.transaction_id;
          me.set('successTransaction',message);
          me.transitionToRoute('application');
        },
        error: function (res) {
          me.set('errorMessage',JSON.parse(res.responseText).errors);
        }
      });
    },
    close: function(){
      return this.transitionToRoute('application');
    }
  }
});

