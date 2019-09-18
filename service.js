var request = require('request').defaults({jar: true});
exports.login = login;
exports.recherche = recupererMatricule;
exports.recuperer = recupererInfos;



function login(login, motDePasse, callbackFn) {

    request('https://guillaume-top-collegues.herokuapp.com/auth', {
            method: 'POST',
            json: true,
            body: {
                nomUtilisateur: login,
                motDePasse: motDePasse
            }
        },
        function resp(err, res, body) {

            console.log(res.statusCode);
            if (res.statusCode === 200) {
                callbackFn();
            } else {
                console.log('Erreur d\'authentification');
            }
        }
    );


}

function recupererMatricule(nom, callbackFn, errorFn) {
    console.log('Nom récupéré :' + nom);
    request('https://guillaume-top-collegues.herokuapp.com/collegue?nomCollegue=' + nom, {
            method: 'GET',
            json: true
        },
        function resp(err, res, body) {
            console.log('Exécution de la récupération des collegues avec le nom sélectionné...');
            console.log('Réponse du serveur :' + res.statusCode);
            if (res.statusCode === 200) {
                console.log('Corps de la réponse :' + body);
                callbackFn(body);


            } else {
                errorFn('Aucune information pour ce nom');
            }
        }
    )
}


function recupererInfos(body, callbackFn2) {
    console.log('Matricule inséré dans la requête :' + body);


        var nbMats = body.length;

        retour = [];
        body.forEach(function(matricule){

            request('https://guillaume-top-collegues.herokuapp.com/collegue/' + matricule, {
                    method: 'GET',
                    json: true
                },
                function resp(err, res, body) {
                    retour.push(body);

                    if(nbMats === retour.length) {
                        callbackFn2(retour);
                    }

                });
        });





}



