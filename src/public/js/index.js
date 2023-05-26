const socket = io();
//RECIBIMOS LOS PRODUCTOS EXISTENTES Y ACTUALIZAMOS LA VISTA CADA VEZ QUE SE ACTUALIZA UN PRODUCTO
socket.on('products', products => {
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.innerHTML = `<h1>${product.title}</h1><h3>${product.price}</h3>`;
        productsContainer.appendChild(productElement);
    });    
});


// socket.on('evento_socket_individual',data=>{
//     console.log(data);
// })
// socket.on('evento_para_todos_menos_socket_actual',data=>{
//     console.log(data);
// })
// socket.on('evento_para_todos',data=>{
//     console.log(data);
// })