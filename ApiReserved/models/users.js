var mysql=require("mysql");

var configDB=require("../config/configdb");

/* Conectar con la DB */
connection=mysql.createConnection({
        host: 'no',
        user: configDB.dbreserved.user,
        password: 'pene',
        database: configDB.dbreserved.database
});

var User={};

/*Sacar el usuario de RRSS por su id*/
User.takeIdrrss=function(id,callback){
    if (connection){
        connection.query("SELECT * FROM usuarios WHERE idrrss="+connection.escape(id),function (error,row){
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
/*Busca al Usuario de LOCAL por el nick*/
User.takeIdlocal=function(nick,callback){
    if (connection){
        connection.query("SELECT * FROM usuarios WHERE nick="+connection.escape(nick),function (error,row){
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

/*Busca al Usuario de LOCAL por el nick*/
User.findOneLocal=function(nick,callback){
    if (connection){
        connection.query("SELECT * FROM usuarios WHERE nick="+connection.escape(nick),function (error,row){
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

/* Crear un usuario LOCAL */
User.insertLocal=function(userData,callback){
    if(connection){
        connection.query("INSERT INTO usuarios SET ?",userData,function(error,result){
            if (error){
                throw error;
            }else{
                return callback(null,result.insertId);
            }
        })
    }
}

/*Buscar un usuario por su ID*/
User.findById=function(id,callback){
    if (connection){
        connection.query("SELECT idUsuario,nombre,nick,email,idRRSS,tokenRRSS FROM usuarios WHERE idUsuario="+connection.escape(id),function (error,row){
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

/*Login del Usuario de RRSS*/
User.findOne=function(idgoogle,callback){
    if (connection){
        connection.query("SELECT * FROM usuarios WHERE idrrss="+connection.escape(idgoogle),function (error,row){
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

/* Crear un usuario con RRSS */
User.insertGoogle=function(userData,callback){
    if(connection){
        connection.query("INSERT INTO usuarios SET ?",userData,function(error,result){
            if (error){
                throw error;
            }else{
                return callback(null,result.insertid);
            }
        })
    }
}
/* Modifica un usuario logueado */
User.update=function(userData,callback) {
    if(connection){
        var sql="UPDATE usuarios SET "

        if(userData.password!=""){
          sql+="password="+connection.escape(userData.password);
        }

        if(userData.password!="" && userData.email!=""){
          sql+=",";
        }

        if(userData.email!=""){
          sql+="email="+connection.escape(userData.email);
        }

        sql+="WHERE idUsuario="+userData.id;

        connection.query(sql,function(error,result){
            if(error){
                throw error;
            }else{
                return callback(null,"Usuario actualizado");
            }
        })
    }
}

/* Eliminar un Usuario Logueado*/
User.remove=function(Id,callback){
    if(connection){
        var sql= "DELETE FROM usuarios WHERE idUsuario=" + connection.escape(Id);
        connection.query(sql,function(error,result){
            if(error){
                throw error;
            }else{
                return callback(null,"Usuario eliminado");
            }
        })
    }
}



/************************************************************************************/

/* Mostar todos los usuarios */
User.all= function(page,callback){
    var aux=parseInt(page);
    aux=aux*5;
    if (connection){
        connection.query("SELECT * FROM usuarios limit "+aux+",5",function (error,rows){
            if (error){
                throw error;
            }else{
                return callback(null,rows);
            }
        })
    }
}

/*Mostrar un usuario por nick */
User.findlikenick= function(nick,callback){
    var nombre=nick;
    if (connection){
        connection.query("SELECT * FROM usuarios where nick like '%"+nombre+"%'",function (error,rows){
            if (error){
                throw error;
            }else{
                return callback(null,rows);
            }
        })
    }
}


/* Crear un usuario */
User.insert=function(userData,callback){
    if(connection){
        connection.query("INSERT INTO usuarios SET ?",userData,function(error,result){
            if (error){
                throw error;
            }else{
                return callback(null,result.insertid);
            }
        })
    }
}

/* Mostar un usuario buscado por su Id */
User.findOneById=function(id, callback){
    if (connection){
        var sql=("SELECT nombre, nick, email FROM usuarios WHERE idUsuario="+connection.escape(id));
        connection.query(sql,function(error,row){
            if (error){
                throw error;
            }else{
                return callback(null,row);
            }
        })
    }
}

module.exports=User;
