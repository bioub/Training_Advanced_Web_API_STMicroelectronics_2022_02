// https://github.com/tc39/proposals


// class Contact {
//   name = 'Romain'; // ES2022
//   hello = () => { // ES2022
//     console.log(this.name);
//   }
//   helloAsync() {
//     setTimeout(this.hello, 1000);
//   }
// }

// const romain = new Contact();
// romain.helloAsync();

class Contact { // ES2015
  constructor() {
    this.name = 'Romain';
    this.hello = this.hello.bind(this); // ES5
  }
  hello() {
    console.log(this.name);
  }
  helloAsync() {
    setTimeout(this.hello, 1000);
  }
}

// Contact.prototype.bye = function() {}

// HelloWorld.prototype.connectedCallback.call(this)

// const romain = new Contact();
// romain.helloAsync();

// constructor function
// function Contact() {
//   this.name = 'Romain';
//   this.hello = this.hello.bind(this);
// }

// Contact.prototype.hello = function() {
//   console.log(this.name);
// };

// Contact.prototype.helloAsync = function() {
//   setTimeout(this.hello, 1000);
// };

const romain = new Contact();
romain.helloAsync();

console.log(typeof Contact); // function
console.log(typeof Contact.prototype.helloAsync); // function

romain['hasOwnProperty'] // Object.prototype.hasOwnProperty