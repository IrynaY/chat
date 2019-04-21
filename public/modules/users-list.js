export class UsersList {
  constructor(selector) {
    this.node = document.querySelector(selector);
  }

  render = (list) => {
    this.node.innerHTML = '';
    const fragment = document.createDocumentFragment();
    list.forEach(user => {
      const li = document.createElement('li');
      li.innerHTML = user;
      fragment.append(li);
    });
    this.node.append(fragment)
  }

}