var request = require('request').defaults({jar:true});
exports.login = login;


    function login(login, motDePasse, callbackFn, error) {

        request('http://localhost:8080/auth', {
                method: 'POST',
                json: true,
                body: {
                    nomUtilisateur: "jojo",
                    motDePasse: "1234"
                }
            },
            function resp(err, res, body) {

                console.log(res.statusCode);
                if (res.statusCode === 200) {
                    callbackFn(res);
                } else {
                    error("Mauvais identifiants");
                }
            }

            );


    }

