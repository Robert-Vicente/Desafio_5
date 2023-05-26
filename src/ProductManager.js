import fs from 'fs';


export class ProductManager {
    constructor() {
        this.path = "./productos.json";
        let contenido = fs.readFileSync(this.path, "utf-8");
        this.products = JSON.parse(`${contenido}`);
    }
    #escribirContenido() {
        let contenidoStringify = JSON.stringify(this.products);
        let actualizandoContenido = fs.writeFileSync(this.path, contenidoStringify);
        return actualizandoContenido;
    }
    getProducts() {
        let arrayProducts = this.products;
        if (arrayProducts.length === 0) {
            console.log('Todavía no se ingresaron productos. Array =', arrayProducts)
            return [];
        } else {
            return arrayProducts;
        }
    };
    getProductById(id) {
        let encontrado = this.products.find((prod) => prod.id === id);
        if (encontrado) {
            console.log(encontrado);
            return encontrado;
        } else {
            console.log('Not Found');
            return null;
        }
    }
    updateProduct(id, campo, nuevoValor) {
        let arrayProducts = this.products;
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
        let arrayProducts = this.products;
        let encontrado = arrayProducts.findIndex((prod) => prod.id == id);
        if (encontrado == -1) {
            console.log('Not Found');
            console.log('Producto no encontrado');
        } else {
            arrayProducts.splice(encontrado, '1');
            this.products = arrayProducts;
            this.#escribirContenido();
            console.log('Producto eliminado con exito');

        }
    }
    #generarId() {
        let maxId = 0;
        for (let i = 0; i < this.products.length; i++) {
            const prod = this.products[i];
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


    addProduct(
        title, description, code, price, stock, category, thumbnails
    ) {

        let productoNuevo = { title, description, code, price, status: true, stock, category, thumbnails, id: this.#generarId() };

        this.#verificarString("title", productoNuevo);
        this.#verificarString("description", productoNuevo);
        this.#verificarNumber("price", productoNuevo);
        // this.#verificarString("thumbnail", productoNuevo);
        this.#verificarString("code", productoNuevo);
        this.#verificarNumber("stock", productoNuevo);
        this.#verificarString("category", productoNuevo);
        const codeYaExiste = this.products.find((prod) => prod.code === code);
        if (codeYaExiste) {
            console.log('ERROR - código ya existe, escriba otro')
        }
        else {
            this.products = [...this.products, productoNuevo];
            console.log('Felicidades! Producto nuevo agregado.')
            this.#escribirContenido()
        }
    }
}