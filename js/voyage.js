"use strict";
var Sejour = /** @class */ (function () {
    function Sejour(_nom, _prix) {
        this._nom = _nom;
        this._prix = _prix;
    }
    Sejour.prototype.getNom = function () {
        return this._nom;
    };
    Sejour.prototype.getPrix = function () {
        return this._prix;
    };
    return Sejour;
}());
var SejourService = /** @class */ (function () {
    function SejourService() {
        this._sejours = [new Sejour('Pontivy', 20), new Sejour('Nantes', 0), new Sejour('Quimper', 50)];
    }
    SejourService.prototype.rechercheSejourParNom = function (nom) {
        for (var _i = 0, _a = this._sejours; _i < _a.length; _i++) {
            var sejour = _a[_i];
            if (sejour.getNom() === nom) {
                return sejour;
            }
        }
        return null;
    };
    return SejourService;
}());
var service = new SejourService();
console.log(service.rechercheSejourParNom('Pontivy'));
