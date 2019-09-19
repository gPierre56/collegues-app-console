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
    // Promise<Promise[]>
// Promise<Promise<[]>>
    recupererMatricule(nom) {
        return request(`https://guillaume-top-collegues.herokuapp.com/collegue?nomCollegue=${nom}`, {
                method: 'GET',
                json: true
            },
        ).then(tabMatricules => tabMatricules
            .map(mat => 'https://guillaume-top-collegues.herokuapp.com/collegue/' + mat)
            .map(url => request(url, {json: true})))
            .then(tabPromises => Promise.all(tabPromises))
            .then(tabCols => tabCols.map(col => new Collegue(col.nom, col.prenom, col.email, col.dateDeNaissance, col.photoUrl)))


    };


    ajouterCollegue(collegue) {
        return request('https://guillaume-top-collegues.herokuapp.com/collegue', {
                method: 'POST',
                body: {
                    "nom": collegue.nom,
                    "prenom": collegue.prenom,
                    "email": collegue.email,
                    "dateDeNaissance": collegue.dateDeNaissance,
                    "photoUrl": collegue.photoUrl
                },
                json: true
            },
            )
    }

}

module.exports = Service;



