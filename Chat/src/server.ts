/// <reference path='../typings/node/node.d.ts' />
/// <reference path='../typings/ws/ws.d.ts' />

'use strict';

import WebSocket = require('ws');
import models = require('./models');

module Chat {

    var port: number = process.env.PORT || 3000;
    var WebSocketServer = WebSocket.Server;
    var server = new WebSocketServer({ port: port });

    server.on('connection', ws => {
        ws.on('message', message => {
            try {
                var userMessage: models.UserMessage = new models.UserMessage(message);
                broadcast(JSON.stringify(userMessage));
            } catch (e) {
                console.error(e.message);
            }
        });
    });

    function broadcast(data: string): void {
        server.clients.forEach(client => {
            client.send(data);
        });
    };

    console.log('Server is running on port', port);

}
