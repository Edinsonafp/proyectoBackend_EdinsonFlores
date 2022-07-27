const fs = require('fs')

module.exports = class Carrito {

    constructor(archivo){
        this.archivo = archivo
        this.carritos = JSON.parse(fs.readFileSync(this.archivo,'utf-8'))
    }

    create(){
        let id
        if(this.carritos.length>0){
            id = this.carritos.at(-1).id + 1 
        }else{
            id = 1
        }  
        const carrito = {id: id, productos: []}
        this.carritos.push(carrito)
        fs.writeFileSync(this.archivo, JSON.stringify(this.carritos))
        return carrito
    }

    delete(id){
        const index = this.carritos.findIndex( object => object.id === parseInt(id))
        if(index === -1){
            return("El carrito con id: "+id+" no existe")
        }else{
            this.carritos.splice(index, 1)
            fs.writeFileSync(this.archivo, JSON.stringify(this.carritos))
            return('Se elimino el producto con id: '+id)
        }        
    }

    getProductosCarrito(id){
        const carrito = this.carritos.find( object => object.id === parseInt(id))
        return carrito.productos
    }

    addProductoCarrito(id, productos){
        const index = this.carritos.findIndex( object => object.id === parseInt(id))
        this.carritos[index].productos = productos
        fs.writeFileSync(this.archivo, JSON.stringify(this.carritos))
        return('Se agregaron los productos al carrito: '+id)
    }

    deleteProducto(idCarrito, idProducto){
        const index = this.carritos.findIndex( object => object.id === parseInt(idCarrito))
        const indexProd = this.carritos[index].productos.findIndex( object => object.id === parseInt(idProducto))
        console.log(indexProd)
        if(indexProd===-1){
            return('El producto con id: '+idProducto+' no existe en el carrito: '+idCarrito)
        }else{
            this.carritos[index].productos.splice(indexProd, 1)
            fs.writeFileSync(this.archivo, JSON.stringify(this.carritos))
            return('Se elimino el producto con id: '+idProducto+' del carrito: '+idCarrito)
        }        
    }
}