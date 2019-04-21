export class Messages {
  constructor(selector) {
    this.node = document.querySelector(selector);
  }

  renderMessage = (username, message, timestamp) => {
    this.node.innerHTML += `${new Date(timestamp).toLocaleTimeString('en-US',  { hour12: false })} [<b>${username}</b>]: ${message}\n`
  }

  renderSystemMessage = (message, timestamp) => {
    this.renderMessage('SYSTEM', message, timestamp)
  }
}