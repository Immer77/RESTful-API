const fetch = require('node-fetch');


let url = 'https://jsonplaceholder.typicode.com/posts/11';
let data = { userId: 111, title: 'titel', body: 'tekst' };
fetch(url, {
method: "PUT",
body: JSON.stringify(data),
headers: { 'Content-Type': 'application/json' }
})
.then(response => {
if (response.status >= 400)
throw new Error(response.status);
else
return response.json();
})
.then(resultat => console.log(`Resultat: %o`, resultat))
.catch(fejl => console.log('Fejl: ' + fejl));