const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const port = 3000;

let taxiSocket = null;
let passengerSocket = null;
let routeResponse = null;

io.on('connection', socket => {
    console.log('a user connected :)');
    socket.on('taxiRequest', routeResponse => {
        //console.log(routeResponse);
        //io.emit('chat message', msg);
        passengerSocket = socket;
        console.log('Someone is looking for a Taxi!')
        if(taxiSocket != null){
            taxiSocket.emit('taxiRequest', routeResponse);
            //routeResponse = routeResponse
        }
    });

    socket.on('lookingForPassenger', () => {
        console.log('Someone is looking for a passenger');
        taxiSocket = socket;
        //routeResponse ? taxiSocket.emit('taxiRequest', routeResponse) : null;
    })

    socket.on('driverLocation', (driverLocation) => {
        console.log(driverLocation);
        passengerSocket.emit('driverLocation', driverLocation);
    });
    
    
});

server.listen(port, () => console.log('Server running on port ' + port ));