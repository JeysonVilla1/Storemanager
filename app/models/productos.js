var db = require('../../config/database');

module.exports = {

	diezProductos:function(rel){
                db.query('select * from productos LIMIT 10',function(err,result,field){
                        return rel(result);
                });
        },
        
        buscarProducto:function(dato,callback){
        
                db.query(`select * from productos where nombre like '%${dato}%'`,function(err,result,field){
                        return callback(result);
                });
        },

        guardarCotizacion:function(idproducto,cantidad,precio){

                db.query(`select precio_de_compra,precio_de_venta from productos where idproducto = ${idproducto}`,function(err,result,field){
                        var precio_de_compra = result[0]["precio_de_compra"];
                        var precio_de_venta = result[0]["precio_de_venta"];
                        var ganancias = (Number(precio_de_venta) - Number(precio_de_compra)) * Number(cantidad);
                        db.query(`INSERT INTO ventas(idproducto, cantidad, ventas_total, ganancias) VALUES ('${idproducto}','${cantidad}','${precio}','${ganancias}')`);
                        db.query(`INSERT INTO ventas_totales(idproducto, cantidad, ventas_total, ganancias,fecha) VALUES ('${idproducto}','${cantidad}','${precio}','${ganancias}',CURRENT_TIMESTAMP)`);
                });
        },

        agregarProducto:function(datos){
                db.query(`INSERT INTO productos(nombre, precio_de_compra, precio_de_venta, cantidad) VALUES ('${datos[0].nombre}','${datos[0].PrecioCompra}','${datos[0].PrecioVenta}','${datos[0].Cantidad}')`,function(err,result,field){});
        }

};

