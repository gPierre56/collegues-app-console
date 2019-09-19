const service = require('./service.js');
const readline = require('readline');
exports.start = start;

// point d'entrée
function start() {
    // Appel du scanner
    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log('Merci de vous identifier :');


  /*
    rl.question('Nom d\'utilisateur : \n', function (utilisateur) {

        rl.question('Mot de passe : \n', function (motDePasse) {
            service.login(utilisateur, motDePasse, function () {
                afficherMenu(rl);
            })
        })
    });
*/


}

function afficherMenu(rl) {

    console.log('1. Rechercher un collègue par nom');
    console.log('99. Sortir');


    rl.question('Choisissez une action : \n', function (saisie) {
        if (saisie == 1) {
            rl.question('Nom de la personne à rechercher :', function (nomCollegue) {
                console.log('>> Recherche en cours du nom ' + nomCollegue);
                service.recherche(nomCollegue, function(callbackFn) {
                    service.recuperer(callbackFn, function (resultat) {
                        console.log(resultat);
                    });
                } )

            })
        } else if (saisie == 99) {
            console.log('Au revoir');
            rl.close();
        }
    });
}






