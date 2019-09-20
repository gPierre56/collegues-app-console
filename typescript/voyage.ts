class Sejour {


    constructor(private _nom: string, private _prix: number) {

    }

    getNom() {
        return this._nom;
    }

    getPrix() {
        return this._prix;
    }


}

class SejourService {

    private _sejours:Array<Sejour>;
    constructor() {
        this._sejours = [new Sejour('Pontivy', 20), new Sejour('Nantes', 0), new Sejour('Quimper', 50)];
    }



    public rechercheSejourParNom(nom:string):Sejour | null {

        for (let sejour of this._sejours) {
            if (sejour.getNom() === nom) {
                return sejour;
            }
        }
        return null;

    }
}

let service:SejourService = new SejourService();

console.log(service.rechercheSejourParNom('Pontivy'));