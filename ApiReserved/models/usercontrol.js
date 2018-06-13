var mysql=require("mysql");

var configDB=require("../config/configdb");

/* Conectar con la DB */
connection=mysql.createConnection({
        host: configDB.dbreserved.host,
        user: configDB.dbreserved.user,
        password: configDB.dbreserved.password,
        database: configDB.dbreserved.database
});
var UserControl={};



UserControl.insert = function(ControlData,callback){
    if (connection){

      console.log(ControlData.fecha);
      var sql=("INSERT INTO controlusuarios values (" + ControlData.idcontrolu + ",'" + ControlData.usuarioid + "','" + ControlData.fecha +" ') ON DUPLICATE KEY update controlusuarios.fecha= ' " + ControlData.fecha+" ' " );
      console.log(sql);
      connection.query(sql,function(error,result){
          if (error){
              throw error;
          }else{
              return callback(null,"Login Hecho");
          }
      })


    }
}


UserControl.findUserControl = function(id,callback){
    if (connection){
      var sql = ("SELECT fecha FROM controlusuarios WHERE usuarioid="+connection.escape(id));


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

/* Eliminar un Usuario */
UserControl.remove=function(Id,callback){
    if(connection){
        var sql= "DELETE FROM controlusuarios WHERE usuarioid=" + connection.escape(Id);
        connection.query(sql,function(error,result){
            if(error){
                throw error;
            }else{
                return callback(null,"Control de usuario eliminado");
            }
        })
    }
}



module.exports=UserControl;
