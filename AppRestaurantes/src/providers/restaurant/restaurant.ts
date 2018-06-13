import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';


@Injectable()
export class RestaurantProvider {

  login_correcto=false;
  logueado=false;

  //info del login
  session:any;

  //datos del restaurante logueado
  inforestaurant:any;

  //empleados del restaurante logueado
  empleadosrestaurante:any;

  agregar_correcto=false;

  //carta del restaurante logueado
  cartarestaurante:any;

  anyadir_producto=false;

  modificar_producto=false;

  //idproducto que queremos modificar
  productoactual:any;

  //informacion producto a modificar
  infoproductoactual:any;

  alergenosproductoactual={gluten:false,crustaceos:false,huevos:false,pescado:false,cacahuetes:false,soja:false,lacteos:false,frutos_cascara:false,apio:false,mostaza:false,sesamo:false,dioxido_azufre:false,moluscos:false,altramuces:false};

  //comentarios hechos hacia mi restaurante
  comentariosrestaurante:any;

  //boolean para comprobar si se ha denunciado o ya estaba denunciado (el comentario)
  denunciada=false;

  //info del aforo un dia en concreto
  aforo:any;

  //info de las reservas un dia en un turno concreto
  reservas:any

  //Info de los pedidos en curso del empleado logueado
  pedidosencurso:any

  //Info con los productos del pedido que estamos viendo
  productosdepedido:any

  //Info donde estan todas las categorias de un restaurante
  categoriasrestaurante:any

  //Id del pedido actual
  idpedidoactual:any

  //Productos que un CAMARERO tiene que llevar a mesa
  productospendientes:any;

  //Productos que un COCINERO tiene que hacer
  productosapreparar

  //Reservas del dia actual
  reservastoday:any;

  todoscomentarios:any;

  infocomida:any;

  infocena:any;

  allcategorias:any;

  productoscategoria:any;

  urlfotopreview:any;

  latlng:any;

  constructor(public http: HttpClient, private alertCtrl: AlertController, public storage:Storage, private transfer: FileTransfer) {
    
  }

  add_restaurant(data){
    let url="api/addrestaurant";

    return this.http.post(url, data, {responseType: 'json'} )
      .map(resp=>{
        //si entra, significa que el email ya esta siendo utilizado por otro usuario.
        if(resp==='Email no disponible'){
          this.alertCtrl.create({
            title:"Error",
            subTitle:"Email ya en uso",
            buttons:["OK"]
          }).present();
        }else{
          this.logueado=true;
          this.login_correcto=true;
          //guardamos la informacion del usuario
          this.session=resp;
          //Guardar en el storage
          this.storage.set('idRestaurante', this.session.idRestaurante);
          this.storage.set('token', this.session.token);
        };

      })
  }

  login_restaurant(data){
    let url="api/loginrestaurant";

    return this.http.post(url,data,{responseType:'json'})
      .map(resp=>{
        //si entra, significa que el nick no existe.
        if(resp==='Login incorrecto'){
          this.alertCtrl.create({
            title:"Error",
            subTitle:"Email y/o contraseña incorrectos",
            buttons:["OK"]
          }).present();
        }else if(resp==='Login incorrecto'){
          this.alertCtrl.create({
            title:"Error",
            subTitle:"Email y/o contraseña incorrectos",
            buttons:["OK"]
          }).present();
        }else{
          this.logueado=true;
          this.login_correcto=true;
          //guardamos la informacion del usuario
          this.session=resp;
          //Guardar en el storage
          this.storage.set('idRestaurante', this.session.idRestaurante);
          this.storage.set('token', this.session.token);

          this.restaurant_profile(this.session.idRestaurante,this.session.token);


        }
      })
  }

  login_empleado(data){
    let url="api/loginempleado";

    return this.http.post(url,data,{responseType:'json'})
    .map(resp=>{
      
      if(resp==='Login incorrecto'){
        this.alertCtrl.create({
          title:"Error",
          subTitle:"Usuario y/o contraseña incorrectos",
          buttons:["OK"]
        }).present();
      }else if(resp==='Login incorrecto'){
        this.alertCtrl.create({
          title:"Error",
          subTitle:"Usuario y/o contraseña incorrectos",
          buttons:["OK"]
        }).present();
      }else{
        this.logueado=true;
        this.login_correcto=true;
        //guardamos la informacion del usuario
        this.session=resp;
        //Guardar en el storage
        this.storage.set('idEmpleado', this.session.idRestaurante);
        this.storage.set('token', this.session.token);
      }
    })
  }

