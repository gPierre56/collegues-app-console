const request = require('request-promise-native').defaults({jar: true});
const Collegue = require('./Collegue');

class Service {

    login(username, password) {

        return request('https://guillaume-top-collegues.herokuapp.com/auth', {
                method: 'POST',
                json: true,
                body: {
                    nomUtilisateur: username,
                    motDePasse: password
                }
            });


    }

    recupererMatricule(nom) {
        return new Promise((resolve, reject) => {
            console.log(`Nom récupéré :${nom}`);

            request('https://guillaume-top-collegues.herokuapp.com/collegue?nomCollegue=' + nom, {
                    method: 'GET',
                    json: true
                },
                function resp(err, res, body) {
                    console.log('Exécution de la récupération des collegues avec le nom sélectionné...');
                    console.log('Réponse du serveur :' + res.statusCode);
                    if (res.statusCode === 200) {
                        console.log('Corps de la réponse :' + body);
                        resolve(body);
                    } else {
                        reject('Aucune information pour ce nom');
                    }
                }
            )
        });
    }

    recupererInfos(body) {

        return new Promise(function (resolve, reject) {
            console.log(`Matricule inséré dans la requête :${body}`);
            let nbMats = body.length;
            let retour = [];
            body.forEach(function (matricule) {

                request('https://guillaume-top-collegues.herokuapp.com/collegue/' + matricule, {
                        method: 'GET',
                        json: true
                    },
                    function resp(err, res, body) {
                        retour.push(body);

                        if (nbMats === retour.length) {
                            resolve(retour);
                        }
                    });
            });
        });
    }

    ajouterCollegue(collegue) {
        return new Promise(function (resolve, reject) {
            request('https://guillaume-top-collegues.herokuapp.com/collegue', {
                method: 'POST',
                body : {
                    "nom" : collegue.nom,
                    "prenom" : collegue.prenom,
                    "email" : collegue.email,
                    "dateDeNaissance" : collegue.dateDeNaissance,
                    "photoUrl" : collegue.photoUrl
                },
                json: true
            },
                function (err, res, body) {
                    if (res.statusCode === 202) {
                        resolve(collegue)
                    } else {
                        reject(err);
                    }
                } )
        })
    }
}

module.exports = Service;



