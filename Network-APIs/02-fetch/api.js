// AJAX
// Asynchronous JavaScript and XML
// export function fetchUserById(id) {
//   return fetch('https://jsonplaceholder.typicode.com/users/' + id)
//     .then((res) => res.json())
// }

export async function fetchUserById(id) {
  const res = await fetch('http://localhost:9000/users/' + id);
  return await res.json();
}
