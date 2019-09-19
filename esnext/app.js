let favoriteCityId = 'rome';
console.log(favoriteCityId);
favoriteCityId = 'paris';
console.log(favoriteCityId);
const citiesId = ["paris", "nyc", "rome", "rio-de-janeiro"];
console.log(citiesId);
//citiesId = [];
citiesId.push('tokyo');
console.log(citiesId);

function getWeather(cityId) {
    let city = cityId.toUpperCase();
    let temperature = 20;
    return {city, temperature};
}

const weather = getWeather(favoriteCityId);
console.log(weather);
const {
    city: city,
    temperature: temperature
} = weather;
console.log(city);
console.log(temperature);
let [parisId, nycId, ...otherCitiesId] = citiesId;
console.log(parisId);
console.log(nycId);
console.log(otherCitiesId);

class Trip {
    constructor(id, name, imageUrl) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }

    toString() {
        return 'Trip [' + this.id + ', ' + this.name + ', ' + this.imageUrl + ', ' + this._price + ']';
    }

    get price() {
        return this._price;
    }

    set price(prix) {
        this._price = prix;
    }

    static getDefaultTrip() {
        return new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg');
    }
}

const parisTrip = new Trip('paris', 'Paris', 'img/paris.jpg');
console.log(parisTrip);
console.log(parisTrip.name);
console.log(parisTrip.toString());
parisTrip.price = 100;
console.log(parisTrip.toString());
const defaultTrip = Trip.getDefaultTrip();
console.log(defaultTrip.toString());

class FreeTrip extends Trip {
    constructor(id, name, photoUrl) {
        super(id, name, photoUrl);
        this.price = 0;
    }

    toString() {
        return 'Free' + super.toString();
    }
}

const freeTrip = new FreeTrip('nantes', 'Nantes', 'img/nantes.jpg');
console.log(freeTrip);
console.log(freeTrip.toString());

class TripService {

    constructor() {
        this.trips = new Set();
        this.trips.add(new Trip('paris', 'Paris', 'img/paris.jpg'));
        this.trips.add(new Trip('nantes', 'Nantes', 'img/nantes.jpg'));
        this.trips.add(new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg'));
    }

    findByName(tripName) {
        return new Promise((resolve, reject) => {

            setTimeout(() => {

                for (let trip of this.trips) {
                    if (trip.name === tripName) {
                        resolve(trip);
                    }
                }

                reject('No trip with name ' + tripName);

            }, 2000)
        });
    }
}

class PriceService {

    constructor() {
        this.prix = new Map();
        this.prix.set('paris', 100);
        this.prix.set('rio-de-janeiro', 800);
        // no price for 'nantes'
    }

    findPriceByTripId(tripId) {
        return new Promise((resolve, reject) => {

            setTimeout(() => {
                // ici l'exécution du code est asynchrone

                // TODO utiliser resolve et reject en fonction du résultat de la recherche

                if (this.prix.has(tripId)) {
                    resolve(this.prix.get(tripId));
                }
                reject('No price found for trip id ' + tripId);

            }, 2000)
        });
    }
}

let prixService = new PriceService();
let tripService = new TripService();

tripService.findByName('Paris').then(function (trip) {
    console.log('Trip found : ' + trip);
});

tripService.findByName('Toulouse').then(function () {

}, function (err) {
    console.log(err);
});

tripService.findByName('Rio de Janeiro').then(function (trip) {
    prixService.findPriceByTripId(trip.id).then(function (price) {
        console.log('Price found : ' + price);
    })
});

tripService.findByName('Nantes').then(function (trip) {
    prixService.findPriceByTripId(trip.id).then(function () {

    }, function (err) {
        console.log(err);
    })
});

