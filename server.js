const express = require('express')
const app = express()
const { Router } = require('express')
const ClaseProductos = require("./Productos");
const ClaseCarritos = require("./Carritos");

const routerProductos = Router()
const routerCarrito = Router()

app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)

routerProductos.use(express.json())
routerCarrito.use(express.json())

const productos = new ClaseProductos('Productos.json')
const carritos = new ClaseCarritos('Carritos.json')

//Middleware

function middlewareAdmin(req, res, next){
    if(req.body.admin===Boolean(true)){
        next()
    }else{
        res.send({ error : -1, descripcion: req.protocol + '://' + req.get('host') + req.originalUrl, método : req.method, status: 'no autorizada' }) 
    }       
}

//Rutas de los productos

routerProductos.get('/:id?', (req, res) =>{
    const { id } = req.params
    if(id==undefined){
        res.send(JSON.stringify(productos.getAll()))
    }else{
        res.send(JSON.stringify(productos.getById(parseInt(id))))
    }    
})

routerProductos.post('/', middlewareAdmin, (req, res) =>{
    res.send(JSON.stringify(productos.create(req.body)))
})

routerProductos.put('/:id', middlewareAdmin, (req, res) =>{
    const { id } = req.params
    res.send( productos.update(id, req.body))
})

routerProductos.delete('/:id', middlewareAdmin, (req, res) =>{
    const { id } = req.params
    res.send( productos.deleteById(id))
})

//Rutas del carrito

routerCarrito.get('/:id/productos', (req, res) => {
    const { id } = req.params
    res.send(carritos.getProductosCarrito(id))
})

routerCarrito.post('/', (req, res) => {
    res.send(carritos.create())
    
})

routerCarrito.post('/:id/productos', (req, res) => {
    const { id } = req.params
    res.send(carritos.addProductoCarrito(id, req.body))    
})

routerCarrito.delete('/:id', (req, res) =>{
    const { id } = req.params
    res.send( carritos.delete(id))
})

routerCarrito.delete('/:id/productos/:id_prod', (req, res) =>{
    const { id, id_prod } = req.params    
    res.send(carritos.deleteProducto(id, id_prod))
})

app.get('*', function(req, res){
    res.send({ error : -2, descripcion: req.protocol + '://' + req.get('host') + req.originalUrl, status: '404 | la ruta no existe'});
  });


const PORT = process.env.PORT || 8080
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))