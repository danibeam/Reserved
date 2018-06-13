var mysql=require("mysql");

var configDB=require("../config/configdb");

/* Conectar con la DB */
connection=mysql.createConnection({
        host: configDB.dbreserved.host,
        user: configDB.dbreserved.user,
        password: configDB.dbreserved.password,
        database: configDB.dbreserved.database
});
var Reservation={};





/* Mostar las reservas de un usuario*/
Reservation.findUserReserve=function(id, callback){
    if (connection){
        var sql=("select idReserva,idRestaurante,idPedido,r.dia,hora,re.nombre,comensales from pedidos p, reservas r,usuarios u,restaurantes re  where IdRestaurante=restauranter and finalizado=1  and IdReserva=reservaP and IdUsuario=usuarior and UsuarioR="+connection.escape(id));
        connection.query(sql,function(error,rows){
            if (error){
                throw error;
            }else{
                return callback(null,rows);
            }
        })
    }
}

/* Crear una reserva */

//Este metodo lo que hace es crear la reserva
Reservation.insertReservation=function(ReservationData,callback){
    if(connection){
        connection.query("INSERT INTO reservas SET ?",ReservationData,function(error,result){
            if (error){
                throw error;
            }else{
                //return callback(null,result.insertid);
            }
        })
    }
}

//Este metodo lo que hace es crear una fila en aforo_libre o modificar una existente ajustando el aforo de un restaurante ese dia a ese turno
Reservation.updateAforo=function(AforoData,callback){
    if(connection){
        var sql=("INSERT INTO aforo_libre values (" + AforoData.IdAforo + ",'" + AforoData.dia + "','" + AforoData.turno + "',(SELECT aforo-"+AforoData.comensales+" FROM restaurantes where IdRestaurante="+AforoData.idrestaurante+")," + AforoData.idrestaurante + ") ON DUPLICATE KEY update aforo=aforo-" + AforoData.comensales);
        connection.query(sql,function(error,result){
            if (error){
                throw error;
            }else{
                return callback(null,result.insertid);
            }
        })
    }
}

/* Crear una reserva (PARA UN PEDIDO SIN RESERVA) */

//Este metodo lo que hace es crear la reserva
Reservation.insertReservation2=function(ReservationData,callback){
    if(connection){
        connection.query("INSERT INTO reservas SET ?",ReservationData,function(error,result){
            if (error){
                throw error;
            }else{
                var salida={
                  idReserva:result.insertId,
                }
                return callback(null,salida);
            }
        })
    }
}

//Este metodo lo que hace es crear una fila en aforo_libre o modificar una existente ajustando el aforo de un restaurante ese dia a ese turno
Reservation.updateAforo2=function(AforoData,callback){
    if(connection){
        var sql=("INSERT INTO aforo_libre values (" + AforoData.IdAforo + ",'" + AforoData.dia + "','" + AforoData.turno + "',(SELECT aforo-"+AforoData.comensales+" FROM restaurantes where IdRestaurante="+AforoData.idrestaurante+")," + AforoData.idrestaurante + ") ON DUPLICATE KEY update aforo=aforo-" + AforoData.comensales);
        connection.query(sql,function(error,result){
            if (error){
                throw error;
            }else{
                //return callback(null,result.insertid);
            }
        })
    }
}

/* Elimina una reserva */

Reservation.remove=function(Id,callback){
    if(connection){
        var sql= "DELETE FROM reservas WHERE idReserva=" + connection.escape(Id);
        connection.query(sql,function(error,result){
            if(error){
                throw error;
            }else{
                return callback(null,"Reserva eliminada");
            }
        })
    }
}

Reservation.removeAforo=function(Id,ReservationData,callback){
    if(connection){
        var sql="UPDATE aforo_libre set aforo=aforo+(SELECT comensales from reservas where Idreserva="+connection.escape(Id)+") WHERE idaforo="+ReservationData.restaurante+" AND dia='"+ReservationData.dia+"' AND turno='"+ReservationData.turno+"'";
        connection.query(sql,function(error,result){
            if (error){
                console.log(sql);
                throw error;
            }else{
                //return callback(null,"Aforo actualizado");
            }
        })
    }
}

/* Modificar una reserva */

/*Aqui modificamos el aforo dependiendo de como cambien los comensales*/
Reservation.update=function(ReservationData,idreserva,callback){
    if(connection){
        var sql="UPDATE aforo_libre set aforo=aforo+(SELECT comensales from reservas where idreserva="+connection.escape(idreserva)+")-"+ReservationData.comensales+" where idaforo="+ReservationData.IdAforo+" AND dia='"+ReservationData.dia+"' AND turno='"+ReservationData.turno+"'";
        console.log("sql");
        connection.query(sql,function(error,result){
            if (error){
                throw error;
            }else{
                //return callback(null,"Aforo actualizado");
            }
        })
    }
}

Reservation.updatereservation=function(ReservationData,idreserva,callback){
    if(connection){
        var sql="UPDATE reservas SET comensales="+ReservationData.comensales+", hora='"+ReservationData.hora+"' WHERE idreserva="+connection.escape(idreserva);
        connection.query(sql,function(error,result){
            if (error){
                throw error;
            }else{
                return callback(null,"Reserva actualizada");
            }
        })
    }
}

