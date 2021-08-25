import http from 'http';
import express from 'express';

import { Server } from 'socket.io';

import IOEVENTS from './public/io-events.js';
import dayjs from 'dayjs';

const PORT = 1337;

const app = express();
const httpServer = http.createServer(app);
const socketServer = new Server(httpServer);

app.use(express.static('public'));
app.use(express.static('www'));

httpServer.listen(PORT, () => {
    console.log(`Server listening on *:${PORT}`);
});


//TODO: Connexion des clients


async function newUser(socket) {

}


async function sendUserIdentities() {
    
}

function randomAvatarImage() {
    const avatarNumber = Math.floor(Math.random() * 8 + 1);
    return `./images/avatar${avatarNumber}.png`;
}