export class Collegue {



    constructor(public nom:string, public prenom:string, public email:string, public dateDeNaissance:string, public photoUrl:string) {
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.dateDeNaissance = dateDeNaissance;
        this.photoUrl = photoUrl;
    }

    toString() {
        return `Nom : ${this.nom}, Prénom : ${this.prenom}, Email : ${this.email}, Date de naissance : ${this.dateDeNaissance}, Url de la photo : ${this.photoUrl}`;
    }

}