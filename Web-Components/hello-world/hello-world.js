const templateEl = document.createElement('template');
templateEl.innerHTML = `
<style>
:host {
  display: block;
}
:host(:hover) {
  background-color: var(--hello-bg-hover-color, purple);
}
:host-context(div) {
  background-color: yellow;
}
label:hover {
  background-color: coral;
}
label {
  background-color: aqua;
}
</style>
<label>Name:</label>
<input type="text" placeholder="Enter a name here" id="name">
<hr>
<h1>Hello <span id="output"></span>!</h1>
`;

class HelloWorld extends HTMLElement {
  static observedAttributes = ['name'];
  get name() {
    return this.getAttribute('name');
  }
  set name(val) {
    this.setAttribute('name', val);
  }
  get age() {
    return Number(this.getAttribute('age'));
  }
  set name(val) {
    this.setAttribute('name', String(val));
  }
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.append(templateEl.content.cloneNode(true));
    this.shadow.querySelector('#name').addEventListener('input', this.handleInput);
  }
  handleInput = (event) => {
    this.setAttribute('name', event.target.value);
  }
  attributeChangedCallback(name, oldValue, newValue) {
    this.shadow.querySelector('#name').value = newValue;
    this.shadow.querySelector('#output').innerText = newValue;
  }
  disconnectedCallback() {
    this.shadow.querySelector('#name').removeEventListener('input', this.handleInput);
  }
}

customElements.define('hello-world', HelloWorld);
