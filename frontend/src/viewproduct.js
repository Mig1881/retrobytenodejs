import axios from 'axios';
import { notifyError, notifyOk } from './dialogUtil.js';
import { el, td } from './documentUtil.js';
// no se como se pasa el codigo estas dos lineas igual estan mal 

window.viewProduct = function() {
    const queryParams = new URLSearchParams(window.location.search);
    const productId = queryParams.get('id_product');
    axios.get('http://localhost:8081/products/' + productId)
        .then((response) => {
            const product = response.data;
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
                row5.innerHTML = '<td>Stock Units: </td>' +
                                td(product.stock_units);
                productTable.appendChild(row5);

                                
           
            
        });

    
};