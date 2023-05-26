import express from "express";
import { ProductManager } from '../ProductManager.js';

export const routerProducts = express.Router();
routerProducts.use(express.json());
routerProducts.use(express.urlencoded({ extended: true }));
export const productManager = new ProductManager();

//Mostrar todos los productos
routerProducts.get('/', (req, res) => {
    const allProducts = productManager.getProducts();
    let limit = req.query.limit;

    if (!limit) {
        res.status(200).send({ Productos: allProducts });
    } else if (limit > 0 && limit <= allProducts.length) {
        let productsLimit = allProducts.slice(0, limit);
        res.status(200).send({ InformaciónSolicitada: productsLimit });
    } else if (limit > allProducts.length) {
        res.status(400).send({ "error": "El límite supera la cantidad de productos." });
    } else {
        res.status(400).send({ "error": "El límite debe ser un número." });
    }
    console.log('Mostrando información solicitada.');
});


//Buscar producto por ID
routerProducts.get('/:pId', (req, res) => {
    const pId = parseInt(req.params.pId);
    const product = productManager.getProductById(pId);
    if (!product) {
        console.log('Producto no encontrado, ingrese otro ID.');
        return res.send({ error: 'Producto no encontrado, ingrese otro ID.' })
    }
    console.log('Mostrando producto seleccionado por ID.');
    res.send({ product });
});
//AGREGAR PRODUCTO
routerProducts.post('/', (req, res) => {
    let newProduct = req.body;
    try {
        const addProduct = productManager.addProduct(newProduct);
        return res.send({ addProduct });
    } catch (error) {
        return res.send({ status: "error", data: error.message })
    }
});
//ACTUALIZAR PRODUCTO
routerProducts.put('/:pid', (req, res) => {
    let newProduct = req.body;
    try {
        const updateProduct = productManager.updateProduct(newProduct);
        return res.send({ updateProduct });
    } catch (error) {
        return res.send({ status: "error", data: error.message })
    }
});
//BORRAR PRODUCTO
routerProducts.delete('/:pid', (req, res) => {
    let product = req.body;
    try {
        const deleteProduct = productManager.deleteProduct(product);
        return res.send({ deleteProduct });
    } catch (error) {
        return res.send({ status: "error", data: error.message })
    }
});
