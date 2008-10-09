jQuery.fn.gist_text = function() {
  var $this = this;
  var map = $this.parents('.file').find('.highlight .line').map(function(){return jQuery(this).text();
  });
  var text = ([]).join.call(map, "\n");
  return text
};
jQuery.fn.gist_filename = function() {
  var $this = this;
  return $this.parents('.file').find('.info span').text();
};
function edit_link_events() {
  var $this = edit_link
  $this.bind("click", function(e) {
    var $this = jQuery(this);
    var gist_text = $this.gist_text();
    var filename = $this.gist_filename();
    (function($this) {
      $this.prepend(live_edit_panel);
      frames[0].name = JSON.stringify({text: gist_text,filename: filename
      });
      live_edit_panel.attr({src: 'http://localhost:8001//editor.html',id: 'live-edit-panel'
      });
})(jQuery("#gist_data"));
});
}
edit_link_events();
function append_live_edit_tools() {
  var $this = $(this) 
  $this.append(edit_link.clone(true));
}
(function($this) {
  $this.append(welcome_dialog);
  $this.prepend(styles);
  (function($this) {
    $this.each(append_live_edit_tools)  
})($this.find("#files .actions"));
})(jQuery("body"));
(function($this) {
  $this.hide();
  $this.center();
  $this.gradient({ from: '003366',to: '333333' ,position:'bottom'
  });
  (function($this) {
    $this.css('opacity', 0.05);
})($this.find(".gradient"));
  $this.corner('wicked 20px');
  function and_remove() {
    $this.remove();
}
  function hide_welcome() {
    $this.fadeOut(3000, and_remove);
}
  $this.fadeIn(1000, hide_welcome);
  (function($this) {
    $this.css('display', '');
})(jQuery("#gist-live-welcome :hidden"));
})(jQuery("#gist-live-welcome"));