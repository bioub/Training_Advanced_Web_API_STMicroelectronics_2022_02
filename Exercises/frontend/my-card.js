export class MyCard extends HTMLElement {
  get src() {
    return this.getAttribute('src');
  }
  get likes() {
    return Number(this.getAttribute('likes'));
  }
  get cardId() {
    return Number(this.getAttribute('card-id'));
  }
  get cardTitle() {
    return this.getAttribute('card-title');
  }
  set src(val) {
    this.setAttribute('src', val);
  }
  set likes(val) {
    this.setAttribute('likes', String(val));
  }
  set cardId(val) {
    this.setAttribute('card-id', String(val));
  }
  set cardTitle(val) {
    this.setAttribute('card-title', val);
  }

  #imgEl;
  #h2El;
  #spanEl;

  static observedAttributes = ["src", 'likes', 'card-id', 'card-title'];


  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const styleEl = document.createElement('style');
    styleEl.innerText = `
    :host {
      border: 1px solid black;
      display: block;
      width: 200px;
      margin: 0 auto;
      text-align: center;
      cursor: pointer;
      user-select: none;
    }

    img {
      width: 100%;
    }
    `;

    this.#imgEl = document.createElement('img');
    this.#h2El = document.createElement('h2');
    this.#spanEl = document.createElement('span');
    
    this.shadowRoot.append(styleEl, this.#imgEl, this.#h2El, this.#spanEl);
  }
  attributeChangedCallback() {
    this.#render();
  }
  #render() {
    this.#imgEl.src = this.src;
    this.#h2El.innerText = this.title;
    this.#spanEl.innerText = this.likes + ' likes';
  }
}

customElements.define('my-card', MyCard);