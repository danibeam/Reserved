var mysql=require("mysql");

var configDB=require("../config/configdb");

/* Conectar con la DB */
connection=mysql.createConnection({
        host: configDB.dbreserved.host,
        user: configDB.dbreserved.user,
        password: configDB.dbreserved.password,
        database: configDB.dbreserved.database
});

var Products={};
var Category={};

/* Mostrar todos los restaurantes segun el plato */
Products.findByRestaurantByNameProduct = function(nombreproducto,callback){
    if (connection){
      var sql = ("SELECT r.Nombre FROM productos p,restaurantes r WHERE p.nombre="+connection.escape(nombreproducto));

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

/* Mostrar los productos segun su tipo */
Products.findProductsByType = function(id,tipo,callback){
    if (connection){
      var sql = ("SELECT p.nombre,p.tipo FROM productos p WHERE restaurantep="+connection.escape(id)+"AND tipo="+connection.escape(tipo));



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
/* Mostrar los productos segun su categoria */
Products.findProductsByCategory = function(id,categoria,callback){
    if (connection){
      var sql = ("SELECT  p.idProducto,p.nombre,p.precio, p.informacion, p.tipo FROM productos p WHERE restaurantep="+connection.escape(id)+"AND categoria="+connection.escape(categoria));



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
/* Mostrar los productos segun su categoria
Products.findProductsByCategory = function(id,categoria,callback){
    if (connection){
      var sql = ("SELECT p.nombre,p.categoria FROM productos p WHERE restaurantep="+connection.escape(id)+"AND categoria="+connection.escape(categoria));



      connection.query(sql,function(error,rows){
          if (error){
              throw error;
          }
          else{
              return callback(null,rows);
          }
      })
    }
}*/

/* Mostar un producto en concreto */
Products.findProduct = function(id,callback){
    if (connection){
      connection.query("SELECT * FROM productos WHERE idProducto ="+connection.escape(id) ,function(error,row){
          if (error){
              throw error;
          }else{
              return callback(null,row);
          }
      })
    }
}



/* Mostrar todos los productos de un Restaurante*/
Products.findByRestaurantId = function(id,callback){
    if (connection){
      var sql = ("SELECT idProducto,nombre,precio,tipo,categoria,informacion FROM productos WHERE RestauranteP ="+connection.escape(id));
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

/* Borrar un producto de un restaurante*/
Products.remove = function(id,product,callback){
    if (connection){
      var sql = ("DELETE FROM productos WHERE IdProducto ="+connection.escape(product)+" AND RestauranteP ="+connection.escape(id));
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

/* Crear un producto en un restaurante*/
Products.insert = function(productData,callback){
    if (connection){
      connection.query("INSERT INTO productos SET ?",productData,function(error,result){
          if (error){
              throw error;
          }else{
              return callback(null,result.insertid);
          }
      })
    }
}


/* Modifica un producto en un restaurante*/
Products.update = function(id,idproducto, productData,callback){
  var coma=false;

    if(connection){
        var sql= "UPDATE productos SET "

        if(productData.Nombre != "")
        {
          sql += " nombre="+connection.escape(productData.Nombre);
          coma=true;
        }

        if(productData.Precio != "")
        {
          if(coma== true)
          {
            sql += ",";
            coma=false;
          }
          sql +=  "precio="+connection.escape(productData.Precio);
          coma=true;
        }

        if(productData.Tipo != "")
        {
          if(coma== true)
          {
            sql += ",";
            coma=false;
          }
          sql +=  "tipo="+connection.escape(productData.Tipo);
          coma=true;
        }

        if(productData.Informacion != "")
        {
          if(coma== true)
          {
            sql += ",";
            coma=false;
          }
          sql += "informacion="+connection.escape(productData.Informacion);
          coma=true;
        }

        if(productData.Categoria != "")
        {
          if(coma== true)
          {
            sql += ",";
            coma=false;
          }
          sql +=  "categoria="+connection.escape(productData.Categoria);
          coma=true;
        }

        if(productData.Gluten != 0)
        {
          if(coma== true)
          {
            sql += ",";
            coma=false;
          }
          if(productData.Gluten==1){
            sql +=  "gluten=1";
            coma=true;
          }else{
            sql +=  "gluten=0";
            coma=true;
          }

        }

        if(productData.Crustaceos != 0)
        {
          if(coma== true)
          {
            sql += ",";
            coma=false;
          }
          if(productData.Crustaceos==1){
            sql +=  "crustaceos=1";
            coma=true;
          }else{
            sql +=  "crustaceos=0";
            coma=true;
          };
        }

        if(productData.Huevos != 0)
        {
          if(coma== true)
          {
            sql += ",";
            coma=false;
          }
          if(productData.Huevos==1){
            sql +=  "huevos=1";
            coma=true;
          }else{
            sql +=  "huevos=0";
            coma=true;
          }
        }

        if(productData.Pescado != 0)
        {
          if(coma== true)
          {
            sql += ",";
            coma=false;
          }
          if(productData.Pescado==1){
            sql +=  "pescado=1";
            coma=true;
          }else{
            sql +=  "pescado=0";
            coma=true;
          }
        }

        if(productData.Cacahuetes != 0)
        {
          if(coma== true)
          {
            sql += ",";
            coma=false;
          }
          if(productData.Cacahuetes==1){
            sql +=  "cacahuetes=1";
            coma=true;
          }else{
            sql +=  "cacahuetes=0";
            coma=true;
          }
        }

        if(productData.Soja != 0)
        {
          if(coma== true)
          {
            sql += ",";
            coma=false;
          }
          if(productData.Soja==1){
            sql +=  "soja=1";
            coma=true;
          }else{
            sql +=  "soja=0";
            coma=true;
          }
        }

        if(productData.Lacteos != 0)
        {
          if(coma== true)
          {
            sql += ",";
            coma=false;
          }
          if(productData.Lacteos==1){
            sql +=  "lacteos=1";
            coma=true;
          }else{
            sql +=  "lacteos=0";
            coma=true;
          }
        }

        if(productData.Frutos_cascara != 0)
        {
          if(coma== true)
          {
            sql += ",";
            coma=false;
          }
          if(productData.Frutos_cascara==1){
            sql +=  "frutos_cascara=1";
            coma=true;
          }else{
            sql +=  "frutos_cascara=0";
            coma=true;
          }
        }

        if(productData.Apio != 0)
        {
          if(coma== true)
          {
            sql += ",";
            coma=false;
          }
          if(productData.Apio==1){
            sql +=  "apio=1";
            coma=true;
          }else{
            sql +=  "apio=0";
            coma=true;
          }
        }

        if(productData.Mostaza != 0)
        {
          if(coma== true)
          {
            sql += ",";
            coma=false;
          }
          if(productData.Mostaza==1){
            sql +=  "mostaza=1";
            coma=true;
          }else{
            sql +=  "mostaza=0";
            coma=true;
          }
        }

        if(productData.Sesamo != 0)
        {
          if(coma== true)
          {
            sql += ",";
            coma=false;
          }
          if(productData.Sesamo==1){
            sql +=  "sesamo=1";
            coma=true;
          }else{
            sql +=  "sesamo=0";
            coma=true;
          }
        }

        if(productData.Dioxido_azufre != 0)
        {
          if(coma== true)
          {
            sql += ",";
            coma=false;
          }
          if(productData.Dioxido_azufre==1){
            sql +=  "dioxido_azufre=1";
            coma=true;
          }else{
            sql +=  "dioxido_azufre=0";
            coma=true;
          }
        }

        if(productData.Moluscos != 0)
        {
          if(coma== true)
          {
            sql += ",";
            coma=false;
          }
          if(productData.Moluscos==1){
            sql +=  "moluscos=1";
            coma=true;
          }else{
            sql +=  "moluscos=0";
            coma=true;
          }
        }

        if(productData.Altramuces != 0)
        {
          if(coma== true)
          {
            sql += ",";
            coma=false;
          }
          if(productData.Altramuces==1){
            sql +=  "altramuces=1";
            coma=true;
          }else{
            sql +=  "altramuces=0";
            coma=true;
          }
        }

    sql +=  " WHERE idproducto="+connection.escape(idproducto)+"AND restaurantep = "+connection.escape(id);

    console.log(sql);

            connection.query(sql,function(error,result){
            if(error){
                throw error;
            }else{
                return callback(null,"Producto actualizado");
            }
        })
    }
}

module.exports = Products;
