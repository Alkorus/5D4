import http from 'http';
import express from 'express';

import { Server } from 'socket.io';

import IOEVENTS from './public/io-events.js';
import dayjs from 'dayjs';
import { Socket } from 'dgram';

const PORT = 1337;

const app = express();
const httpServer = http.createServer(app);
const socketServer = new Server(httpServer);

app.use(express.static('public'));
app.use(express.static('www'));

httpServer.listen(PORT, () => {
    console.log(`Server listening on *:${PORT}`);
});


// Connexion des clients
socketServer.on(IOEVENTS.CONNECTION, async (socket) => {
    console.log(socket.id);

    await newUser(socket);

    socket.on(IOEVENTS.SEND, message => {
        //console.log(m.text);

        const messageToBroadcast = {
            text: message.text,
            sender: socket.data.identity,
            timestamp: dayjs()
        }
        
        socketServer.emit(IOEVENTS.RECEIVED, messageToBroadcast);
    });

    socket.on(IOEVENTS.CHANGE_NAME, newName => {
        //console.log(newName);
        socket.data.identity.name = newName.name;

        sendUserIdentities();
    });

    socket.on(IOEVENTS.DISCONNECT, reason => {
        console.log(reason);
        sendUserIdentities();
    });
});


async function newUser(socket) {
    const newUser = {
        id:socket.id,
        name:'Anonyme',
        avatar:randomAvatarImage()
    }

    socket.data.identity = newUser;

    await sendUserIdentities();
}


async function sendUserIdentities() {
    
    const sockets = await socketServer.fetchSockets();      //obtenir tous les clients connectés en se moment
    const users = sockets.map(s => s.data.identity);

    // Envoyer les informations de connexion à tous les clients
    socketServer.emit(IOEVENTS.USER_ONLINE,users)   // à tous les clients
}

function randomAvatarImage() {
    const avatarNumber = Math.floor(Math.random() * 8 + 1);
    return `./images/avatar${avatarNumber}.png`;
}