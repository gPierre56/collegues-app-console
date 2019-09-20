import r from 'request-promise-native';
import {Collegue} from './Collegue';
const request = r.defaults({jar: true});
const _urlTemplate = 'https://guillaume-top-collegues.herokuapp.com';

// Classe gérant les échanges avec l'API back
export class Service {


    // Identifie l'utilisateur auprès de l'application collègues-api
    login(username:string, password:string):Promise<void> {

        return request(`${_urlTemplate}/auth`, {
            method: 'POST',
            json: true,
            body: {
                nomUtilisateur: username,
                motDePasse: password
            }
        }).promise();


    }
    // Récupère les infos sur un ou plusieurs collègues selon un nom de famille donné
    recupererMatricule(nom:string): Promise<Collegue[]> {
        return request(`${_urlTemplate}/collegue?nomCollegue=${nom}`, {
                method: 'GET',
                json: true
            },
        ).then(tabMatricules => tabMatricules
            .map((mat:string) => `${_urlTemplate}/collegue/${mat}`)
            .map((url:string) => request(url, {json: true})))
            .then((tabPromises:Array<Promise<Collegue>>) => Promise.all(tabPromises))
            .then(tabCols => tabCols.map(col => new Collegue(col.nom, col.prenom, col.email, col.dateDeNaissance, col.photoUrl)))


    };


    ajouterCollegue(collegue:Collegue):Promise<Collegue> {
        return request(`${_urlTemplate}/collegue`, {
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
        ).promise()
    }

    modifierEmailCollegue(matricule:string, email:string):Promise<any> {
        return request('https://guillaume-top-collegues.herokuapp.com/collegue/' + matricule, {


                method: 'PATCH',
                body: {
                    "email": email
                },
                json: true
            },
        ).promise()
    }

    modifierPhotoCollegue(matricule:string, url:string):Promise<any> {
        return request('https://guillaume-top-collegues.herokuapp.com/collegue/' + matricule, {


                method: 'PATCH',
                body: {
                    "photoUrl": url
                },
                json: true
            },
        ).promise()
    }


}





