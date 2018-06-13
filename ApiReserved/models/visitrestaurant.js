var mysql=require("mysql");
var configDB=require("../config/configdb");

/* Conectar con la DB */
connection=mysql.createConnection({
        host: configDB.dbreserved.host,
        user: configDB.dbreserved.user,
        password: configDB.dbreserved.password,
        database: configDB.dbreserved.database
});

var Visit={};

//Muestra las visitas de un usuario
Visit.findVisitUser=function(id, callback){
    if (connection){

        var sql=("SELECT fecha FROM visitarestaurante WHERE usuarioId="+connection.escape(id));
        console.log(sql);
        connection.query(sql,function(error,row){
            if (error){
                throw error;
            }else{
                return callback(null,row);
            }
        })
    }
}


//Muestra las visitas de un restaurante
Visit.findVisitRestaurant=function(id, callback){
    if (connection){

        var sql=("SELECT  fecha FROM visitarestaurante WHERE restauranteId="+connection.escape(id));
        console.log(sql);
        connection.query(sql,function(error,row){
            if (error){
                throw error;
            }else{
                return callback(null,row);
            }
        })
    }
}

//Muestra las visitas de un usuario a un restaurante
Visit.findVisit=function(id,idrestaurante, callback){
    if (connection){

        var sql=("SELECT  fecha FROM visitarestaurante WHERE restauranteId="+connection.escape(idrestaurante)+"and usuarioId="+connection.escape(id));
        console.log(sql);
        connection.query(sql,function(error,row){
            if (error){
                throw error;
            }else{
                return callback(null,row);
            }
        })
    }
}


/* Crear una visita */
Visit.insert=function(visitData,callback){
    if(connection){
        connection.query("INSERT INTO visitarestaurante SET ?",visitData,function(error,result){


            if (error){
                throw error;
            }else{
                return callback(null,"Visita Hecha");
            }
        })
    }
}

/* Eliminar una visita */
Visit.remove=function(id,idvisita,callback){
    if(connection){
            var sql=("DELETE FROM visitarestaurante WHERE idVisita="+connection.escape(idvisita)+"and usuarioId="+connection.escape(id));
        console.log(sql);
          connection.query(sql,function(error,result){
            if(error){
                throw error;
            }else{
                return callback(null,"Visita eliminada");
            }
        })
    }
}










module.exports = Visit;
