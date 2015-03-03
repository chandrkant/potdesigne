$(function() {
  
  /* button effect */
  var tg, tgqe, x, y = null;
  $(".pure-button,.btn").on('click',function(e){
    tg = $(this);
    if(tg.find('.qe').length == 0){
      tg.prepend("<span class='qe'></span>");
    }
    tgqe = tg.find(".qe");
    tgqe.removeClass("ani");
    if(!tgqe.height() && !tgqe.width()){
      var maxsz = Math.max(tg.outerWidth(), tg.outerHeight());
      tgqe.css({height: maxsz, width: maxsz});
    }
    x = e.pageX - tg.offset().left - tgqe.width()/2;
    y = e.pageY - tg.offset().top - tgqe.height()/2;
    tgqe.css({top: y+'px', left: x+'px'}).addClass("ani");
  })
  /* button effect */
  // chat panel ui
  /* CHAT is ICEBOXED
  $(".chat-window section").slideToggle();
  $(".chat-window .chatheading").on("click", function(){
    $(".chat-window section").slideToggle();
  });
*/
  // chat panel ui end

  
  // input validation
    $('.input-group input[required], .input-group textarea[required], .input-group select[required]').on('keyup change', function() {
  		var $form = $(this).closest('form'),
        $group = $(this).closest('.input-group'),
  			$addon = $group.find('.input-group-addon'),
  			$icon = $addon.find('span'),
  			state = false;
              
      	if (!$group.data('validate')) {
  			state = $(this).val() ? true : false;
  		}else if ($group.data('validate') == "email") {
  			state = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($(this).val())
  		}else if($group.data('validate') == 'phone') {
  			state = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/.test($(this).val())
  		}else if ($group.data('validate') == "length") {
  			state = $(this).val().length >= $group.data('length') ? true : false;
  		}else if ($group.data('validate') == "number") {
  			state = !isNaN(parseFloat($(this).val())) && isFinite($(this).val());
  		}
  
  		if (state) {
  				$addon.removeClass('danger');
  				$addon.addClass('success');
  				$icon.attr('class', 'glyphicon glyphicon-ok');
  		}else{
  				$addon.removeClass('success');
  				$addon.addClass('danger');
  				$icon.attr('class', 'glyphicon glyphicon-remove');
  		}
          
          if ($form.find('.input-group-addon.danger').length == 0) {
              $form.find('[type="submit"]').prop('disabled', false);
          }else{
              $form.find('[type="submit"]').prop('disabled', true);
          }
  	});
      
      $('.input-group input[required], .input-group textarea[required], .input-group select[required]').trigger('change');
      
      $('.form-control').on('focus blur', function(){
        $('.login-card').toggleClass('card-down');
      });
      
      $('#validate-email').on('focus blur', function(){
        $('.email-span').toggleClass('opacity-1');
      });
      
      $('#validate-password').on('focus blur', function(){
        $('.lock-span').toggleClass('opacity-1');
      });
      
      // input validation end
      
  
  
  
});