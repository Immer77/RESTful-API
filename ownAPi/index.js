// med () efter for at initializere den
const express = require('express');
const app = express();
// vælg port
const PORT = 8080;


// Middleware for at håndtere blandt andet post, da express ikke per automatik læser det som json format.
// Så det oversætter json før det rammer vores funktion
app.use(express.json());

// Middleware er delt kode der kører før vores endpoint callback altså (req,res) callback funktionen.


//------GET ENDPOINT-------------
// Her sætter vi en get, vi skal bruge en callback funktion til at håndtere det
// Denne callback funktion bliver kaldt når en klient laver en get request til os.
// Callback funktionen håndtere 2 parameter
// Request Er det data vi modtager og response er det vi sender tilbage
app.get('/tshirt', (req,res) =>{
    // Sender en status 200 OK
    // samt en send som er et data payload.
    res.status(200).send({
        tshirt: 'Green',
        size: 'Large'

    })

});

//------POST ENDPOINT-------------

// Samme som med get, dog med en tilføjet route parameter som kan få dynamiske værdier i url
// Når vi håndtere en post request er det fordi at brugeren gerne vil generere en ny tshirt på siden
app.post('/tshirt/:id', (req,res) => {

    // Vi skal have id'et fra url som bliver tilgængelig ved hjælp af req parameters
    const { id } = req.params;

    // Derudover skal vi have et logo for tshirten som ligger i bodyen
    const { logo } = req.body;

    if(!logo){
        res.send({
            message: "We need a logo!"
        })
    }

    res.send({response: `tshirt with ${logo} and ${id} has been created`})
})


// Sådan her starter vi den, med en port og ved at skrvive node . for at køre index.js filen
app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
    );