// AJAX
// Asynchronous JavaScript and XML
export function fetchUserById(id) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://localhost:9000/users/' + id);
  
    // xhr.onload = function() { }
    xhr.addEventListener('load', () => {
      if (xhr.status === 200 || xhr.status === 304) {
        const user = JSON.parse(xhr.responseText);
        resolve(user);
      } else {
        reject(new Error('Bad Status : ' + xhr.status));
      }
    });
  
    xhr.send();
  });
}
