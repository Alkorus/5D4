import IOEVENTS from '../../io-events.js';

const socket = io();

const users = [];

$(document).ready(() => {

    $("#btnSend").click(() => {
        
    
    });

    $("#txtMessage").keypress(e => {
       
    });

    $("#btnUpdateUsername").click(() => {
        
    })

});

//TODO: Réceptions des évenement


function createMessageUI(message, isFromMe) {
    let messageLi = "";

    if(isFromMe) {
        messageLi = 
            `<li class="chat-left">
                <div class="chat-avatar">
                <img src="${message.avatar}" alt="${message.name}">
                <div class="chat-name">${message.name}</div>
                </div>  
                <div class="chat-text">${message.text}</div>
                <div class="chat-hour">${dayjs(message.timestamp).format('HH:mm')} <span class="fa fa-check-circle"></span></div>
            </li>`;
    } else {
        messageLi = 
            `<li class="chat-right">
                <div class="chat-hour">${dayjs(message.timestamp).format('HH:mm')} <span class="fa fa-check-circle"></span></div>
                <div class="chat-text">${message.text}</div>
                <div class="chat-avatar">
                    <img src="${message.avatar}" alt="${message.name}">
                    <div class="chat-name">${message.name}</div>
                </div>
            </li>`
    }
   
    return messageLi;
}

function createUserUI(user){

    const userLi = 
        `<li class="person" data-chat="${user.id}">
            <div class="user">
                <img src="${user.avatar}" alt="${user.name}">
            </div>
            <p class="name-time">
                <span class="name">${user.name}</span>
            </p>
        </li>`;

    
    return userLi;

}


