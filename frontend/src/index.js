import axios from 'axios';
import { el, icon, td } from './documentUtil';
import { notifyOk } from './dialogUtil';

window.readProducts = function() {
    axios.get('http://localhost:8081/products')
        .then((response) => {
            const productList = response.data;
            const productTable = el('tableBody');
            
            productList.forEach(product => {
                const row = document.createElement('tr');
                row.id = 'product-' + product.id_product;
                row.innerHTML = td(product.product_name) +
                                td(product.description) +
                                td(product.sale_price) +
                                '&nbsp;&nbsp;<a class="btn btn-warning" href="modify.html">' +
                                icon('edit') + 
                                '</a>&nbsp; ' +
                                '<a class="btn btn-danger" href="javascript:removeProduct(' + product.id_product + ')">' +
                                icon('delete') +
                                '</a>' +
                                '&nbsp;&nbsp;<a class="btn btn-info" href="viewproduct.html">' +
                                icon('view');
                productTable.appendChild(row);
            })
            
        });
    
};

window.removeProduct = function(id_product) {
    if (confirm('¿Está seguro de que desea eliminar este producto?')) {
        axios.delete('http://localhost:8081/products/' + id_product)
            .then((response) => {
                if (response.status == 204) {
                    notifyOk('Producto eliminado correctamente');
                    el('product-' + id_product).remove();
                }
            });
    }
};
