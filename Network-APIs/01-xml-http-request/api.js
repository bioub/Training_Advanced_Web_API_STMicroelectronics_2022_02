// AJAX
// Asynchronous JavaScript and XML
export function fetchUserById(id) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://jsonplaceholder.typicode.com/users/' + id);

  // xhr.onload = function() { }
  xhr.addEventListener('load', () => {
    const user = JSON.parse(xhr.responseText);
    console.log(user);
  });

  xhr.send();
}
