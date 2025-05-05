import axios from 'axios';
import { notifyError, notifyOk } from './dialogUtil.js';
import { host } from './documentUtil.js';

window.loadSupplier = function() {
    const queryParams = new URLSearchParams(window.location.search);
    const supplierId = queryParams.get('id_supplier');
    axios.get(host + 'suppliers/' + supplierId)
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
                notifyError('Supplier name is required');
                return;
            }

            if (tel === '') {
                notifyError('Telephone is required');
                return;
            }

            if (address === '') {
                notifyError('Address is required');
                return;
            }

            if (zip_code === '') {
                notifyError('Zip Code is required');
                return;
            }

            if (city === '') {
                notifyError('City is required');
                return;
            }

            if (country === '') {
                notifyError('Country is required');
                return;
            }

            if (website === '') {
                notifyError('Website is required');
                return;
            }

            if (email === '') {
                notifyError('Email is required');
                return;
            }

            const queryParams = new URLSearchParams(window.location.search);
            const supplierId = queryParams.get('id_supplier');


            axios.put(host + 'suppliers/' + supplierId, {
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
                    notifyOk('Supplier modified');
                } else {
                    notifyError('Error modifying supplier');
                }
            });

           
        };

       
            
};
