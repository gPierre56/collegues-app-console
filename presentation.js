var login = require('./service.js');

exports.start = start;
var readline = require('readline');

function start() {
    login.login(function () {
        afficherMenu();
    }, function (error) {
        console.log(error);
    });

    function authentification(login, motDePasse) {

    }

    function afficherMenu() {
        console.log('1. Rechercher un collègue par nom');
        console.log('99. Sortir');


        var r1 = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        r1.question('Choisissez une action : \n', function (saisie) {
            if (saisie == 1) {
                console.log('>> Recherche en cours du nom XXX');
            } else if (saisie == 99) {
                console.log('Au revoir');
            }

            r1.close();
        });

    }

}






