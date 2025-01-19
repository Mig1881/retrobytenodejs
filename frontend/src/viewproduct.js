import axios from 'axios';
import { notifyError, notifyOk } from './dialogUtil.js';
import { el, td } from './documentUtil.js';

// window.viewProduct = function() {
//     const queryParams = new URLSearchParams(window.location.search);
//     const productId = queryParams.get('id_product');
//     axios.get('http://localhost:8081/products/' + productId)
//         .then((response) => {
//             const product = response.data;
//             const productTable = el('tableBodyView');
    
//             const row = document.createElement('tr');
//             row.innerHTML = '<td>Product Name: </td>' +
//                             td(product.product_name);
//             productTable.appendChild(row);
//             const row1 = document.createElement('tr');
//             row1.innerHTML = '<td>Descripcion: </td>' +
//                             td(product.description);
//             productTable.appendChild(row1);
//             const row2 = document.createElement('tr');
//             row2.innerHTML = '<td>Release date: </td>' +
//                             td(product.release_date);
//             productTable.appendChild(row2);
//             const row3 = document.createElement('tr');
//             row3.innerHTML = '<td>Product Status: </td>' +
//                             td(product.product_status);
//             productTable.appendChild(row3);
//             const row4 = document.createElement('tr');
//             row4.innerHTML = '<td>Price: </td>' +
//                             td(product.sale_price);
//             productTable.appendChild(row4);
//             const row5 = document.createElement('tr');
//             row5.innerHTML = '<td>Stock Units: </td>' +
//                             td(product.stock_units);
//             productTable.appendChild(row5);
//         });

    
// };

window.viewProduct = function() {
    const queryParams = new URLSearchParams(window.location.search);
    const productId = queryParams.get('id_product');
    axios.get('http://localhost:8081/products/' + productId)
        .then((response) => {
            const product = response.data;
            //Contruimos primero la linea de imagen
            const nameImage = el('srcImage');
            nameImage.innerHTML += '<img src="http://localhost:8081/' +  product.image + '" + alt="'+product.image+'"+ width="100%"/>';
            
            // Boton de compra segun rol
            const salesButton = el('salesButton');
            let roleSession = sessionStorage.getItem("role");
            if ((roleSession == 'admin' || roleSession == 'user')) {
                salesButton.innerHTML += '<a href="sales.html" type="button" class="btn btn-sm px-5 py-1 btn-outline-danger"><strong>Comprar</strong></a>';
            } else {
                salesButton.innerHTML += '<a href="#" type="button" class="btn btn-sm btn-outline-danger"><strong>Iniciar Sesion para COMPRAR</strong></a>';
            }
            // construccion de la tabla
            const productTable = el('tableBodyView');
            const row = document.createElement('tr');
            row.innerHTML = '<td>Product Name: </td>' +
                            td(product.product_name);
            productTable.appendChild(row);
            const row1 = document.createElement('tr');
            row1.innerHTML = '<td>Descripcion: </td>' +
                            td(product.description);
            productTable.appendChild(row1);
            const row2 = document.createElement('tr');
            row2.innerHTML = '<td>Release date: </td>' +
                            td(product.release_date);
            productTable.appendChild(row2);
            const row3 = document.createElement('tr');
            row3.innerHTML = '<td>Product Status: </td>' +
                            td(product.product_status);
            productTable.appendChild(row3);
            const row4 = document.createElement('tr');
            row4.innerHTML = '<td>Price: </td>' +
                            td(product.sale_price);
            productTable.appendChild(row4);
            const row5 = document.createElement('tr');
            // Solo puede ver los datos de unidades de stock y proveedor si es administrador
            if ((roleSession == 'admin')) {
                
                row5.innerHTML = '<td>Stock Units: </td>' +
                                td(product.stock_units);
                productTable.appendChild(row5);
                // Relaciones de las dos tablas Products y Suppliers
                axios.get('http://localhost:8081/suppliers/' + product.id_supplier)
                .then((response) => {
                    const supplier = response.data;
                    const row6 = document.createElement('tr');
                    row6.innerHTML = '<td>Name Supplier: </td>' +
                                    td(supplier.name);
                    productTable.appendChild(row6);
                    const row7 = document.createElement('tr');
                    row7.innerHTML = '<td>City: </td>' +
                                    td(supplier.city);
                    productTable.appendChild(row7);
                    const row8 = document.createElement('tr');
                    row8.innerHTML = '<td>Email: </td>' +
                                    td(supplier.email);
                    productTable.appendChild(row8);
                })
            }    

        });
};