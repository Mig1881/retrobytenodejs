import axios from 'axios';
import { notifyError, notifyOk } from './dialogUtil.js';

window.loadSupplier = function() {
    const queryParams = new URLSearchParams(window.location.search);
    const supplierId = queryParams.get('id_supplier');
    axios.get('http://localhost:8081/suppliers/' + supplierId)
        .then((response) => {
            const supplier = response.data;
            document.getElementById('name').value = supplier.name;
            document.getElementById('tel').value= supplier.tel;
            document.getElementById('address').value = supplier.address;
            document.getElementById('zip_code').value = supplier.zip_code;
            document.getElementById('city').value = supplier.city;
            document.getElementById('country').value = supplier.country;
            document.getElementById('website').value = supplier.website;
            document.getElementById('email').value = supplier.email;

            
        });

        window.modifySupplier = function() {
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

            const queryParams = new URLSearchParams(window.location.search);
            const supplierId = queryParams.get('id_supplier');


            axios.put('http://localhost:8081/suppliers/' + supplierId, {
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
                if (response.status == 204) {
                    notifyOk('Proveedor Modificado');
                } else {
                    notifyError('Error en la modificacion del proveedor, proveedor no modificado');
                }
            });

           
        };

       
            
};
