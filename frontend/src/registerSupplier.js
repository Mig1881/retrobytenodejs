import axios from 'axios';
import { notifyError, notifyOk } from './dialogUtil.js';
import { el } from './documentUtil.js';

window.addSupplier = function() {
    const name = document.getElementById('name').value;
    const tel = document.getElementById('tel').value;
    const address = document.getElementById('address').value;
    const zip_code = document.getElementById('zip_code').value;
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;
    const website = document.getElementById('website').value;
    const email = document.getElementById('email').value;

    // Validación de datos
    if (name === '') {
        notifyError('El nombre del proveedor es un campo obligatorio');
        return;
    }

    if (tel === '') {
        notifyError('Telefono es un campo obligatorio');
        return;
    }

    if (address === '') {
        notifyError('Direccion es un campo obligatorio');
        return;
    }

    if (zip_code === '') {
        notifyError('Codigo postal es un campo obligatorio');
        return;
    }

    if (city === '') {
        notifyError('Ciudad es un campo obligatorio');
        return;
    }

    if (country === '') {
        notifyError('Pais es un campo obligatorio');
        return;
    }

    if (website === '') {
        notifyError('Sitio Web es un campo obligatorio');
        return;
    }

    if (email === '') {
        notifyError('Correo electronico es un campo obligatorio');
        return;
    }



    axios.post('http://localhost:8081/suppliers', {
        name: name,
        tel: tel,
        address: address,
        zip_code: zip_code,
        city: city,
        country: country,
        website: website,
        email: email
    })
    .then((response) => {
        // Confirmar al usuario que todo ha ido bien (o mal)
        if (response.status == 201) {
            notifyOk('Proveedor Registrado');
        } else {
            notifyError('Error en el registro del proveedor, proveedor no registrado');
        }
    });


    //Limpiar el formulario
    el('name').value = '';
    el('tel').value = '';
    el('address').value = '';
    el('zip_code').value = '';
    el('city').value = '';
    el('country').value = '';
    el('website').value = '';
    el('email').value = '';
};