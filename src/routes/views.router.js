import express from "express";
import { ProductManager } from '../ProductManager.js';
export const routerViews = express.Router();
const productManager = new ProductManager();


//Renderizamos con la plantilla Handlebars
routerViews.get('/', (req, res) => {
    const allProducts = productManager.getProducts();
    res.render('home', {
        allProducts,
        style: 'home.css',
    });
})

//SOLICITAMOS LOS PRODUCTOS EN TIEMPO REAL
routerViews.get('/realtimeproducts', (req, res) => {
    const allProducts = productManager.getProducts();
    res.render('realTimeProducts', {
        allProducts,
        style: 'home.css',
    });
});


// routerViews.post('/realtimeproducts', (req, res) => {
//     const allProducts = productManager.getProducts();
//     res.render('realTimeProducts', {
//         allProducts,
//         style: 'home.css',
//     });
// })

//OBJETO DE PRUEBA
// let testUser = {
//     nombre: "Axel",
//     last_name: "Cordoba",
//     role: "admin"
// }
// let food = [
//     { name: "Hamburguesa", price: "150" },
//     { name: "Ensalada", price: "120" },
//     { name: "Pizza", price: "200" }
// ]