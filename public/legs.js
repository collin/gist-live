jQuery(function(_){
  Legs = (function(socket){

    var remoteMethods = {
      patch:  function(patch) {
        patch = dmp.patch_fromText(patch)
        var old = editAreaLoader.getValue('editarea')
        var patched = dmp.patch_apply(patch, old)[0]
        last_value = patched
        editAreaLoader.setValue('editarea', patched)
      }
      ,uuid: function(uuid) {
        url = window.location+'#'+uuid;
        _.live_url = url;
        Legs.uuid = uuid;
        console.log("Legs: ", Legs);

        setTimeout(function(){
          _('body iframe').contents().find('#toolbar_1').html(url);
        }, 300);
        
        _.uuid = uuid;
      }
      ,edit: function(document) {
        editAreaLoader.setValue('editarea', document.data)
      }
      ,info: function() {
        //console.info(arguments)
      }
    };

    var id=0;

    function do_send() {
      var method = [].shift.apply(arguments);
      var payload = {id:id++, method: method, params:arguments};
      socket.send(JSON.stringify(payload)+"\r\n");
    }
    
    // Thanks http://github.com/Bluebie for the tip
    // about making sure a full message has been
    // send down the wire!
    var in_buffer = "";
    socket.onread = function(new_data) {
      //in_buffer = in_buffer + new_data;
      //var splitted = in_buffer.split("\n", 2);
      var splitted = new_data.split("\n", 2);
    
      //if (splitted.length == 1) {
      //  return;
      //} 
      //else {
      //  var message = splitted[0]; 
      //  in_buffer = splitted[1];
      //  var rpc = JSON.parse(message);
      //  if(remoteMethods[rpc.method]) remoteMethods[rpc.method].apply(null, rpc.params);
      
      jQuery(splitted).each(function() {
        if(this.length > 0) {
          console.log("rpc:", this)
          var rpc = JSON.parse(this);
          if(rpc.method)
            if(remoteMethods[rpc.method]) remoteMethods[rpc.method].apply(null, rpc.params);
        }
      })
    };

    function connect() {
      socket.open('localhost', '30274');
    }
    connect();
    
    socket.onclose = function() {
      connect();
      socket.do_send('reconnect');
    };

    return {
      begin_editing: function(data, file_name) {
        do_send('begin_editing', data, file_name);
      }
      ,diff: function(uuid, patch) { 
        do_send('diff', uuid, patch);
      }
      ,also_editing: function(uuid) {
        do_send('also_editing', uuid);
      }
    }
  })(new Orbited.TCPSocket());
});
