const Service = require('./service.js');
const readline = require('readline');
exports.start = start;

const service = new Service();


// point d'entrée
function start() {
    // Appel du scanner
    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log('Merci de vous identifier :');
    console.log('Identifiant : jojo, Mot de passe : 1234');

    rl.question('Nom d\'utilisateur :', function (utilisateur) {
        rl.question('Mot de passe :', function (motDePasse) {
            service.login(utilisateur, motDePasse).then(function () {
                afficherMenu(rl);
            }, function (err) {
                console.log(err);
            });
        })
    })
}

function afficherMenu(rl) {

    console.log('1. Rechercher un collègue par nom');
    console.log('99. Sortir');


    rl.question('Choisissez une action : \n', function (saisie) {
            if (saisie == 1) {
                rl.question('Nom de la personne à rechercher :', function (nom) {
                    service.recupererMatricule(nom).then(function (matricule) {
                        service.recupererInfos(matricule).then(function (resultat) {
                            resultat.forEach(function (element) {
                                console.log(element);
                            })
                        })
                    }, function (err) {
                        console.log(err);
                    })


                })


            } else if (saisie == 99) {
                console.log('Au revoir');
                rl.close();
            }


        }
    )


}







