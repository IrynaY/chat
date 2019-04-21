export class TypingMessage {
  constructor(selector) {
    this.node = document.querySelector(selector);
  }

  render = (name) => {
    this.node.innerHTML += `${name} typing...`
  }

  clear = (name) => {
    this.node.innerHTML = ''
  }
}