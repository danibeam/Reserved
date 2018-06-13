var mysql=require("mysql");

var configDB=require("../config/configdb");

/* Conectar con la DB */
connection=mysql.createConnection({
        host: configDB.dbreserved.host,
        user: configDB.dbreserved.user,
        password: configDB.dbreserved.password,
        database: configDB.dbreserved.database
});

var Category={};

/*Mostrar una categoria por su nombre */
Category.findlikename= function(nick,callback){
    var nombre=nick;
    if (connection){
        connection.query("SELECT * FROM categorias where nombre like '%"+nombre+"%'",function (error,rows){
            if (error){
                throw error;
            }else{
                return callback(null,rows);
            }
        })
    }
}
/* Mostar una categoria  por su Id */
Category.findOneById=function(id, callback){
    if (connection){
        var sql=("SELECT  idCategoria,nombre FROM categorias WHERE idCategoria="+connection.escape(id));
        connection.query(sql,function(error,row){
            if (error){
                throw error;
            }else{
                return callback(null,row);
            }
        })
    }
}
/* Crear una Categoria */
Category.insert=function(categoryData,callback){
    if(connection){
        connection.query("INSERT INTO categorias SET ?",categoryData,function(error,result){
            if (error){
                throw error;
            }else{
                return callback(null,result.insertid);
            }
        })
    }
}

/* Modificar una categoria */
Category.update=function(idrestaurante,idcategoria,categoryData,callback) {
  var coma=false;
  if(connection){
      var sql= "UPDATE categorias SET "

      if(categoryData.nombre != undefined)
      {
        sql += " nombre="+connection.escape(categoryData.nombre);
        coma=true;
      }

     

      sql +=  " WHERE idCategoria="+connection.escape(idcategoria)+"AND restauranteCat = "+connection.escape(idrestaurante);

          connection.query(sql,function(error,result){
          if(error){
              throw error;
          }else{
              return callback(null,"Categoria actualizada");
          }
      })
  }
}

/* Eliminar una categoria */
Category.remove = function(id,categoria,callback){
    if (connection){
      var sql = ("DELETE FROM categorias WHERE idCategoria ="+connection.escape(id)+" AND restauranteCat ="+connection.escape(categoria));
      connection.query(sql,function(error,result){
          if (error){
              throw error;
          }
          else{
              return callback(null,"Producto eliminado");
          }
      })
    }
}

/* Mostrar todos las categorias de un Restaurante*/
Category.findByRestaurantId = function(id,callback){
    if (connection){
      var sql = ("SELECT idCategoria,nombre FROM categorias WHERE restauranteCat ="+connection.escape(id));
      connection.query(sql,function(error,rows){
          if (error){
              throw error;
          }
          else{
              return callback(null,rows);
          }
      })
    }
}

module.exports = Category;