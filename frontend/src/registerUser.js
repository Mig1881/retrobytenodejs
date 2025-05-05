import axios from 'axios';
import { notifyError, notifyOk } from './dialogUtil.js';
import { el, host } from './documentUtil.js';

window.addUser = function() {
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const tel = document.getElementById('tel').value;
    const address = document.getElementById('address').value;
    const zip_code = document.getElementById('zip_code').value;
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;
    

    // Validación de datos
    if (name === '') {
        notifyError('Username is required');
        return;
    }
    
    if (password === '') {
        notifyError('Password is required');
        return;
    }
    // Solo los administradores pueden hacer a otros administradores
    if (role === '') {
        notifyError('Role is required');
        return;
    } else {
        let roleSession = sessionStorage.getItem("role");
        if (roleSession != 'admin') {
            if (role == 'admin') {
                notifyError('Only admins can create admins');
                return;
            } else {
                if(role != 'user'){
                    notifyError('role has to be user');
                    return; 
                }
            }
        } else {
            if (!(role == 'admin' || role == 'user ')) {
                notifyError('role has to be user or admin');
                return;
            }
        }
    }    

    if (tel === '') {
        notifyError('Telephone is required');
        return;
    }

    if (address === '') {
        notifyError('Adrress is required');
        return;
    }


    if (zip_code === '') {
        notifyError('Postalcode is required');
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
    //Username es clave unica, debe ser siempre distinto, verificacion
    if (username === '') {
        notifyError('Username is required');
        return;
    } else {
        axios.get(host + 'users/' + username)
        .then((response) => {

            if (response.status == 200) {
                const user = response.data;
                console.log(username);
                if (user.username == username){
                    notifyError('Username already in use');
                    return;
                } else {
                    axios.post(host + 'users', {
                        name: name,
                        username: username,
                        password: password,
                        role: role,
                        tel: tel,
                        address: address,
                        zip_code: zip_code,
                        city: city,
                        country: country
                    })
                    .then((response) => {
                        // Confirmar al usuario que todo ha ido bien (o mal)
                        if (response.status == 201) {
                            notifyOk('User Registered');
                            //Limpiar el formulario
                            el('name').value = '';
                            el('username').value = '';
                            el('password').value = '';
                            el('role').value = '';
                            el('tel').value = '';
                            el('address').value = '';
                            el('zip_code').value = '';
                            el('city').value = '';
                            el('country').value = '';
                        } else {
                            notifyError('Error registering user');
                        }
                    });

                }

            }        
        });
    }



    


    
};