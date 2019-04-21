import { Socket } from './modules/socket.js';
import { Username } from './modules/username.js';
import { Messages } from './modules/messages.js';
import { MessageForm } from './modules/message-form.js';

document.addEventListener('DOMContentLoaded', () => {
  const socket = new Socket();
  const username = new Username('#username');
  const messages = new Messages('#messages');
  const messageForm = new MessageForm('#messageForm');

  socket.onSetUsername( ({name, timestamp}) => {
    username.render(name);
    messages.renderSystemMessage(`${name} assigned to you.`, timestamp);
  });

  socket.onUserJoined( ({name, timestamp}) => {
    messages.renderSystemMessage(`${name} joined.`, timestamp);
  });

  socket.onUserLeft( ({name, timestamp}) => {
    messages.renderSystemMessage(`${name} left.`, timestamp);
  });

  messageForm.onSubmit(message => {
    socket.emitChatMessage(message);
  });

  socket.onChatMessage( ({name, message, timestamp}) => {
    messages.renderMessage(name, message, timestamp);
  });
});
