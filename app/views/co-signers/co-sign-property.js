import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function() {
          setTimeout(function(){
		//Ember.$('.slider-for').slick({          
		Ember.$('.slider-for').slick({	   
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          fade: true,
          asNavFor: '.slider-nav'
      });
      Ember.$('.slider-nav').slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          asNavFor: '.slider-for',
          dots: false,
          centerMode: true,
          focusOnSelect: true
      });

		  },400);


  }
});