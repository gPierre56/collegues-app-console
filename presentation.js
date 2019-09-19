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

const afficherMenu = (rl) =>  {
    const menu = '1. Rechercher un collègue par nom\n'
        + '2. Ajouter un collègue\n'
        + '3. Modifier l\'email\n'
        + '4. Modifier la photo\n'
        + '99. Sortir\n';

    rl.question(menu, (saisie) => {
        if (saisie === '1') {
            rl.question('Nom de la personne à rechercher :', (nom) => {
                service.recupererMatricule(nom).then((collegues) => {
                    collegues.forEach((col) => console.log(col.toString()));
                    afficherMenu(rl);
                }).catch(() => {
                    console.log('Aucun collègue n\'a été trouvé pour ce nom.');
                    afficherMenu(rl);
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
                                    afficherMenu(rl);
                                    }
                                ).catch(() => {
                                    console.log('Erreur lors de l\'ajout.');
                                    afficherMenu(rl);
                                })
                            })
                        })
                    })
                })
            })
        } else if (saisie === '3') {
            rl.question('Matricule du collègue à modifier :', (matricule) => {
                rl.question('Nouvel email : ', (email) => {
                    service.modifierEmailCollegue(matricule, email).then((body) => {
                        console.log('modification effectuée :' + body.toString());
                        afficherMenu(rl);
                    }).catch(() => {
                        console.log('Erreur lors de la modification de l\'email');
                        afficherMenu(rl);
                    })
                })
            })
        } else if (saisie === '4') {
            rl.question('Matricule du collègue à modifier :', (matricule) => {
                rl.question('Nouvelle url : ', (url) => {
                    service.modifierPhotoCollegue(matricule, url).then((body) => {
                        console.log('modification effectuée.');
                        afficherMenu(rl);
                    }).catch((err) => {
                        console.log(err);
                        console.log('Erreur lors de la modification de l\'url de la photo');
                        afficherMenu(rl);
                    })
                })
            })
        } else if (saisie === '99') {
            console.log('Au revoir');
            rl.close();
        }
    })





}







