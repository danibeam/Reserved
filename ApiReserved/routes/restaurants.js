var express = require('express');
var router = express.Router();
var path = require("path");
var Restaurant=require("../models/restaurants");
var Comments=require("../models/comments");
var Product=require("../models/products");
var Category=require("../models/category");
var Employee=require("../models/employees");
var Images=require("../models/images");
var Visit=require("../models/visitrestaurant");
var Orders=require("../models/orders");
var Reservations=require("../models/reservations");

var bcrypt=require('bcrypt');
var salt=bcrypt.genSaltSync(10);

var multer  = require('multer');
var upload = multer({ dest: 'images/' })

var jwt = require('jsonwebtoken');
var configJWT = require('../config/auth');

var fs = require('fs');

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

//ver foto
router.get('/:id/images/:name', function (req, res) {
    console.log(req.params.name);
    res.sendfile(path.resolve('./images/'+req.params.id+'/'+req.params.name));
});


//subir foto
router.post('/:id/upload',upload.single('imagensubir'), function(req, res) {
  //console.log(req.files.imagensubir);
  if (!req.files){
    return res.status(400).send('No files were uploaded.');
  }

  var file = req.files.imagensubir;
  var img_name=file.name;

  Images.uploadimage(file,img_name,req.params.id,function(error,data){
    if (error){
        res.json(500,error);
    }else{
        res.json(200,data);
    }
  })

});


