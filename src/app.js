import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import { routerCarts } from "./routes/carts.router.js";
import { productManager, routerProducts } from "./routes/products.router.js";
import { routerViews } from "./routes/views.router.js";
import __dirname from './utils.js';
const app = express();

const port = 8080;
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products/', routerProducts);
app.use('/api/carts/', routerCarts);
//VIEWS ROUTER
app.use('/', routerViews);


app.get("*", (req, res) => {
    res.status(404).send({ status: "error", data: "Page not found" });
});

const httpServer = app.listen(port, () => {
    console.log(`App funcionando en puerto ${port}.`);
});
//CONECTAMOS SOCKET AL SERVER
const socketServer = new Server(httpServer);
//USAMOS LA FUNCION PARA LLAMAR A LOS PRODUCTOS DESDE LA RUTA PRODUCTS
const allProducts = productManager.getProducts();
socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado.")
    // ENVIAMOS LOS PRODUCTOS EXISTENTES
    socket.emit('products',allProducts);
    console.log("Mostrando los productos en tiempo real.")
})


//FORMAS DE ENVIAR INFO DESDE EL SERVER AL CLIENTE
    // socket.emit('evento_socket_individual','Este msj sólo lo debe recibir el socket');

    // socket.broadcast.emit('evento_para_todos_menos_socket_actual','Este evento lo veran todos menos el socket actual');

    // socketServer.emit('evento_para_todos','Este msj lo reciben todos');