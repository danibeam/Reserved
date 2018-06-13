var express = require('express');
var router = express.Router();
var User=require("../models/users");
var Comments=require("../models/comments");
var Reservations=require("../models/reservations");
var Visit=require("../models/visitrestaurant");

var passport=require('passport');

var bcrypt=require('bcrypt');
var salt=bcrypt.genSaltSync(10);

var jwt = require('jsonwebtoken');
var configJWT = require('../config/auth');

//Comprobar token
router.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['token-acceso'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token,configJWT.secret, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    res.json(200,"No token provided.");

  }
});

/* GET  Todos los Usuarios */
router.get('/page/:page', function(req, res, next) {

    User.all(req.params.page,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET  Usuarios por nick */
router.get('/find/:nick', function(req, res, next) {

    User.findlikenick(req.params.nick,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});



/* GET Usuario por su Id */
router.get('/:id', function(req, res, next) {

    User.findOneById(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* PUT Modificar un usuario */
router.put('/:id',function(req,res,next){
    if(req.body.password!=''){
      var hash=bcrypt.hashSync(req.body.password,salt);
    }else{
      var hash='';
    }

    var userData={
        id:req.params.id,
        password:hash,
        email:req.body.email,
    };

    User.update(userData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })

});

/* DELETE Borrar un usuario */
router.delete("/:id",function(req,res,next){
    User.remove(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET Comentarios de un Usuario */
router.get('/:id/comments', function(req, res, next) {

    Comments.findCommentsUser(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET Reservas de un Usuario */
router.get('/:id/reservations', function(req, res, next) {

    Reservations.findUserReserve(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* POST Crear una reserva */
router.post('/:id/reservations',function(req,res,next){

    var ReservationData={
        IdReserva:null,
        dia:req.body.dia,
        turno:req.body.turno,
        hora:req.body.hora,
        comensales:req.body.comensales,
        usuarior:req.params.id,
        restauranter:req.body.restauranter
    };

    var AforoData={
        IdAforo:req.body.restauranter,
        dia:req.body.dia,
        turno:req.body.turno,
        idrestaurante:req.body.restauranter,
        comensales:req.body.comensales
    };

    Reservations.insertReservation(ReservationData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
            aux=1;
        }
    })

        Reservations.updateAforo(AforoData,function(error,data){
            if (error){
                res.json(500,error);
            }else{
                res.json(200,data);
            }
        })

});

/* DELETE Borrar una Reserva */

router.put("/:iduser/reservations/:id",function(req,res,next){
    var ReservationData={
        dia:req.body.dia,
        turno:req.body.turno,
        restaurante:req.body.restaurante
    };

    Reservations.removeAforo(req.params.id,ReservationData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })

    Reservations.remove(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* PUT Modificar una reserva */
router.put('/:id/reservation/:idreservation',function(req,res,next){
    var reservationData={
        IdAforo:req.body.restauranter,
        dia:req.body.dia,
        hora:req.body.hora,
        turno:req.body.turno,
        idrestaurante:req.body.restauranter,
        comensales:req.body.comensales
    };

    Reservations.update(reservationData,req.params.idreservation,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
    Reservations.updatereservation(reservationData,req.params.idreservation,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })

});


/*Metodo para cuando un usuario hace un login guardarlo */
router.post('/:id/usercontrol',function(req,res,next){


    var ControlData={
        idcontrolu:null,
        fecha:req.body.fecha,
        usuarioid:req.params.id

    };




    UserControl.insert(ControlData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })

});

/*Metodo que te sale el ultimo login  de un usuario*/
router.get('/:id/usercontrol',function(req,res,next){
  UserControl.findUserControl(req.params.id,function(error,data){
      if (error){
          res.json(500,error);
      }else{
          res.json(200,data);
      }
  })
});

router.delete('/:id/usercontrol',function(req,res,next){
  UserControl.remove(req.params.id,function(error,data){
      if (error){
          res.json(500,error);
      }else{
          res.json(200,data);
      }
  })
});

//Mostrar visitas de un usuario
router.get('/:id/visit',function(req,res,next){
  Visit.findVisitUser(req.params.id,function(error,data){
      if (error){
          res.json(500,error);
      }else{
          res.json(200,data);
      }
  })
});

//Mostrar visitas de un usuario aun restaurante concreto
router.get('/:id/visit/:idrestaurante',function(req,res,next){
  Visit.findVisit(req.params.id,req.params.idrestaurante,function(error,data){
      if (error){
          res.json(500,error);
      }else{
          res.json(200,data);
      }
  })
});

//Crear una visita
router.post('/:id/visit/:idrestaurante',function(req,res,next){
    var visitData={
        IdVisita:null,
        usuarioId:req.params.id,
        fecha:req.body.fecha,
        restauranteId:req.params.idrestaurante
    };

    Visit.insert(visitData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })

});

//Eliminar una visita
router.delete("/:id/visit/:idvisita",function(req,res,next){
    Visit.remove(req.params.id,req.params.idvisita,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* Conseguir el idPedido dado una reserva de un Usuario */
router.get('/:id/reservations/orders/:idreserva', function(req, res, next) {

    Reservations.findorderbyreserve(req.params.id, req.params.idreserva, function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET Reservas de un Usuario confirmadas */
router.get('/:id/reservations/confirmadas', function(req, res, next) {

    Reservations.findReserve(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});
/* GET Reservas de un Usuario posteriores a la fecha actual */
router.get('/:id/reservations/future', function(req, res, next) {

    Reservations.findUserReservefuture(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* Introducir un pin y comprobar que sea correcto*/
router.post('/addpin', function(req,res,next){

    var pinData={
        pin:req.body.pin
    };

    Reservations.insertPin(pinData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            if(data==null){
                res.json(200,"Pin incorrecto");
            }
            else{
                res.json(200,data);
            }
        }

    })
});
/*Modificar usuario y borrar pin*/
router.put('/pin/:id',function(req,res,next){
    var pinData={
        usuarioR:req.body.usuarioR
    };

    Reservations.updatepin(req.params.id,pinData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })

});

/*Comprobar aforo*/

router.post('/comprobaraforo',function(req,res,next){
    var aforoData={
        dia:req.body.dia,
        turno:req.body.turno
    };

    Reservations.comprobaraforo(aforoData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })

});



module.exports = router;
