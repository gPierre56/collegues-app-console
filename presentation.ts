import {Service} from './service'
import readline, {Interface} from 'readline';
import {Collegue} from './Collegue';


const service:Service = new Service();
export class Presentation {


// point d'entrée
    start():void {
        // Appel du scanner
        let rl:any = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        console.log('Merci de vous identifier :');
        console.log('Identifiant : john, Mot de passe : 1234');

        rl.question('Nom d\'utilisateur :', (utilisateur:string) => {
            rl.question('Mot de passe :', (motDePasse:string) => {
                service.login(utilisateur, motDePasse).then(() => {
                    this.afficherMenu(rl);
                }, () => {
                    console.log('Identifiants incorrects');
                });
            })
        })
    }


    afficherMenu(rl:Interface)  {
        const menu:string = '1. Rechercher un collègue par nom\n'
            + '2. Ajouter un collègue\n'
            + '3. Modifier l\'email\n'
            + '4. Modifier la photo\n'
            + '99. Sortir\n';

        rl.question(menu, (saisie:string) => {
            if (saisie === '1') {
                rl.question('Nom de la personne à rechercher :', (nom:string) => {
                    service.recupererMatricule(nom).then((collegues) => {
                        if (collegues.length === 0) {
                            console.log('Aucun collègue avec ce nom trouvé.');
                            this.afficherMenu(rl);
                        } else {
                            collegues.forEach((col) => console.log(col.toString()));
                            this.afficherMenu(rl);
                        }
                    }).catch((err) => {
                        console.log(err);
                        this.afficherMenu(rl);
                    })


                })


            } else if (saisie === '2') {
                rl.question('Nom de la personne à ajouter : ', (nom:string) => {
                    rl.question('Prénom de la personne :', (prenom:string) => {
                        rl.question('Email de la personne', (email:string) => {
                            rl.question('Date de naissance :', (dateDeNaissance:string) => {
                                rl.question('Url de la photo :', (photoUrl:string) => {
                                    let collegue:Collegue = new Collegue(nom, prenom, email, dateDeNaissance, photoUrl);
                                    service.ajouterCollegue(collegue).then((collegue) => {
                                            console.log(`Collègue ajouté : ${collegue.toString()}`);
                                            this.afficherMenu(rl);
                                        }
                                    ).catch(() => {
                                        console.log('Erreur lors de l\'ajout.');
                                        this.afficherMenu(rl);
                                    })
                                })
                            })
                        })
                    })
                })
            } else if (saisie === '3') {
                rl.question('Matricule du collègue à modifier :', (matricule:string) => {
                    rl.question('Nouvel email : ', (email:string) => {
                        service.modifierEmailCollegue(matricule, email).then((body) => {
                            console.log('modification effectuée :' + body.toString());
                            this.afficherMenu(rl);
                        }).catch(() => {
                            console.log('Erreur lors de la modification de l\'email');
                            this.afficherMenu(rl);
                        })
                    })
                })
            } else if (saisie === '4') {
                rl.question('Matricule du collègue à modifier :', (matricule:string) => {
                    rl.question('Nouvelle url : ', (url:string) => {
                        service.modifierPhotoCollegue(matricule, url).then((body) => {
                            console.log('modification effectuée.');
                            this.afficherMenu(rl);
                        }).catch((err) => {
                            console.log(err);
                            console.log('Erreur lors de la modification de l\'url de la photo');
                            this.afficherMenu(rl);
                        })
                    })
                })
            } else if (saisie === '99') {
                console.log('Au revoir');
                rl.close();
            }
        })


    }

}







