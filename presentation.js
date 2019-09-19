const Service = require('./service.js');
const readline = require('readline');
const Collegue = require('./Collegue');
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
    console.log('Identifiant : john, Mot de passe : 1234');

    rl.question('Nom d\'utilisateur :', (utilisateur) => {
        rl.question('Mot de passe :', (motDePasse) => {
            service.login(utilisateur, motDePasse).then(() => {
                afficherMenu(rl);
            }, () => {
                console.log('Identifiants incorrects');
            });
        })
    })
}

function afficherMenu(rl) {




        console.log('1. Rechercher un collègue par nom');
        console.log('2. Ajouter un collègue');
        console.log('99. Sortir');


        rl.question('Choisissez une action : \n', (saisie) => {

                if (saisie === '1') {
                    rl.question('Nom de la personne à rechercher :', (nom) => {
                        service.recupererMatricule(nom).then((collegues) => {
                            collegues.forEach((col) => console.log(col.toString()))
                        }).catch((err) => {
                            console.log('Aucun collègue n\'a été trouvé pour ce nom.');
                        })


                    })


                } else if (saisie === '2') {
                    rl.question('Nom de la personne à ajouter : ', (nom) => {
                        rl.question('Prénom de la personne :', (prenom) => {
                            rl.question('Email de la personne', (email) => {
                                rl.question('Date de naissance :', (dateDeNaissance) => {
                                    rl.question('Url de la photo :', (photoUrl) => {
                                        let collegue = new Collegue(nom, prenom, email, dateDeNaissance, photoUrl);
                                        service.ajouterCollegue(collegue).then((collegue) => {
                                                console.log(`Collègue ajouté : ${collegue.toString()}`);
                                            }
                                        ).catch(() => {
                                            console.log('Erreur lors de l\'ajout.');
                                        })
                                    })
                                })
                            })
                        })
                    })
                } else if (saisie === '99') {
                    console.log('Au revoir');
                    rl.close();
                }

            choix = saisie;
            }


        )



}







