;(function($,window){
  $('.close-btn').on({
    click: function(e){
      e.preventDefault();
      window.opener.parentFn( $('#addressN').val(), $('#addressD').val() );
      window.close();
    }
  });
})(jQuery,window);