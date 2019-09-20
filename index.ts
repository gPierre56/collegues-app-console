import {Presentation} from'./presentation';
import {Service} from "./service";
console.log('** Administration Collègues **');

const presentation = new Presentation(new Service());
presentation.start();




