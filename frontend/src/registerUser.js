import axios from 'axios';
import { notifyError, notifyOk } from './dialogUtil.js';
import { el } from './documentUtil.js';

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
        notifyError('El nombre del usuario es un campo obligatorio');
        return;
    }
    
    if (password === '') {
        notifyError('Password es un campo obligatorio');
        return;
    }
    // Solo los administradores pueden hacer a otros administradores
    if (role === '') {
        notifyError('Role es un campo obligatorio');
        return;
    } else {
        let roleSession = sessionStorage.getItem("role");
        if (roleSession != 'admin') {
            if (role == 'admin') {
                notifyError('Solo lo puede hacer otro admin');
                return;
            } else {
                if(role != 'user'){
                    notifyError('role tiene que ser user');
                    return; 
                }
            }
        } else {
            if (!(role == 'admin' || role == 'user ')) {
                notifyError('role tiene que ser user o admin');
                return;
            }
        }
    }    

    if (tel === '') {
        notifyError('Tel es un campo obligatorio');
        return;
    }

    if (address === '') {
        notifyError('Adrress es un campo obligatorio');
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
    //Username es clave unica, debe ser siempre distinto, verificacion
    if (username === '') {
        notifyError('Username es un campo obligatorio');
        return;
    } else {
        axios.get('http://localhost:8081/users/' + username)
        .then((response) => {

            if (response.status == 200) {
                const user = response.data;
                console.log(username);
                if (user.username == username){
                    notifyError('El Usernane ya existe, eliga otro');
                    return;
                } else {
                    axios.post('http://localhost:8081/users', {
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
                            notifyOk('Usuario Registrado');
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
                            notifyError('Error en el registro del Usuario');
                        }
                    });

                }

            }        
        });
    }



    


    
};