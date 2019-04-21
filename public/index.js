import { Socket } from './modules/socket.js';
import { Username } from './modules/username.js';
import { Messages } from './modules/messages.js';
import { MessageForm } from './modules/message-form.js';
import { TypingMessage } from './modules/typing-message.js';
import { UsersList } from './modules/users-list.js';

document.addEventListener('DOMContentLoaded', () => {
  const socket = new Socket();
  const username = new Username('#username');
  const messages = new Messages('#messages');
  const messageForm = new MessageForm('#messageForm');
  const typingMessage = new TypingMessage('#typing');
  const usersList = new UsersList('#user-list');

  socket.onSetUsername( ({name, timestamp, userList}) => {
    username.render(name);
    usersList.render(userList);
    messages.renderSystemMessage(`${name} assigned to you.`, timestamp);
  });

  socket.onUserJoined( ({name, timestamp, userList}) => {
    usersList.render(userList);
    messages.renderSystemMessage(`${name} joined.`, timestamp);
  });

  socket.onUserLeft( ({name, timestamp, userList}) => {
    usersList.render(userList);
    messages.renderSystemMessage(`${name} left.`, timestamp);
  });

  messageForm.onSubmit(message => {
    socket.emitChatMessage(message);
  });

  socket.onChatMessage( ({name, message, timestamp}) => {
    messages.renderMessage(name, message, timestamp);
  });

  socket.onSelf( ({message, timestamp}) => {
    messages.renderMessage('ME', message, timestamp);
  });

  messageForm.onFocus( () => {
    socket.emitTyping();
  });

  messageForm.onBlur( () => {
    socket.emitStopTyping();
  });

  socket.onTyping( ({name}) => {
    typingMessage.render(name);
  });

  socket.onStopTyping( () => {
    typingMessage.clear();
  });

});
