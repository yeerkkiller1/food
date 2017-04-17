var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('Connection Closed');
    });
    connection.on('message', function(message) {
		console.log('Got message', message);
		if (message.binaryData) {
			console.log(message.binaryData.toString('hex'));
		}
    });

    function sendNumber() {
        if (connection.connected) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            connection.sendUTF(JSON.stringify([ "okaygo", 2560, 1440, 2 ]));
            setTimeout(sendNumber, 1000);
        }
    }
    sendNumber();
});

client.connect('ws://45.63.27.96:8080/');
