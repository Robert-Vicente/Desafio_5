import fs from 'fs';
import { ProductManager } from "./ProductManager.js";
const productManager = new ProductManager();

export class CartManager {
    constructor() {
        this.path = "./carrito.json";
        this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    }
    #escribirContenido() {
        let actualizandoContenido = fs.writeFileSync(this.path, JSON.stringify(this.carts));
        return actualizandoContenido;
    }
    getProducts() {
        let arrayProducts = this.carts;
        if (arrayProducts.length === 0) {
            console.log('Todavía no se ingresaron productos. Array =', arrayProducts)
            return [];
        } else {
            console.log(arrayProducts);
            return arrayProducts;
        }
    };
    getCartById(id) {
        let encontrado = this.carts.find((c) => c.id === id);
        if (encontrado) {
            console.log(encontrado);
            return encontrado;
        } else {
            console.log('Not Found');
            return null;
        }
    }
    updateProduct(id, campo, nuevoValor) {
        let arrayProducts = this.carts;
        this.campo = campo
        let encontrado = arrayProducts.find((prod) => prod.id === id);
        if (encontrado) {
            encontrado[campo] = nuevoValor
            this.#escribirContenido();
            return console.log('Campo actualizado del producto', encontrado);
        } else {
            console.log('Not Found');
            return console.log('Producto no encontrado');
        }
    }
    deleteProduct(id) {
        let arrayProducts = this.carts;
        let encontrado = arrayProducts.findIndex((prod) => prod.id == id);
        if (encontrado == -1) {
            console.log('Not Found');
            console.log('Producto no encontrado');
        } else {
            arrayProducts.splice(encontrado, '1');
            this.carts = arrayProducts;
            this.#escribirContenido();
            console.log('Producto eliminado con exito');

        }
    }
    #generarId() {
        let maxId = 0;
        for (let i = 0; i < this.carts.length; i++) {
            const prod = this.carts[i];
            if (prod.id > maxId) {
                maxId = prod.id;
            }
        }
        return ++maxId;
    }

    #verificarString(valor, product) {
        if (!product[valor]) {
            throw new Error(`Error: Agregar ${valor}`);
        } else if (
            product[valor] === "" ||
            product[valor] === undefined ||
            product[valor] === null ||
            typeof product[valor] !== "string"
        ) {
            throw new Error(`Error: ${valor} es invalido.`);
        } else {
            return true;
        }
    }

    #verificarNumber(valor, product) {
        if (product[valor] === undefined) {
            throw new Error(`Error: Agregar ${valor}`);
        } else if (
            product[valor] === NaN ||
            product[valor] === null ||
            product[valor] < 0 ||
            typeof product[valor] === "string"
        ) {
            throw new Error(`Error: ${valor} es invalido.`);
        } else {
            return true;
        }
    }


    addCarrito() {
        let newCart = {products: [], id: this.#generarId() };
            this.carts = [...this.carts, newCart];
            console.log('Felicidades! Carrito nuevo agregado.')
            this.#escribirContenido()
        
    }
    addProduct(cId, pId) {
        let buscandoCarritoId = this.carts.find((c)=> c.id === cId);
        if (!buscandoCarritoId) {
            return new Error("Carrito no existe, ingrese otro ID")
        }
        let buscandoProductoId = productManager.products.find((p)=> p.id === pId);
        if (!buscandoProductoId) {
            return new Error("Producto no existe, ingrese otro ID")
        }
        let productoEnCarrito = buscandoCarritoId.products.find((p)=> p.id === pId);
        if (!productoEnCarrito) {
            let newProductoEnCarrito = {id:pId,quantity:1}
            buscandoCarritoId.products.push(newProductoEnCarrito);
            this.#escribirContenido()
            return newProductoEnCarrito;
        }else{
            productoEnCarrito.quantity++;
            this.#escribirContenido()
            return productoEnCarrito;
        }
    }
}
