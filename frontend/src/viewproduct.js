import axios from 'axios';
import { notifyError, notifyOk } from './dialogUtil.js';
import { el, td, host } from './documentUtil.js';

let product_aux = {};
window.viewProduct = function() {
    const queryParams = new URLSearchParams(window.location.search);
    const productId = queryParams.get('id_product');
    axios.get(host + 'products/' + productId)
        .then((response) => {
            const product = response.data;
            //Contruimos primero la linea de imagen
            const nameImage = el('srcImage');
            nameImage.innerHTML += '<img src="' + host +  product.image + '" + alt="'+product.image+'"+ width="100%"/>';
            
            // Boton de compra segun rol
            const salesButton = el('salesButton');
            let roleSession = sessionStorage.getItem("role");
            if ((roleSession == 'admin' || roleSession == 'user')) {
                // salesButton.innerHTML += '<a href="sales.html" type="button" class="btn btn-sm px-5 py-1 btn-outline-danger"><strong>Comprar</strong></a>';
                salesButton.innerHTML += '<a href="javascript:addOrder(' + product.id_product + ')" type="button" class="btn btn-sm px-5 py-1 btn-outline-danger"><strong>Buy</strong></a>';
            } else {
                salesButton.innerHTML += '<a href="#" type="button" class="btn btn-sm btn-outline-danger"><strong>Sign In For Buy</strong></a>';
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
            let releaseDate = new Date(product.release_date);
            let releaseDateFormat = releaseDate.toLocaleDateString('es-ES');
            row2.innerHTML = '<td>Release date: </td>' +
                            td(releaseDateFormat);
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
                axios.get(host + 'suppliers/' + product.id_supplier)
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

window.addOrder = function(product_id) {
    let idProduct = product_id;
    let stockUnits = 0;
    let fechaFormato = product_aux.release_date.split("T")[0];
    axios.put(host + 'products/' + idProduct, {
        product_name: product_aux.product_name,
        description: product_aux.description,
        sale_price: product_aux.sale_price,
        stock_units: stockUnits,
        image: product_aux.image,
        release_date: fechaFormato,
        product_status: product_aux.product_status,
        id_supplier: product_aux.id_supplier
    });    
    notifyOk('Order done');
                        
};