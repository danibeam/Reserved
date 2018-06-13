var mysql=require("mysql");

var configDB=require("../config/configdb");

/* Conectar con la DB */
connection=mysql.createConnection({
        host: configDB.dbreserved.host,
        user: configDB.dbreserved.user,
        password: configDB.dbreserved.password,
        database: configDB.dbreserved.database
});

var Order={};


/* Mostar todos los pedidos */
Order.all= function(callback){
    if (connection){
        connection.query("SELECT CuentaTotal,Mesa FROM pedidos",function (error,rows){
            if (error){
                throw error;
            }else{
                return callback(null,rows);
            }
        })
    }
}

/* Mostar un pedido buscado por su Id */
Order.findOneById=function(id, callback){
    if (connection){
        var sql=("SELECT CuentaTotal,Mesa FROM pedidos WHERE IdPedido ="+connection.escape(id));
        connection.query(sql,function(error,row){
            if (error){
                throw error;
            }else{
                return callback(null,row);
            }
        })
    }
}


/* Mostrar productos de un pedido*/
Order.findOrderProducts = function(id, callback){
  if(connection){
      var sql = ("select pp.idProductoDePedido,p.precio,p.informacion, pp.PedidoP, pp.TipoProducto, p.IdProducto, p.nombre from productosdepedido pp, productos p where pp.ProductoP = p.IdProducto and pp.PedidoP ="+connection.escape(id));
      connection.query(sql,function(error,rows){
          if (error){
              throw error;
          }else{
              return callback(null,rows);
          }
      })
  }
}

/*CAMBIA ESTADO DE UN PRODUCTO: PREPARAR-PREPARANDO  */
Order.CambiaEstadoPP = function(id, callback){
  if(connection){
    var sql = "UPDATE productosdepedido SET tipoproducto='Preparando' where tipoproducto='Preparar' and idProductoDePedido ="+connection.escape(id);
      console.log(sql);
      connection.query(sql,function(error,rows){
          if (error){
              throw error;
          }else{
              return callback(null,"Producto Preparandose");
          }
      })
  }
}

/*CAMBIA ESTADO DE UN PRODUCTO: PREPARANDO-PREPARADO  */

Order.CambiaEstadoPP2 = function(id, callback){
  if(connection){
    var sql ="UPDATE productosdepedido SET tipoproducto='Preparado' where idProductoDePedido ="+connection.escape(id);
      console.log(sql);
      connection.query(sql,function(error,rows){
          if (error){

              throw error;
          }else{
              return callback(null,"Producto Preparado");
          }
      })
  }
}

/*CAMBIA ESTADO DE UN PRODUCTO: PREPARADO-SERVIDO  */

Order.CambiaEstadoPS = function(id,callback){
  if(connection){
    var sql ="UPDATE productosdepedido SET tipoproducto='Servido' where idProductoDePedido="+connection.escape(id);
      connection.query(sql,function(error,rows){
          if (error){
              throw error;
          }else{
              return callback(null,"Producto Servido");
          }
      })
  }
}



/* Crear un pedido (cada vez que se pida un producto) */
Order.insert = function(OrderData, callback){
  if(connection){
    connection.query("INSERT INTO pedidos SET ?",OrderData,function(error,result){
        if (error){
            throw error;
        }else{
            return callback(null,result.insertId);
        }
    })
  }
}

Order.findordersemployee=function(id,callback){
  var date = new Date();
  var currentdate= date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

  if(connection){
    var sql="SELECT * FROM pedidos where asignarE="+connection.escape(id)+" AND dia='"+currentdate+"' AND finalizado=0";

    connection.query(sql,function(error,rows){
        if (error){
            throw error;
        }else{
            return callback(null,rows);
        }
    })
  }
}

Order.closepedido=function(id,callback){
  if(connection){
    var sql="UPDATE pedidos set finalizado=1 where idPedido="+connection.escape(id);
    connection.query(sql,function(error,row){
        if (error){
            throw error;
        }else{
            return callback(null,row);
        }
    })
  }
}

