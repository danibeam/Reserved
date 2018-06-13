
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy=require('passport-facebook').Strategy;
var LocalStrategy   = require('passport-local').Strategy;

var configAuth = require('./auth');

var User=require("../models/users");

var bcrypt=require('bcrypt');
var salt=bcrypt.genSaltSync(10);

var prueba=false;
var tipoUsuario=0;


module.exports=function(passport){

  // Guarda el segundo parametro de la funcion ("done") en la sesion para ser utilizado luego por el deserializeuser
    passport.serializeUser(function(user, done) {
      if(prueba==true){
          done(null, user.idUsuario);
      }else{
          done(null, user[0].idUsuario);
      }
        prueba=false;

    });

    // Comprueba que el primer parametro de la funcion (id) que es el parametro guardado en la sesión, corresponde con uno que exista en la DB
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });

    });

/********************** LOGIN LOCAL *******************************/

passport.use('local-login', new LocalStrategy({

    usernameField : 'nick',
    passwordField : 'password',
    passReqToCallback : true
},
function(req, nick, password, done) { // callback con el nick y la password del formulario
      // con esta funcion buscamos si el usuario existe ya o no
      User.findOneLocal(nick, function(error, data) {
          if (error){
              res.json(500,error);
          }else{
          // si no devuelve nada, el usuario no existe
            if(!data){
                return done(null, false, req.flash('loginMessage', 'Usuario no encontrado.'));
            }

            var dbpass=data[0].password;
            var comparepass=bcrypt.compareSync(password, dbpass);

            if(comparepass==false){
              return done(null, false, req.flash('loginMessage', 'Contraseña erronea.'));
            }
            return done(null,data);
          }
      });

}));



/******************* REGISTRO LOCAL *******************************/

  passport.use('local-signup', new LocalStrategy({

      usernameField : 'nick',
      passwordField : 'password',
      passReqToCallback : true
  },
  function(req, nick, password, done) {

      process.nextTick(function() {
        // con esta funcion buscamos si el usuario existe ya o no
        User.findOneLocal(nick, function(error, data) {
            if (error){
                res.json(500,error);
            }else{
            // si devuelve una columna es que el usuario ya existe y no se puede crearm con el mismo nick
              if (data) {
                  return done(null, false, req.flash('signupMessage', 'Este nick ya está en uso.'));
              } else {
                  // si el nick no esta en uso, creamos el usuario
                  var passhash=bcrypt.hashSync(password,salt);

                  var localData={
                    nick:nick,
                    nombre:nick,
                    password:passhash,
                    email:req.body.email
                  };

                  User.insertLocal(localData,function(error,data){
                      if (error){
                          console.log("ERROR al insertar el user local");
                      }else{
                          console.log("user local INSERTADO");
                          User.takeIdlocal(localData.nick,function(error,data){
                            prueba=true;
                            //tipoUsuario=0;
                            var sessionsave={
                              idUsuario:data[0].idUsuario,
                              nick:nick,
                              nombre:nick,
                              password:passhash,
                              email:req.body.email
                            }
                            
                            return done(null, sessionsave);
                          })
                      }
                  });
              }
            }
        });
      });

  }));


/*********************** OAUTH GOOGLE *****************************/
  passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,

    },
    function(token, refreshToken, profile, done) {

        process.nextTick(function() {

            // mira si el usuario ya entro anteriormente
            User.findOne(profile.id, function(error, data) {
                if (error){
                    res.json(500,error);
                }else{
                  if (data) {
                      // si ya esta en la bbdd se loguea
                      return done(null, data);
                  } else {
                      // si no esta, lo crea
                      var nickaux=profile.displayName+profile.id;

                      var googleData={
                        nick:nickaux,
                        nombre:profile.displayName,
                        idrrss:profile.id,
                        tokenrrss:token,
                        email:profile.emails[0].value
                      };
                      User.insertGoogle(googleData,function(error,data){
                          if (error){
                              console.log("ERROR al insertar el user google");
                          }else{
                              console.log("user google INSERTADO");
                              User.takeIdrrss(googleData.idrrss,function(error,data){
                                prueba=true;
                                var sessionsave={
                                  nick:data[0].nick,
                                  idUsuario:data[0].idUsuario,
                                  idrrss:data[0].idRRSS,
                                  tokenrrss:data[0].tokenRRSS
                                }
                                return done(null, sessionsave);
                              })
                          }
                      })
                  }
                }
            });
        });

    }));


  /***************************OAUTH FACEBOOK *******************************/

  passport.use(new FacebookStrategy({

          clientID        : configAuth.facebookAuth.clientID,
          clientSecret    : configAuth.facebookAuth.clientSecret,
          callbackURL     : configAuth.facebookAuth.callbackURL

      },
      function(token, refreshToken, profile, done) {

          process.nextTick(function() {

              // buscar al usuario de fb en la bbd
              User.findOne(profile.id, function(error, data) {
                  if (error){
                      res.json(500,error);
                  }else{
                    if (data) {
                        return done(null, data); // usuario encontrado, se loguea
                    } else {
                        //facebook no nos pasa email(?)
                        var nickaux=profile.displayName+profile.id;

                        var facebookData={
                          nick:nickaux,
                          nombre:profile.displayName,
                          idrrss:profile.id,
                          tokenrrss:token,
                        };
                        User.insertGoogle(facebookData,function(error,data){
                            if (error){
                                console.log("ERROR al insertar el user facebook");
                            }else{
                                console.log("user facebook INSERTADO");
                                User.takeIdrrss(facebookData.idrrss,function(error,data){
                                  prueba=true;
                                  var sessionsave={
                                    nick:data[0].nick,
                                    idUsuario:data[0].idUsuario,
                                    idrrss:data[0].idrrss,
                                    tokenrrss:data[0].tokenrrss
                                  }
                                  return done(null, sessionsave);
                                })
                            }
                        })
                    }
                  }
              });
          });
      }));


};