/* GET  Restaurantes por nombre */
router.get('/find/:nick', function(req, res, next) {

    Restaurant.findlikename(req.params.nick,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET Restaurante por su Id */
router.get('/:id', function(req, res, next) {
    Restaurant.findOneById(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET Restaurantes por nombre */
router.get('/name/:name', function(req, res, next) {

    Restaurant.findRestaurantName(req.params.name,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET Restaurantes por Tipo de comida */
router.get('/type/:type', function(req, res, next) {

    Restaurant.findRestaurantType(req.params.type,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});
/* GET Restaurantes por Ciudad */
router.get('/city/:city', function(req, res, next) {

    Restaurant.findRestaurantCity(req.params.city,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});
/* GET Restaurantes dada una ciudad, nombre y tipocomida */
router.post('/find', function(req, res, next) {
        var buscadorData={
        ciudad:req.body.ciudad,
        tipoComida:req.body.tipoComida,
        nombre:req.body.nombre
    };
    Restaurant.findRestaurant(buscadorData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET Aforo de Restaurante */
router.get('/:id/capacityall', function(req, res, next) {

    Restaurant.seecapacityall(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET Aforo de Restaurante en un turno */
router.post('/:id/capacity', function(req, res, next) {

  var capacityData={
      dia:req.body.dia,
  };

    Restaurant.seecapacity(req.params.id,capacityData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET reservas de un restaurante */
router.get('/:id/:dia/:turno/reservations', function(req, res, next) {

    Restaurant.seereservations(req.params.id,req.params.dia,req.params.turno,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* PUT Modificar un Restaurante */
router.put('/:id',function(req,res,next){
    if(req.body.password!=''){
      var hash=bcrypt.hashSync(req.body.password,salt);
    }else{
      var hash='';
    }

    var restaurantData={
        id:req.params.id,
        nombre:req.body.nombre,
        password:hash,
        email:req.body.email,
        horario:req.body.horario,
        descripcion:req.body.descripcion,
        direccion:req.body.direccion,
        telefono:req.body.telefono,
        ciudad:req.body.ciudad,
        //imagenes:req.body.imagenes,
        aforo:req.body.aforo,
        tipoComida:req.body.tipoComida,
        coordenadas:req.body.coordenadas
    };

    Restaurant.update(req.params.id,restaurantData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })

});

/* DELETE Borrar un Restaurante */
router.delete("/:id",function(req,res,next){
    Restaurant.remove(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* PUT Modificar un empleado */
router.put('/employee/:id',function(req,res,next){

    var hash=bcrypt.hashSync(req.body.password,salt);
    var employeeData={
        id:req.params.id,
        password:hash,
    };

    Employee.updatepass(employeeData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })

});

/* GET Comentarios de un Restaurante */
router.get('/:id/comments', function(req, res, next) {
    Comments.findCommentsRestaurant(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* CAMBIAR ESTADO DE UN COMENTARIO (DENUNCIADO) A "SI" */
router.get('/:id/comment/:comment/denunciado', function(req, res, next) {
    Comments.changecommentestado(req.params.id,req.params.comment,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* Mostrar todos los restaurantes segun el nombre del plato */
router.get("/products/:nombreproducto", function(req, res, next){
    Product.findByRestaurantByNameProduct(req.params.nombreproducto, function(error,data){

        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* Mostrar todos los Productos de un Restaurante*/
router.get("/:id/products", function(req, res, next){
    Product.findByRestaurantId(req.params.id, function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* Borrar un producto de un restaurante*/
router.delete('/:id/products/:idproducto', function(req, res, next){
    Product.remove(req.params.id, req.params.idproducto, function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/*Mostrar un producto en concreto*/
router.get("/allproducts/:id", function(req, res, next){
    Product.findProduct(req.params.id, function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* Crear un producto en un restaurante*/
router.post('/:id/products', function(req, res, next){
  var productData={
      IdProducto: null,
      Nombre: req.body.nombre,
      Precio: req.body.precio,
      Tipo: req.body.tipo,
      Informacion: req.body.informacion,
      RestauranteP: req.params.id,
      Categoria:req.body.categoria,
      Url:req.body.url,
      Gluten:req.body.gluten,
      Crustaceos:req.body.crustaceos,
      Huevos:req.body.huevos,
      Pescado:req.body.pescado,
      Cacahuetes:req.body.cacahuetes,
      Soja:req.body.soja,
      Lacteos:req.body.lacteos,
      Frutos_cascara:req.body.frutos_cascara,
      Apio:req.body.apio,
      Mostaza:req.body.mostaza,
      Sesamo:req.body.sesamo,
      Dioxido_azufre:req.body.dioxido_azufre,
      Moluscos:req.body.moluscos,
      Altramuces:req.body.altramuces,
      Url:req.params.id+"_"+req.body.nombre

  };

    Product.insert(productData, function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,"Producto anyadido");
        }
    })
});

/* Modifica un producto en un restaurante*/
router.put('/:id/products/:idproducto', function(req, res, next){
    var productData={
        Nombre: req.body.nombre,
        Precio: req.body.precio,
        Tipo: req.body.tipo,
        Informacion: req.body.informacion,
        Categoria:req.body.categoria,
        Url:req.body.url,
        Gluten:req.body.gluten,
        Crustaceos:req.body.crustaceos,
        Huevos:req.body.huevos,
        Pescado:req.body.pescado,
        Cacahuetes:req.body.cacahuetes,
        Soja:req.body.soja,
        Lacteos:req.body.lacteos,
        Frutos_cascara:req.body.frutos_cascara,
        Apio:req.body.apio,
        Mostaza:req.body.mostaza,
        Sesamo:req.body.sesamo,
        Dioxido_azufre:req.body.dioxido_azufre,
        Moluscos:req.body.moluscos,
        Altramuces:req.body.altramuces
    };

    Product.update(req.params.id,req.params.idproducto,productData, function(error, data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,"Producto actualizado");
        }
    })
});

/* Mostrar los productos segun su tipo */
router.get("/:id/products/:type", function(req, res, next){
    Product.findProductsByType(req.params.id,req.params.type, function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});
/* Mostrar los productos segun su categoria */
router.get("/:id/products/category/:category", function(req, res, next){
    Product.findProductsByCategory(req.params.id,req.params.category, function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/*Todos los empleados de un restaurante */
router.get('/:id/employee',function(req,res,next){
  Employee.findEmployee(req.params.id,function(error,data){
      if (error){
          res.json(500,error);
      }else{
          res.json(200,data);
      }
  })
});

/* GET por id de empleado */
router.get('/:id/employee/:idempleado', function(req, res, next){

    Employee.findEmployeeById(req.params.idempleado,function(error,data){

        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

//Eliminar un empleado
router.delete("/:id/employee/:idempleado",function(req,res,next){
    Employee.remove(req.params.idempleado,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

//Crear un empleado
router.post('/:id/employee',function(req,res,next){

    var hash=bcrypt.hashSync(req.body.password,salt);
    var employeeData={
        IdEmpleado:null,
        nick:req.body.nick,
        password:hash,
        tipoempleado:req.body.tipoempleado,
        empleador:req.params.id
    };

    Employee.insert(employeeData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,"Empleado creado");
        }
    })

});

/* PUT Modificar un usuario */
router.put('/:id/employee/:idempleado',function(req,res,next){

    var employeeData={
      IdEmpleado:req.params.idempleado,
        nick:req.body.nick,
        password:req.body.password,
        tipoempleado:req.body.tipoempleado,
        empleador:req.params.id
    };



    Employee.update(employeeData,req.params.idempleado,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })

});



//Mostrar imagenes por restaurante
router.get('/:id/images/',function(req,res,next){
  Images.findImagenRestaurant(req.params.id,function(error,data){
      if (error){
          res.json(500,error);
      }else{
          res.json(200,data);
      }
  })
});


//Crear una imagen
router.post('/:id/images',function(req,res,next){
    var imageData={
        IdImagenes:null,
        url:req.body.url,
        imagenesr:req.params.id
    };

    Images.insert(imageData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })

});

//Eliminar una imagen
router.delete("/:id/images/:idimagen",function(req,res,next){
    Images.remove(req.params.id,req.params.idimagen,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});


//Mostrar visitas a un restautante
router.get('/:id/visit',function(req,res,next){
  Visit.findVisitRestaurant(req.params.id,function(error,data){
      if (error){
          res.json(500,error);
      }else{
          res.json(200,data);
      }
  })
});

//Crear una denuncia
router.post('/denunciation',function(req,res,next){
    var denunciaData={
        usuarioU:req.body.usuarioU,
        restauranteR:req.body.restauranteR,
        comentarioC:req.body.comentarioC
    };

    Restaurant.finddenunciation(denunciaData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
          if(data!=null){
            res.json(200,"Denuncia ya realizada");
          }else{
              Restaurant.insertdenunciation(denunciaData,function(error,data){
                  if (error){
                      res.json(500,error);
                  }else{
                      res.json(200,data);
                  }
              })
          }
      }
    })
});

/* GET  Todas las denuncias */

router.get('/denunciation/all', function(req, res, next) {
    Restaurant.seedenunciations(function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* DELETE Borrar una denuncia */

router.delete("/denunciation/:id",function(req,res,next){

    Restaurant.removedenunciation(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })

    Restaurant.removecomment(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* PERMITE una denuncia */

router.delete("/denunciationallow/:id",function(req,res,next){

    Restaurant.removedenunciation(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })

    Restaurant.allowcomment(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});




/* GET  categoria por nombre */
router.get('/:id/products/category/name/:name', function(req, res, next) {

    Category.findlikename(req.params.name,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET categoria por su Id */
router.get('/:id/products/category/:id', function(req, res, next) {
    Category.findOneById(req.params.id, function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* PUT Modificar un category */
router.put('/:id/products/category/:idcategoria',function(req,res,next){
    var categoryData={
        idCategoria:req.params.idcategoria,
        nombre:req.body.nombre,
        restauranteCad:req.params.id
    };

    Category.update(req.params.id,req.params.idcategoria, categoryData, function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })

});

/* DELETE Borrar un Category */
router.delete('/:id/products/category/:idcategoria',function(req,res,next){
    Category.remove(req.params.id,req.params.idcategoria,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* Crear una categoria en un restaurante*/
router.post('/:id/products/category', function(req, res, next){
    var categoryData={
        IdCategoria: null,
        Nombre: req.body.nombre,
        restauranteCat: req.params.id
    };

      Category.insert(categoryData, function(error,data){
          if (error){
              res.json(500,error);
          }else{
              res.json(200,"Categoria anyadida");
          }
      })
  });

 /* Mostrar todos las categorias de un Restaurante*/
router.get("/:id/category", function(req, res, next){
    Category.findByRestaurantId(req.params.id, function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* POST Crear un pedido */
router.post('/orders', function(req,res,next){

    var OrderData={
        IdPedido:null,
        reservap:req.body.reservap,
        asignare:req.body.asignare,
        cuentatotal:req.body.cuentatotal,
        mesa:parseInt(req.body.mesa),
        dia:req.body.dia,
        finalizado:req.body.finalizado
    };

    Orders.insert(OrderData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            var salida={
              idPedido:data,
            }
            res.json(200,salida);
            aux=1;
        }
    })
});

/* GET Ver los pedidos en curso de un empleado */
router.get("/currentorders/:id", function(req, res, next){

    Orders.findordersemployee(req.params.id, function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET productos de pedido */
router.get('/orders/:id/orderproducts', function(req, res, next) {

    Orders.findOrderProducts(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* POST Crear un producto de pedido */
router.post('/orders/:id/orderproducts/', function(req,res,next){

    var date = new Date();
    var currentdate= date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

    var current_hour = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    var auxhour=date.getHours();
    var auxturno;

    var OrderProductData={
        IdProductoDePedido:null,
        pedidop:req.params.id,
        productop:req.body.productop,
        tipoproducto:req.body.tipoproducto,
        hora:date
    };

    Orders.insertOrderProduct(OrderProductData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
            aux=1;
        }
    })
});

/* DELETE Eliminar un producto de pedido */
router.delete('/orders/:id/orderproducts/:product', function(req,res,next){
  Orders.removeOrderProduct(req.params.id, req.params.product,function(error,data){
      if (error){
          res.json(500,error);
      }else{
          res.json(200,data);
      }
  })
});

/* CAMBIAR precio total al añadir un producto */
router.get('/currentorders/:id/addproduct/:product',function(req,res,next){
    Orders.Quitarprecio(req.params.id,req.params.product,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })

});

/* CAMBIAR precio total al eliminar un producto */
router.get('/currentorders/:id/deleteproduct/:product',function(req,res,next){
    Orders.Addprecio(req.params.id,req.params.product,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })

});


/* Terminar un pedido */
router.get('/currentorders/finish/:id',function(req,res,next){
    Orders.closepedido(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })

});

/* Mostrar productos que un CAMARERO debe entregar */
router.get('/currentorders/:id/pendientes',function(req,res,next){
    Orders.camareroPendientes(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })

});

/* Mostrar productos que un COCINERO debe hacer */
router.get('/currentorders/:idrestaurante/apreparar',function(req,res,next){
    Orders.cocineroPreparar(req.params.idrestaurante,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })

});

/*CAMBIA ESTADO DE UN PRODUCTO: PREPARADO-SERVIDO  */
router.get('/orders/:id/orderproducts/servido', function(req, res, next){

      Orders.CambiaEstadoPS(req.params.id,function(error,data){
          if (error){
              res.json(500,error);
          }else{
              res.json(200,data);
          }
      })
});

/*CAMBIA ESTADO DE UN PRODUCTO: PREPARANDO-PREPARADO  */
router.get('/orders/:id/orderproducts/preparado', function(req, res, next){

      Orders.CambiaEstadoPP2(req.params.id,function(error,data){
        if (error){
              res.json(500,error);
          }else{
              res.json(200,data);
          }
      })
});

/*CAMBIA ESTADO DE UN PRODUCTO: PREPARAR-PREPARANDO  */
router.get('/orders/:id/orderproducts/preparando', function(req, res, next){

    Orders.CambiaEstadoPP(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* Mostrar reservas de un dia concreto */
router.get('/:res/reservationstoday', function(req, res, next){

    Reservations.findreservation(req.params.res,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});


/* POST Crear una reserva (con un pedido) */
router.post('/reservationorder',function(req,res,next){

    var date = new Date();
    var currentdate= date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

    var current_hour = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    var auxhour=date.getHours();
    var auxturno;

    if(auxhour<17){
      auxturno="Comida";
    }else{
      auxturno="Cena";
    }

    auxpin=req.body.restauranter+req.body.mesa;

    var ReservationData={
        IdReserva:null,
        dia:currentdate,
        turno:auxturno,
        hora:current_hour,
        comensales:req.body.comensales,
        usuarior:0,
        restauranter:req.body.restauranter,
        pin:auxpin
    };

    var AforoData={
        IdAforo:req.body.restauranter,
        dia:currentdate,
        turno:auxturno,
        idrestaurante:req.body.restauranter,
        comensales:req.body.comensales
    };

    Reservations.updateAforo2(AforoData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })

    Reservations.insertReservation2(ReservationData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
            aux=1;
        }
    })

});

/*Mostrar PIN de una reserva (pedido)*/
router.get('/:id/pin', function(req, res, next){

    Reservations.seepin(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/*Borrar PIN al terminar un pedido*/
router.get('/:id/deletepin', function(req, res, next){

    Reservations.deletepin(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/*Borrar PIN a gusto*/
router.get('/deletepin/:pin', function(req, res, next){

    Reservations.deletepinbutton(req.params.pin,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/*Buscar comentario*/
router.get('/:id/findcomment/:contenido', function(req, res, next){

    Comments.findcomment(req.params.id,req.params.contenido,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* Info comida */
router.get('/:id/informationlunch/:dia', function(req, res, next) {

  var infoData={
      dia:req.params.dia,
      restaurante:req.params.id
  };

    Restaurant.infocomida(infoData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* Info cena */
router.get('/:id/informationdinner/:dia', function(req, res, next) {

  var infoData={
      dia:req.params.dia,
      restaurante:req.params.id
  };

    Restaurant.infocena(infoData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* Info cena */
router.get('/:id/valorationcomments', function(req, res, next) {

    Comments.valorationcomments(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});


module.exports = router;