/* Crear un producto de pedido (meter un producto en un pedido) */
Order.insertOrderProduct = function(OrderProductData, callback){
  if(connection){
    connection.query("INSERT INTO productosdepedido SET ?",OrderProductData,function(error,result){
          if (error){
              throw error;
          }else{
              return callback(null,"Producto de pedido creado");
          }
      })
  }
}

/* GET de productos de pedido por tipo de producto */
Order.findOrderProductsbyType = function(id,tipo, callback){
  if(connection){
      var sql = ("select pp.PedidoP, pp.TipoProducto, p.IdProducto, p.nombre from productosdepedido pp, productos p where pp.ProductoP = p.IdProducto and pp.PedidoP ="+connection.escape(id)+"and pp.TipoProducto="+connection.escape(tipo));
      connection.query(sql,function(error,rows){
          if (error){
              throw error;
          }else{
              return callback(null,rows);
          }
      })
  }
}

/* GET facturas */
Order.findOrderbyBill = function(id, callback){
  if(connection){
      var sql = ("select p.cuentatotal from  pedidos p,reservas r where r.UsuarioR = "+connection.escape(id)+"and r.IdReserva=p.Reservap");
      connection.query(sql,function(error,rows){
          if (error){
              throw error;
          }else{
              return callback(null,rows);
          }
      })
  }
}

/* GET facturas por nombre de restaurante */

Order.findOrderbyBillbyName = function(id,nombre,callback){
  if(connection){
      var sql = ("select re.nombre,p.cuentatotal from  pedidos p,reservas r,restaurantes re where r.UsuarioR = "+connection.escape(id)+"and r.IdReserva=p.Reservap and r.restauranter=re.idrestaurante and re.nombre="+connection.escape(nombre));
      console.log(sql);
      connection.query(sql,function(error,rows){
          if (error){
              throw error;
          }else{
              return callback(null,rows);
          }
      })
  }
}

/* GET facturas filtrado por precio */
Order.findOrderbyBillFilterPrice = function(id,cuentainicial,cuentafinal, callback){
  if(connection){

      var sql = ("select p.cuentatotal from  pedidos p,reservas r where r.UsuarioR = "+connection.escape(id)+"and r.IdReserva=p.Reservap and p.cuentatotal >="+connection.escape(cuentainicial)+" and p.cuentatotal <="+connection.escape(cuentafinal));

      connection.query(sql,function(error,rows){
          if (error){
              throw error;
          }else{
              return callback(null,rows);
          }
      })
  }
}

/* GET facturas filtrado por precio minimo */
Order.findOrderbyBillFilterPriceUnder = function(id,cuentainicial, callback){
  if(connection){
      var sql = ("select p.cuentatotal from  pedidos p,reservas r where r.UsuarioR = "+connection.escape(id)+"and r.IdReserva=p.Reservap and p.cuentatotal >="+connection.escape(cuentainicial));

      connection.query(sql,function(error,rows){
          if (error){
              throw error;
          }else{
              return callback(null,rows);
          }
      })
  }
}


/* GET facturas filtrado por precio maximo */
Order.findOrderbyBillFilterPriceOver = function(id,cuentainicial, callback){
  if(connection){
      var sql = ("select p.cuentatotal from  pedidos p,reservas r where r.UsuarioR = "+connection.escape(id)+"and r.IdReserva=p.Reservap and p.cuentatotal <="+connection.escape(cuentainicial));

      connection.query(sql,function(error,rows){
          if (error){
              throw error;
          }else{
              return callback(null,rows);
          }
      })
  }
}

/*Metodo para avisar al camarero*/
Order.OrdersEmployee = function(id,idempleado, callback){
  if(connection){
      var sql = ("select mesa from  pedidos p where IdPedido = "+connection.escape(id)+"and asignare= "+connection.escape(idempleado));

      connection.query(sql,function(error,rows){
          if (error){
              throw error;
          }else{
              return callback(null,rows);
          }
      })
  }
}

/* Eliminar un pedido */
Order.remove = function(id, callback){
  if(connection){
    connection.query("DELETE from pedidos where IdPedido = "+connection.escape(id),function(error,result){
        if (error){
            throw error;
        }else{
            return callback(null,"Pedido eliminado");
        }
    })
  }
}

