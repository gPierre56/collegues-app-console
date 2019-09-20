import r from 'request-promise-native';
import {Collegue} from './Collegue';
const request = r.defaults({jar: true});


export class Service {



    login(username:string, password:string):Promise<void> {

        return request('https://guillaume-top-collegues.herokuapp.com/auth', {
            method: 'POST',
            json: true,
            body: {
                nomUtilisateur: username,
                motDePasse: password
            }
        }).promise();


    }

    // Promise<Promise[]>
// Promise<Promise<[]>>
    recupererMatricule(nom:string): Promise<Collegue[]> {
        return request(`https://guillaume-top-collegues.herokuapp.com/collegue?nomCollegue=${nom}`, {
                method: 'GET',
                json: true
            },
        ).then(tabMatricules => tabMatricules
            .map((mat:string) => 'https://guillaume-top-collegues.herokuapp.com/collegue/' + mat)
            .map((url:string) => request(url, {json: true})))
            .then((tabPromises:Array<Promise<Collegue>>) => Promise.all(tabPromises))
            .then(tabCols => tabCols.map(col => new Collegue(col.nom, col.prenom, col.email, col.dateDeNaissance, col.photoUrl)))


    };


    ajouterCollegue(collegue:Collegue):Promise<Collegue> {
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





