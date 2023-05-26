import express from "express";
import { CartManager } from '../CartManager.js';

export const routerCarts = express.Router();
routerCarts.use(express.json());
routerCarts.use(express.urlencoded({ extended: true }));
const cartManager = new CartManager();

//AGREGAR NUEVO CARRITO
routerCarts.post('/', (req, res) => {
    let newCarrito = req.body;
    try {
        const addCarrito = cartManager.addCarrito(newCarrito);
        return res.send({ addCarrito });
    } catch (error) {
        return res.send({ status: "error", data: error.message })
    }
});

routerCarts.get('/:cId', (req, res) => {
    try {
        const cId = parseInt(req.params.cId);
        const cart = cartManager.getCartById(cId);
        console.log('Mostrando Carrito seleccionado por ID.');
        res.send({ cart });
    } catch (error) {
        console.log('Carrito no encontrado, ingrese otro ID.');
        return res.send({ error: 'Carrito no encontrado, ingrese otro ID.' })
    }
});

routerCarts.post('/:cId/product/:pId', (req, res) => {
    try {
        const cId = parseInt(req.params.cId);
        const pId = parseInt(req.params.pId);
        const addProductInCart = cartManager.addProduct(cId, pId);
        console.log('Productos agregados a Carrito.');
        res.send({ addProductInCart });
    } catch (error) {
        return res.send({ error: error.message })
    }
})