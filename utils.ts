import moment from "moment";
moment.locale('fr');
export class Utils {

    convertirDate(dateAConvertir:string):Date {
        let jour:number = parseInt(dateAConvertir.substr(0, 1));
        let mois:number = parseInt(dateAConvertir.substr(3,4));
        let annee:number = parseInt(dateAConvertir.substr(6,9));
        return new Date(annee, mois, jour);
    }



    dateToLocalDate(dateAConvertir:Date):string {
       return `${dateAConvertir.getFullYear()}-${dateAConvertir.getMonth()}-${dateAConvertir.getDay()}`;
    }

    dateToFrenchDate(dateAConvertir:Date):string {
        return moment(dateAConvertir).format('LL');
    }
}