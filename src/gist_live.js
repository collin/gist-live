function gist_id() {
  return window.location.pathname.replace('/', '');
}
function open_proxy() {
  proxy = jQuery("<iframe id='live-gist-proxy' />");
  (function($this) {
    $this.append(proxy);
})(jQuery("body"));
  proxy.width(1).height(1);
  proxy.css({visibility:'hidden', position:'absolute', top:0});
  proxy[0].src = "http://localhost:8001//proxy.html";
}
function open_message_runner() {
  runner = jQuery("<iframe id='live-gist-message-runner' />");
  (function($this) {
    $this.append(runner);
})(jQuery("body"));
  runner.width(1).height(1);
  runner.css({visibility:'hidden', position:'absolute', top:0});
}
jQuery.fn.gist_file_name = function() {
  var $this = this;
  return $this.prev().find('span').eq(0).text();
};
jQuery.fn.gist_content = function() {
  var $this = this;
  return $this.parents('.file').find('pre:last').text();
};
jQuery.fn.begin_edit = function(store) {
  var $this = this;
  editAreaLoader.window_loaded();
  editAreaLoader.init({id : "gist-live-text-area",start_highlight: true,toolbar: "search, go_to_line, |, undo, redo, |, highlight, reset_highlight, syntax_selection",allow_toggle: true });
  editAreaLoader.setValue("gist-live-text-area", store.gist_content());
  return $this.running_diff();
};
function editing_gist_value() {
  return editAreaLoader.getValue("gist-live-text-area");
}
jQuery.fn.set_previous_gist_value = function() {
  var $this = this;
  return $this.data("previous-gist-value", editing_gist_value());
};
jQuery.fn.previous_gist_value = function() {
  var $this = this;
  return $this.data("previous-gist-value");
};
jQuery.fn.generate_gist_patch = function() {
  var $this = this;
  var dmpfffffffffffe(), editing_gist_value());
  return dmp.patch_toText(patch);
};
var patch;
jQuery.fn.running_diff = function() {
  var $this = this;
  $this.set_previous_gist_value();
  setInterval(function() {patch = ($this.generate_gist_patch());($this.set_previous_gist_value());;
  }, 500);;
  return $this;
};
function message_runner_loop() {
  var frame = runner[0];
  frame.contentWindow.name = "";
  if(patch) {frame.contentWindow.name = JSON.stringify({method: 'diff', args: [patch]});patch = "";;
  };
  frame.src = "http://localhost:8001//x.html";
  var i = setInterval(function() {var ready = false;try {ready = (frame.contentWindow.location.host == "gist.github.com");}catch(e) {};if(ready) {clearInterval(i);if(frame.contentWindow.name) {jQuery(JSON.parse(frame.contentWindow.name)).each(function(which, patch) {console.log(patch);})}message_runner_loop();};
  }, 50);
}
jQuery.fn.edit_live_link = function() {
  var $this = this;
  $this.each(function() {var it = jQuery(this).append(edit_link.clone());it.data('gist-live.file-name', it.gist_file_name());it.data('gist-live.gist-id', gist_id());;
  });
  (function($this) {
    $this.bind("click", function(e) {
      var $this = jQuery(this);
      var store = $this;
      (function($this) {
        $this.fadeIn(function(){});
        $this.begin_edit(store);
        open_proxy();
        open_message_runner();
        message_runner_loop();
})(jQuery("#live-edit-panel"));
});
})($this.find(".gist-live-edit-link"));
  return $this;
};
(function($this) {
  $this.append(welcome_dialog);
  (function($this) {
    $this.append(live_edit_panel);
})($this.find("#main > .site"));
})(jQuery("body"));
(function($this) {
  $this.edit_live_link();
})(jQuery(".file .meta .actions"));
(function($this) {
  $this.hide();
})(jQuery("#live-edit-panel"));
(function($this) {
  $this.hide();
  $this.center();
  $this.gradient({ from: '003366', to: '333333', position:'bottom'});
  $this.corner('wicked 20px');
  $this.fadeIn(1000, function(){jQuery(this).fadeOut(3000, function() {jQuery(this).remove()})});
  (function($this) {
    $this.css('opacity', 0.05);
})($this.find(".gradient"));
  (function($this) {
    $this.css('display', '');
})(jQuery("#gist-live-welcome :hidden"));
})(jQuery("#gist-live-welcome"));