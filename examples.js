const fetch = require("node-fetch");
const userUrl = "https://reqres.in/api/users"

async function post(url){
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'User 1'
        })
    });
    if(response.status !== 201){
        throw new Error(response.status);
    }
    return await response.json();
}


async function main(){
    let userData;
    try {
        userData = await post(userUrl);
        console.log(userData)
    } catch (fejl) {
        console.log(fejl);
    }
}

main();
