'use strict'
//richiamo il pacchetto npm request e quello fs
const request = require("request");
const fs = require("fs");
//mi creo una stringa che contenga l'url del sito a cui voglio fare la richiesta
const Url = "https://jsonplaceholder.typicode.com";
//creo un arrow function, passando come parametro una callback, per collegarmi al sito e richiedere gli utenti
const function_utenti = (callback) => {
//tramite una console log avverto che la richiesta è partita
    console.log("inviata richiesta  per gli utenti al server...");
//scrivo perciò all'interno la funzione request che prende come argomento error, response e body
    request( Url + "/users", (error, response, body) => {
//creo la condizione descritta nella documentazione che se è vera mi conferma l'arrivo della risposta al server
        if (!error && response.statusCode == 200) {
            console.log("risposta arrivata dal server!");
//creo la stringa utenti che conterrà il messaggio finale da stampare con il nome degli utenti
            let utenti = "";
            //converto il corpo da json ad oggetto e lo pongo uguale alla costante users che è un array
            const lista_utenti = JSON.parse(body);
//creo un ciclo for che mi aggiunga alla stringa utenti ogni singolo users intervallato da <h1>
            for (let i = 0; i < lista_utenti.length; i++) {
                utenti += '<h1>' + lista_utenti[i].name + '</h1>`;
            }
//avvio la callback mettendo come parametro la stringa utenti
            callback(utenti);
        }

    });

};

//adesso programmo la callback che viene presa come argomento in modo che vada a scrivermi un file di testo con gli utenti
getUsers((utenti) => {

    console.log("scrittura del file in corso");

    fs.writeFile("./request/utenti.txt", utenti, (error) => {
        if (error) throw error;
        console.log("il file è stato scritto correttamente")
    });

});