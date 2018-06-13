var mysql=require("mysql");

var configDB=require("../config/configdb");

/* Conectar con la DB */
connection=mysql.createConnection({
        host: configDB.dbreserved.host,
        user: configDB.dbreserved.user,
        password: configDB.dbreserved.password,
        database: configDB.dbreserved.database
});

var Employee={};

Employee.loginEmployee = function(nick,callback){
    if (connection){
        connection.query("SELECT * FROM empleados WHERE nick="+connection.escape(nick),function (error,row){
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

/* Modifica un empleado logueado */
Employee.updatepass=function(employeeData,callback) {
    if(connection){
        var sql="UPDATE empleados SET "

        if(employeeData.password!=""){
          sql+="password="+connection.escape(employeeData.password);
        }

        sql+="WHERE idEmpleado="+employeeData.id;

        connection.query(sql,function(error,result){
            if(error){
                throw error;
            }else{
                return callback(null,"Empleado actualizado");
            }
        })
    }
}


Employee.findEmployee = function(id,callback){
    if (connection){
      var sql = ("SELECT idEmpleado,nick,tipoempleado FROM empleados WHERE empleador="+connection.escape(id));


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

Employee.findEmployeeById=function(idempleado, callback){
    if (connection){

        var sql=("SELECT nick,tipoempleado FROM empleados WHERE idempleado="+connection.escape(idempleado));
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

Employee.insert=function(employeeData,callback){
    if(connection){
        connection.query("INSERT INTO empleados SET ?",employeeData,function(error,result){
            if (error){
                throw error;
            }else{
                return callback(null,result.insertid);
            }
        })
    }
}

Employee.update=function(employeeData,id,callback) {
  var coma=false;

    if(connection){
        var sql= "UPDATE empleados SET "

        if(employeeData.nick != undefined)
        {
          sql += " nick="+connection.escape(employeeData.nick);
          coma=true;
        }

        if(employeeData.password != undefined)
        {
          if(coma== true)
          {
            sql += ",";
            coma=false;
          }
          sql +=  "password="+connection.escape(employeeData.password);
          coma=true;
        }

        if(employeeData.tipoempleado != undefined)
        {
          if(coma== true)
          {
            sql += ",";
            coma=false;
          }
          sql +=  "tipoempleado="+connection.escape(employeeData.tipoempleado);
          coma=true;
        }

        if(employeeData.empleador != undefined)
        {
          if(coma== true)
          {
            sql += ",";
            coma=false;
          }
          sql += "empleador="+connection.escape(employeeData.empleador);
          coma=true;
        }

    sql +=  "WHERE idEmpleado="+connection.escape(id);

            connection.query(sql,function(error,result){
            if(error){
                throw error;
            }else{
                return callback(null,"Empleado actualizado");
            }
        })
    }
}

Employee.remove=function(id,callback){
    if(connection){
        var sql= "DELETE FROM empleados WHERE idEmpleado="+connection.escape(id);
        connection.query(sql,function(error,result){
            if(error){
                throw error;
            }else{
                return callback(null,"Empleado eliminado");
            }
        })
    }
}











module.exports=Employee;
