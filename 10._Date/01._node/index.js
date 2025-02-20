console.log(Date.now()); // UNIX timestamp
console.log(new Date()); // UTC time standard iso 8601
console.log(new Date().toLocaleString()); // Local time
console.log(new Date().toUTCString()); // UTC time
console.log(new Date().toISOString()); // ISO 8601

danishdate = new Date().toLocaleString('da-DK', { timeZone: 'Europe/Copenhagen' }); // 