/* Mostrar el idpedido dada su reserva*/
Reservation.findorderbyreserve=function(id,idreserva, callback){
    if (connection){
        var sql=("select idPedido,cuentaTotal from pedidos,reservas WHERE idReserva=reservaP AND idReserva="+connection.escape(idreserva));
        connection.query(sql,function(error,rows){
            if (error){
                throw error;
            }else{
                return callback(null,rows);
            }
        })
    }
}

/*Mostrar reservas de hoy */
Reservation.findreservation=function(restaurante, callback){
  var date = new Date();
  var currentdate= date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

  var current_hour = date.getHours();
  var turno;

  if(current_hour<17){
    turno="Comida";
  }else{
    turno="Cena";
  }

  if (connection){
      var sql=("select nick,reservas.* from reservas,usuarios where usuarioR=idUsuario and dia='"+currentdate+"' and restauranteR="+connection.escape(restaurante)+"and turno='"+turno+"' and usuarioR!=0");
      connection.query(sql,function(error,rows){
          if (error){
              throw error;
          }else{
              return callback(null,rows);
          }
      })
  }
}

/* Eliminar PIN de una reserva al terminar el pedido */
Reservation.deletepin=function(id, callback){
    if (connection){
        var sql=("update reservas,pedidos set pin=null where idReserva=reservaP and idPedido="+connection.escape(id));
        connection.query(sql,function(error,row){
            if (error){
                throw error;
            }else{
                return callback(null,row);
            }
        })
    }
}

/*Mostrar PIN de una reserva (pedido)*/
Reservation.seepin = function(id, callback){
  if(connection){
    var sql=("select pin from reservas,pedidos where idReserva=reservaP and idPedido="+connection.escape(id));
    connection.query(sql,function(error,row){
        if (error){
            throw error;
        }else{
            return callback(null,row);
        }
    })
  }
}

// Mostrar el idpedido insertando el pin sin reserva
Reservation.insertPin = function(pinData, callback){
    if(connection){
      var sql=("select pin,idReserva,usuarioR,restauranteR from reservas where pin="+pinData.pin);
      connection.query(sql,function(error,row){
        if (error){
            throw error;
        }else if(row!=""){
            return callback(null,row);
        }else{
            return callback(null,null);
        }
      })
    }
  }
  /* Mostar las reservas de un usuario que tienen los pedidos confirmadosconfirmadas*/
Reservation.findReserve=function(id, callback){
    if (connection){
        var sql=("select idRestaurante,idReserva,hora,re.nombre,comensales,mesa, pe.finalizado from reservas r,usuarios u,restaurantes re,pedidos pe  where finalizado=0 and IdRestaurante=restauranter and IdUsuario=usuarior and idReserva=reservap and UsuarioR="+connection.escape(id));
        connection.query(sql,function(error,rows){
            if (error){
                throw error;
            }else{
                return callback(null,rows);
            }
        })
    }
}

Reservation.deletepinbutton=function(pin, callback){
    if (connection){
        var sql=("update reservas set pin=null where pin="+connection.escape(pin));
        connection.query(sql,function(error,row){
            if (error){
                throw error;
            }else{
                return callback(null,row);
            }
        })
    }
}


/* Mostar las reservas de un usuario posterior a la fecha actual*/
Reservation.findUserReservefuture=function(id, callback){
    var date = new Date();
    var currentdate= date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-';
    var dia=date.getDate();
    dia=dia-1;
    currentdate=currentdate+dia;
    console.log(currentdate)
    if (connection){
        var sql=("select idRestaurante,idReserva,dia,hora,turno,re.nombre,comensales from reservas r,usuarios u,restaurantes re  where IdRestaurante=restauranter and dia > '"+currentdate+"' and IdUsuario=usuarior and UsuarioR="+connection.escape(id));
        connection.query(sql,function(error,rows){
            if (error){
                throw error;
            }else{
                return callback(null,rows);
            }
        })
    }
}
/*Modificar el usuario una vez que mete el pin y borrarlo*/
Reservation.updatepin=function(id,pinData,callback){
    if(connection){
        var sql=("update reservas set pin=null, usuarioR="+connection.escape(pinData.usuarioR)+" where idReserva="+connection.escape(id));
        //usuarioR="+connection.escape(pinData.usuarioR)+
        connection.query(sql,function(error,result){
            if (error){
                throw error;
            }else{
                return callback(null,"Pin actualizado");
            }
        })
    }
}

/*comprobar aforo*/
Reservation.comprobaraforo=function(aforoData,callback){
    if(connection){
        var sql=("SELECT * FROM aforo_libre WHERE dia="+connection.escape(aforoData.dia)+" AND turno="+connection.escape(aforoData.turno));
        connection.query(sql,function(error,row){
            if (error){
                throw error;
            }else{
                return callback(null,row);
            }
        })
    }
}




module.exports=Reservation;
