const fs = require('fs')
let date = new Date()

module.exports = class Productos {
    constructor(archivo){
        this.archivo = archivo
        this.productos = JSON.parse(fs.readFileSync(this.archivo,'utf-8'))
    }

    create(object){
        let id
        if(this.productos.length>0){
            id = this.productos.at(-1).id + 1 
        }else{
            id = 1
        }   
        let timestamp = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear()
        const producto = { id: id, timestamp: timestamp, ...object}
        delete producto.admin
        this.productos.push(producto)
        fs.writeFileSync(this.archivo, JSON.stringify(this.productos))
        return(producto)
    }

    update(id, producto){
        const index = this.productos.findIndex( prod => prod.id === parseInt(id))
        if(index===-1){
            res.send({ error : 'producto no encontrado' })
        }else{
            this.productos[index].nombre = producto.nombre
            this.productos[index].descripcionn = producto.descripcionn
            this.productos[index].codigo = producto.codigo
            this.productos[index].fotoURL = producto.fotoURL
            this.productos[index].precio = producto.precio
            this.productos[index].stock = producto.stock
            fs.writeFileSync(this.archivo, JSON.stringify(this.productos))
            return('Se actualizo el producto con id: '+id)
        }  
    }

    getById(id){
        return this.productos.find( object => object.id === id)
    }

    getAll(){
        return this.productos
    }

    deleteById(id){
        const index = this.productos.findIndex( object => object.id === id)
        this.productos.splice(index, 1)
        fs.writeFileSync(this.archivo, JSON.stringify(this.productos))
        return('Se elimino el producto con id: '+id)
    }

    deleteAll(){
        this.productos = []
        fs.writeFileSync(this.archivo, JSON.stringify(this.productos))
    }

}