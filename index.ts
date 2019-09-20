import {Presentation} from'./presentation';
import {Service} from "./service";
import {Utils} from "./utils";
console.log('** Administration Collègues **');

const presentation = new Presentation(new Service(), new Utils());
presentation.start();




