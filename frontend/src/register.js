import axios from 'axios';
import { notifyError, notifyOk } from './dialogUtil.js';
import { el } from './documentUtil.js';

window.addProduct = function() {
    const product_name = document.getElementById('product_name').value;
    const description = document.getElementById('description').value;
    const sale_price = document.getElementById('sale_price').value;
    const stock_units = document.getElementById('stock_units').value;
    const image = document.getElementById('image').value;
    const release_date = document.getElementById('release_date').value;
    const product_status = document.getElementById('product_status').value;
    const id_supplier = document.getElementById('id_supplier').value;

    // TODO Validación de datos faltan por validar mas datos
    if (product_name === '') {
        notifyError('El nombre del producto es un campo obligatorio');
        return;
    }

    if (description === '') {
        notifyError('Descripcion es un campo obligatorio');
        return;
    }

    if (sale_price === '') {
        notifyError('Precio de venta es un campo obligatorio');
        return;
    }



    axios.post('http://localhost:8081/products', {
        product_name: product_name,
        description: description,
        sale_price: sale_price,
        stock_units: stock_units,
        image: image,
        release_date: release_date,
        product_status: product_status,
        id_supplier: id_supplier
    });

    // TODO Confirmar al usuario que todo ha ido bien (o mal)
    notifyOk('Pelicula registrada');

    // TODO Limpiar el formulario
    el('product_name').value = '';
    el('description').value = '';
    el('sale_price').value = '';
    el('stock_units').value = '';
    el('image').value = '';
    el('release_date').value = '';
    el('product_status').value = '';
    el('id_supplier').value = '';
};