/* Modificar un pedido*/
Order.update = function(OrderData, callback){

  if(connection){
    var coma=false;

      var sql = "UPDATE pedidos set ";
      if(OrderData.asignare != undefined)
      {
        sql += "AsignarE = "+connection.escape(OrderData.asignare);
        coma=true;
      }

      if(OrderData.asignare != undefined)
      {
        if(coma== true)
        {
          sql += ",";
          coma=false;
        }

        sql += "CuentaTotal = "+connection.escape(OrderData.cuentatotal);
        coma=true;
      }

      if(OrderData.mesa != undefined)
      {
        if(coma== true)
        {
          sql += ",";
          coma=false;
        }

        sql += "Mesa = "+connection.escape(OrderData.mesa);
        coma=true;
      }

      sql += "where IdPedido = "+OrderData.IdPedido;
      console.log(sql);

      connection.query(sql,function(error,result){
          if (error){
              throw error;
          }else{
              return callback(null,"Pedido actualizado");
          }
      })
  }
}

/* Crear un producto de pedido (meter un producto en un pedido) */
Order.insertOrderProduct = function(OrderProductData, callback){
  if(connection){
    connection.query("INSERT INTO productosdepedido SET ?",OrderProductData,function(error,result){
          if (error){
              throw error;
          }else{
              return callback(null,"Producto de pedido creado");
          }
      })
  }
}

/* Eliminar un producto de pedido*/
Order.removeOrderProduct = function(id, product, callback){
  if(connection){
    connection.query("DELETE from productosdepedido where PedidoP = "+connection.escape(id)+" and idProductoDePedido = "+connection.escape(product),function(error,result){
        if (error){
            throw error;
        }else{
            return callback(null,"Producto de pedido eliminado");
        }
    })
  }
}

/* Sumar precio de producto pedido  */
Order.Quitarprecio = function(id, product, callback){
  if(connection){
    connection.query("UPDATE pedidos,productos,productosdepedido set cuentaTotal=cuentaTotal+precio where idProducto="+connection.escape(product)+" and idPedido="+connection.escape(id),function(error,result){
        if (error){
            throw error;
        }else{
            return callback(null,"Precio reestablecido");
        }
    })
  }
}

/* Restar precio de producto de pedido eliminado */
Order.Addprecio = function(id, product, callback){
  if(connection){
    connection.query("UPDATE pedidos,productos,productosdepedido set cuentaTotal=cuentaTotal-precio where idProducto="+connection.escape(product)+" and idPedido="+connection.escape(id),function(error,result){
        if (error){
            throw error;
        }else{
            return callback(null,"Precio reestablecido");
        }
    })
  }
}

/* Mostrar productos que un camarero debe entregar */
Order.camareroPendientes = function(id, callback){
  if(connection){
    connection.query("select idProductoDePedido,nombre,mesa,hora,productoP from productosdepedido pp, pedidos p, productos pr where pedidoP=idPedido and idProducto=productoP and asignarE="+connection.escape(id)+" and tipoProducto='Preparado' ORDER BY hora ASC",function(error,rows){
        if (error){
            throw error;
        }else{
            return callback(null,rows);
        }
    })
  }
}

/* Mostrar productos que un cocinero debe hacer */
Order.cocineroPreparar = function(id, callback){
  if(connection){
    connection.query("select idProductoDePedido,nombre,mesa,hora,tipoProducto from productosdepedido pp, pedidos p, productos pr,empleados e where idEmpleado=asignarE and empleadoR="+connection.escape(id)+" and pedidoP=idPedido and idProducto=productoP and (tipoProducto='Preparar' or tipoProducto='Preparando') ORDER BY hora ASC",function(error,rows){
        if (error){
            throw error;
        }else{
            return callback(null,rows);
        }
    })
  }
}

/* Modificar el estado de un producto de pedido */
/*Order.updateOrderProduct = function(id, callback){
  if(connection){
      var sql = ("UPDATE productosdepedido SET ");
      connection.query(sql,function(error,result){
          if (error){
              throw error;
          }else{
              return callback(null,"Producto de pedido actualizado");
          }
      })
  }
}*/


module.exports = Order;
