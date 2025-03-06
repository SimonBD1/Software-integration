const message = "Hello World!";
const encodedMessage = btoa(message);
console.log(encodedMessage);

const decodedMessage = atob(encodedMessage);
console.log(decodedMessage);