  modify_restaurant(data){
    let url="api/restaurants/";
    return this.http.put(url+this.session.idRestaurante, data, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .map(resp=>{
          this.restaurant_profile(this.session.idRestaurante,this.session.token)

      })
  }

  modify_employee(data){
    let url="api/restaurants/employee/";
    return this.http.put(url+this.session.idEmpleado, data, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .map(resp=>{

      })
  }


  restaurant_profile(id,token){
    let url="api/restaurants/";
    this.http.get(url+id,{headers: {'token-acceso':token}}).subscribe(data=>{
      this.inforestaurant=data;
    });

  }

  mis_empleados(){
    let url="api/restaurants/";

    this.storage.get('idRestaurante').then((val) => {
      this.storage.get('token').then((val2) => {
        this.http.get(url+val+"/employee",{headers: {'token-acceso':val2}}).subscribe(data=>{
          this.empleadosrestaurante=data;
        });
      });
    });

  }

  eliminar_empleado(id){
    let url="api/restaurants/";

    this.http.delete(url+this.session.idRestaurante+"/employee/"+id,{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
      this.mis_empleados();
    });

  }

  add_empleado(data){
    let url="api/restaurants/";

    return this.http.post(url+this.session.idRestaurante+"/employee", data, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .map(resp=>{
          this.mis_empleados();
          this.agregar_correcto=true;

      })
  }

  mi_carta(){
    let url="api/restaurants/";

    this.http.get(url+this.session.idRestaurante+"/products",{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
      this.cartarestaurante=data;
    });
  }

  eliminar_producto(id){
    let url="api/restaurants/";

    this.http.delete(url+this.session.idRestaurante+"/products/"+id,{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
      this.mi_carta();
    });
  }

  add_category(data){
    let url="api/restaurants/";
    return this.http.post(url+this.session.idRestaurante+"/products/category", data, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .map(resp=>{

      },err=>{
        console.log(err);
      })
  }

  see_category(){
    let url="api/restaurants/";

    this.http.get(url+this.session.idRestaurante+"/category",{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
      this.categoriasrestaurante=data;
    });
  }

  add_producto(data){
    let url="api/restaurants/";

    return this.http.post(url+this.session.idRestaurante+"/products", data, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .map(resp=>{
          this.mi_carta();
          this.anyadir_producto=true;

      })
  }

  modify_producto(data){
    let url="api/restaurants/";

    return this.http.put(url+this.session.idRestaurante+"/products/"+ this.productoactual, data, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .map(resp=>{
          this.mi_carta();
          this.modificar_producto=true;

      })

  }

  producto_id(id){
    let url="api/restaurants/allproducts/";

    this.http.get(url+id,{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
      this.infoproductoactual=data;
      this.comprobar_alergenos();
    });

  }

  mis_comentarios(){
    let url="api/restaurants/";
      this.http.get(url+this.session.idRestaurante+"/comments",{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
        this.comentariosrestaurante=data;
      });
  }

  find_comment(data){
    let url="api/restaurants/";
      this.http.get(url+this.session.idRestaurante+"/findcomment/"+data,{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
        this.comentariosrestaurante=data;
      });
  }
  
  denunciar_comentario(data){
    let url="api/restaurants/denunciation";
    return this.http.post(url, data, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .map(resp=>{
        if(resp==='Denuncia ya realizada'){
          this.alertCtrl.create({
            title:"Error",
            subTitle:"Denuncia ya realizada",
            buttons:["OK"]
          }).present();
        }else{
          this.denunciada=true;
        }

      })
  }

  cambiar_estado_denunciado(comentario){
    let url="api/restaurants/";
      this.http.get(url+this.session.idRestaurante+"/comment/"+comentario+"/denunciado",{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
        
      });
  }

  see_reservas(data){
    let url="api/restaurants/";

    return this.http.post(url+this.session.idRestaurante+"/capacity", data, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .map(resp=>{
          this.aforo=resp;
      })
  }

  mostrar_reservas(dia,turno){

    let fecha=dia.split('-');
    let anyo=fecha[0];
    let mes=fecha[1];
    let fecha2=fecha[2].split('T');
    let aux=parseInt(fecha2[0]);
    let day=aux+1;
    let finishdate=anyo+"-"+mes+"-"+day;

    let url="api/restaurants/";
      this.http.get(url+this.session.idRestaurante+"/"+finishdate+"/"+turno+"/reservations",{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
        this.reservas=data;
      });
  }

  //variable auxiliar para guardar el id del pedido
  aux:any;

  add_pedido(data){
    let url="api/restaurants/orders";

    return this.http.post(url, data, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .map(resp=>{
          this.aux=resp;
          this.ver_pin(this.aux.idPedido);
          this.info_pedido(this.aux.idPedido);
      })
  }

  //metodo para crear la reserva antes que el pedido si no se le asigna una reserva existente
  idreservaaux:any;

  add_reserva_pedido(data){
    let url="api/restaurants/reservationorder";

    return this.http.post(url, data, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .map(resp=>{
          this.idreservaaux=resp;
      })

  }

  delete_pin(id){
    let url="api/restaurants/";
      this.http.get(url+id+"/deletepin",{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
        
      });
  }

  pedidos_en_curso(){
    let url="api/restaurants/currentorders/";
      this.http.get(url+this.session.idEmpleado,{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
        this.pedidosencurso=data;
      });
  }

  cerrar_pedido(id){
    let url="api/restaurants/currentorders/finish/";
    this.http.get(url+id,{headers: {'token-acceso':this.session.token}}).subscribe(data=>{

    });
  }

  info_pedido(id){
    let url="api/restaurants/orders/";
    this.http.get(url+id+"/orderproducts",{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
      this.productosdepedido=data;
      this.productosdepedido.sort(function(a, b) {
        return parseFloat(b.idProductoDePedido) - parseFloat(a.idProductoDePedido);
      });
      var i=0;
      for(i=0;i<this.productosdepedido.length;i++){
        this.productosdepedido[i].cantidad=1;
      }
      this.agrupar_productos();
      this.idpedidoactual=id;

    });
  }

  productosagrupados=[];

  agrupar_productos(){
    this.productosagrupados=[];
    var i=0;
    var j=0;
    var para=false;
    for(i=0;i<this.productosdepedido.length;i++){
      if(this.productosagrupados.length!=0){
        for(j=0;j<this.productosagrupados.length;j++){
          if(para==false){
            if(this.productosdepedido[i].IdProducto==this.productosagrupados[j].IdProducto){
              this.productosagrupados[j].cantidad=this.productosagrupados[j].cantidad+1;
              para=true;
            }
          }
        }
        if(para==false){
          this.productosagrupados.push(this.productosdepedido[i]);
          para=true;
        }
      }else{
        this.productosagrupados.push(this.productosdepedido[i]);
      }
      para=false;
    }
  }

  see_productosaentregar(){
    let url="api/restaurants/currentorders/";
    this.http.get(url+this.session.idEmpleado+"/pendientes",{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
      this.productospendientes=data;
      var i=0;
      for(i=0;i<this.productospendientes.length;i++){
        this.productospendientes[i].cantidad=1;
      }
      this.agrupar_productos_pendientes();
    });
  }

  productospendientesagrupados=[];

  agrupar_productos_pendientes(){
    this.productospendientesagrupados=[];
    var i=0;
    var j=0;
    var para=false;
    for(i=0;i<this.productospendientes.length;i++){
      if(this.productospendientesagrupados.length!=0){
        for(j=0;j<this.productospendientesagrupados.length;j++){
          if(para==false && this.productospendientes[i].mesa==this.productospendientesagrupados[j].mesa && this.productospendientes[i].productoP==this.productospendientesagrupados[j].productoP){
            if(this.productospendientes[i].IdProducto==this.productospendientesagrupados[j].IdProducto){
              this.productospendientesagrupados[j].cantidad=this.productospendientesagrupados[j].cantidad+1;
              this.productospendientesagrupados[j].idProductoDePedido=this.productospendientesagrupados[j].idProductoDePedido+"_"+this.productospendientes[i].idProductoDePedido;
              para=true;
            }
          }
        }
        if(para==false){
          this.productospendientesagrupados.push(this.productospendientes[i]);
          para=true;
        }
      }else{
        this.productospendientesagrupados.push(this.productospendientes[i]);
      }
      para=false;
    }
  }

  //pin de la reserva del pedido que estamos viendo
  pin:any;

  ver_pin(id){
    let url="api/restaurants/";
    this.http.get(url+id+"/pin",{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
      this.pin=data;
      if(this.pin!=null){
        this.pin=this.pin[0].pin;
      }
    });
  }

  anyadir_precio_productodepedido(idpedido,idproducto){
    let url="api/restaurants/currentorders/";
    this.http.get(url+idpedido+"/deleteproduct/"+idproducto,{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
      //Precio cambiado
    }); 
  }

  eliminar_productodepedido(id,idproducto){
    let url="api/restaurants/orders/";

    this.http.delete(url+this.productosdepedido[0].PedidoP+"/orderproducts/"+id,{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
      this.anyadir_precio_productodepedido(this.productosdepedido[0].PedidoP, idproducto);
      this.info_pedido(this.productosdepedido[0].PedidoP);
    });
  }

  anyadir_producto_pedido(data){
    let url="api/restaurants/orders/";
    return this.http.post(url+this.idpedidoactual+"/orderproducts", data, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .map(resp=>{
        
      })
  }

  sumar_precio(idproducto){
    let url="api/restaurants/currentorders/";
    this.http.get(url+this.idpedidoactual+"/addproduct/"+idproducto,{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
      //Precio cambiado
    }); 
  }

  //utilizar esta para borrar producto a producto
  producto_entregado(data){
    let url="api/restaurants/orders/";

    this.http.get(url+data+"/orderproducts/servido", {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .subscribe(resp=>{
          this.see_productosaentregar();
      })
  }

  producto_entregado_todo(data){
    let url="api/restaurants/orders/";

    this.http.get(url+data+"/orderproducts/servido", {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .subscribe(resp=>{
          this.see_productosaentregar();
      })
  }

  see_productoscocinar(){
    let url="api/restaurants/currentorders/";
    this.http.get(url+this.session.idRestaurante+"/apreparar",{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
      this.productosapreparar=data;
    });
  }

  producto_preparado(data){
    let url="api/restaurants/orders/";

    this.http.get(url+data+"/orderproducts/preparado", {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .subscribe(resp=>{
          this.see_productoscocinar();
      })
  }

  producto_preparando(data){
    let url="api/restaurants/orders/";

    this.http.get(url+data+"/orderproducts/preparando", {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .subscribe(resp=>{
          this.see_productoscocinar();
      })
  }

  reservas_today(){
    let url="api/restaurants/";

    this.http.get(url+this.session.idRestaurante+"/reservationstoday", {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .subscribe(data=>{
          this.reservastoday=data;
      })
  }

  borrar_pin(){
    let url="api/restaurants/deletepin/";

    this.http.get(url+this.pin, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .subscribe(data=>{
          this.pin=null;
      })
  }

  see_info(dia){
    this.see_info_comida(dia);
    this.see_info_cena(dia);
  }

  see_info_comida(dia){
    let url="api/restaurants/";

    this.http.get(url+this.session.idRestaurante+"/informationlunch/"+dia, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .subscribe(data=>{
          this.infocomida=data;
      })
  }

  see_info_cena(dia){
    let url="api/restaurants/";

    this.http.get(url+this.session.idRestaurante+"/informationdinner/"+dia, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .subscribe(data=>{
          this.infocena=data;
      })
  }

  categorias_restaurante(){
    let url="api/restaurants/";
    this.storage.get('token').then((val) => {
      this.http.get(url+this.session.idRestaurante+"/category",{headers: {'token-acceso':val}}).subscribe(data=>{
        this.allcategorias=data;
      });
    });
  }
  

  productos_porcategoria(id){
    let url = "api/restaurants/";
    this.http.get(url+this.session.idRestaurante+"/products/"+"category/"+id,{headers:{'token-acceso':this.session.token}})
    .subscribe(data=>{
      this.productoscategoria =data;
    })
  }

  upload_image(data){
    let url = "api/"+this.session.idRestaurante+"/uploadprincipal";
    var targetPath = data;
 
    var options: FileUploadOptions = {
      fileKey: 'imagensubir',
      chunkedMode: false,
      mimeType: 'image/jpeg',
    };
 
    const fileTransfer: FileTransferObject = this.transfer.create();
 
    return fileTransfer.upload(targetPath, url, options);
  }

  numfoto:any;

  upload_imagesec(data){
    let url = "api/"+this.session.idRestaurante+"/uploadsecundaria"+this.numfoto;
    var targetPath = data;
 
    var options: FileUploadOptions = {
      fileKey: 'imagensubir',
      chunkedMode: false,
      mimeType: 'image/jpeg',
    };
 
    const fileTransfer: FileTransferObject = this.transfer.create();
 
    return fileTransfer.upload(targetPath, url, options);
  }

  upload_imageproducto(data,nombreproducto){
    let url = "api/"+this.session.idRestaurante+"/"+nombreproducto+"/uploadproducto";
    var targetPath = data;
 
    var options: FileUploadOptions = {
      fileKey: 'imagensubir',
      chunkedMode: false,
      mimeType: 'image/jpeg',
    };
 
    const fileTransfer: FileTransferObject = this.transfer.create();
 
    return fileTransfer.upload(targetPath, url, options);
  }

  comprobar_alergenos(){
    if(this.infoproductoactual[0].gluten==0){
      this.alergenosproductoactual.gluten=false;
    }else{
      this.alergenosproductoactual.gluten=true;
    }

    if(this.infoproductoactual[0].crustaceos==0){
      this.alergenosproductoactual.crustaceos=false;
    }else{
      this.alergenosproductoactual.crustaceos=true;
    }

    if(this.infoproductoactual[0].huevos==0){
      this.alergenosproductoactual.huevos=false;
    }else{
      this.alergenosproductoactual.huevos=true;
    }

    if(this.infoproductoactual[0].pescado==0){
      this.alergenosproductoactual.pescado=false;
    }else{
      this.alergenosproductoactual.pescado=true;
    }

    if(this.infoproductoactual[0].cacahuetes==0){
      this.alergenosproductoactual.cacahuetes=false;
    }else{
      this.alergenosproductoactual.cacahuetes=true;
    }

    if(this.infoproductoactual[0].soja==0){
      this.alergenosproductoactual.soja=false;
    }else{
      this.alergenosproductoactual.soja=true;
    }

    if(this.infoproductoactual[0].lacteos==0){
      this.alergenosproductoactual.lacteos=false;
    }else{
      this.alergenosproductoactual.lacteos=true;
    }

    if(this.infoproductoactual[0].frutos_cascara==0){
      this.alergenosproductoactual.frutos_cascara=false;
    }else{
      this.alergenosproductoactual.frutos_cascara=true;
    }

    if(this.infoproductoactual[0].apio==0){
      this.alergenosproductoactual.apio=false;
    }else{
      this.alergenosproductoactual.apio=true;
    }

    if(this.infoproductoactual[0].mostaza==0){
      this.alergenosproductoactual.mostaza=false;
    }else{
      this.alergenosproductoactual.mostaza=true;
    }

    if(this.infoproductoactual[0].sesamo==0){
      this.alergenosproductoactual.sesamo=false;
    }else{
      this.alergenosproductoactual.sesamo=true;
    }

    if(this.infoproductoactual[0].dioxido_azufre==0){
      this.alergenosproductoactual.dioxido_azufre=false;
    }else{
      this.alergenosproductoactual.dioxido_azufre=true;
    }

    if(this.infoproductoactual[0].altramuces==0){
      this.alergenosproductoactual.altramuces=false;
    }else{
      this.alergenosproductoactual.altramuces=true;
    }

    if(this.infoproductoactual[0].moluscos==0){
      this.alergenosproductoactual.moluscos=false;
    }else{
      this.alergenosproductoactual.moluscos=true;
    }
  }
}
