import Ember from 'ember';

export default Ember.View.extend({

  didInsertElement: function() {
  	var $ = Ember.$;
    $('#signin').click( function() {
  		$('.navbar-toggle').click();
  	});
  	$('#signup').click( function() {
  		$('.navbar-toggle').click();
  	});
	

		var flag = true;
		$(window).scroll(function() {

			if ($(window).scrollTop() > 100 && flag) {
			
				animateVelocity();
			
			}
		});
		animateVelocity();
		function animateVelocity() {
			if ($(window).scrollTop() > 100 && flag) {
				flag = false;
				$('.first-item').velocity({
					translateX : "0",
					rotateZ : "-69"
				}, 0, function() {
					$('.first-item').velocity({
						translateX : "274",
						rotateZ : "-0"
					}, 500);
				});
				$('.second-item').velocity({
					translateX : "0",
					rotateZ : "-30"
				}, 0, function() {
					$('.second-item').velocity({
						translateX : "162",
						rotateZ : "-0"
					}, 500);
				});
				$('.fourth-item').velocity({
					translateX : "0",
					rotateZ : "30"
				}, 0, function() {
					$('.fourth-item').velocity({
						translateX : "-224px",
						rotateZ : "-0"
					}, 500);
				});
				$('.fifth-item').velocity({
					translateX : "0",
					rotateZ : "69"
				}, 0, function() {
					$('.fifth-item').velocity({
						translateX : "-327",
						rotateZ : "-0"
					}, 500, function() {
					$(".fifth-item").velocity({
						scale : 1.5
					}, function() {
					$(".paper-item").velocity({
						opacity : 0
					});
					$(".Rental-form-wrapper").velocity({
						opacity : 1
					}, function() {
					$('.left-div').velocity({
						left : 0
					}, 800);
					$('.right-div').velocity({
						right : 0
					}, 500);
					});
					});
					});
				});

				setTimeout(function() {

				}, 3000);
			}
		}
	
		var Snap = Ember.get('Snap');
		var logo = Snap.select("#logo"), glass = logo.select("#glass");
			animateGlass();
				function animateGlass() {
					if($(window).width()>767){
		 				glass.animate({
		 					transform : "t0,-2"
		 				}, 100, mina.backin, function() {

		 					glass.animate({
		 						transform : "t0,0"
		 					}, 100, mina.backin, function() {

		 						glass.animate({
		 							transform : "t0,-2"
		 						}, 100, mina.backin, function() {

		 							glass.animate({
		 								transform : "t0,0"
		 							}, 100, mina.backin);
		 						});
		 					});
		 				});
					}
		 		}


				$("#logo").hover(animateGlass, function() {
						glass.stop();
						glass.animate({
							transform : "t0,0"
					}, 100, mina.backin);
				});

  }
});
