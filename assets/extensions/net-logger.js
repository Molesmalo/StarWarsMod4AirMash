"use strict";

!function() {

    WebSocket.prototype._send = WebSocket.prototype.send;
    WebSocket.prototype.send = function (data) {
        // your logging code here
        console.log("sent", data);

        WebSocket.prototype._send.apply(this, [data]);
    };


    function received(event)
    {
        console.log("received", event.data);
    }

    // from:  https://stackoverflow.com/questions/33712810/listening-to-a-websocket-connection-through-prototypes
    let ws = window.WebSocket;
    window.WebSocket = function (a, b) {
       var that = b ? new ws(a, b) : new ws(a);
       that.addEventListener("open", console.info.bind(console, "socket open"));
       that.addEventListener("close", console.info.bind(console, "socket close"));
       that.addEventListener("message", console.info.bind(console, "socket msg"));
       that.addEventListener("message", received);
       return that;
    };    
    window.WebSocket.prototype=ws.prototype; 
    

    // Finally, we register the file as an extension
    SWAM.registerExtension({
        name: "Net Logger",
        id: "SWAM_NetLogger",
        description: "Intercept airmash packets at the ws level.",
        author: "Bombita",
        version: "0.1"
    });
}();