import axios from 'axios';
import { notifyError, notifyOk } from './dialogUtil.js';
import { el, td } from './documentUtil.js';
// no se como se pasa el codigo estas dos lineas igual estan mal 

window.viewSupplier = function() {
    const queryParams = new URLSearchParams(window.location.search);
    const supplierId = queryParams.get('id_supplier');
    axios.get('http://localhost:8081/suppliers/' + supplierId)
        .then((response) => {
            const supplier = response.data;
            const supplierTable = el('tableBodyView');
            
            
                const row = document.createElement('tr');
                row.innerHTML = '<td>Name: </td>' +
                                td(supplier.name);
                supplierTable.appendChild(row);
                const row1 = document.createElement('tr');
                row1.innerHTML = '<td>Tel: </td>' +
                                td(supplier.tel);
                supplierTable.appendChild(row1);
                const row2 = document.createElement('tr');
                row2.innerHTML = '<td>Address: </td>' +
                                td(supplier.address);
                supplierTable.appendChild(row2);
                const row3 = document.createElement('tr');
                row3.innerHTML = '<td>Zip code: </td>' +
                                td(supplier.zip_code);
                supplierTable.appendChild(row3);
                const row4 = document.createElement('tr');
                row4.innerHTML = '<td>City: </td>' +
                                td(supplier.city);
                supplierTable.appendChild(row4);
                const row5 = document.createElement('tr');
                row5.innerHTML = '<td>Country: </td>' +
                                td(supplier.country);
                supplierTable.appendChild(row5);
                const row6 = document.createElement('tr');
                row6.innerHTML = '<td>Website: </td>' +
                                td(supplier.website);
                supplierTable.appendChild(row6);
                const row7 = document.createElement('tr');
                row7.innerHTML = '<td>Email: </td>' +
                                td(supplier.email);
                supplierTable.appendChild(row7);

                                
           
            
        });

    
};