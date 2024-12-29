import axios from 'axios';
import { notifyError, notifyOk } from './dialogUtil.js';

window.loadUser = function() {
    // como puede venir de dos sitios, hay que diferenciar el quien se quiere modificar
    // dependiendo de donde venga
    let userName;
    const userSession = sessionStorage.getItem("role");
    if (userSession == 'admin'){
        //Elemento5 pestaña para admin
        let adminHTMLElement05 = document.createElement('li');
        adminHTMLElement05.classList.add("nav-item");
        let adminHTMLElement05Interior = document.createElement('a');
        adminHTMLElement05Interior.classList.add("nav-link");
        adminHTMLElement05Interior.href = 'indexUser.html';
        let interior05 = document.createTextNode('Listado de Usuarios');
        adminHTMLElement05Interior.appendChild(interior05);
        adminHTMLElement05.appendChild(adminHTMLElement05Interior);
        document.getElementById("menuUserAdmin").parentElement.appendChild(adminHTMLElement05);
        // 
        const queryParams = new URLSearchParams(window.location.search);
        userName = queryParams.get('username');
    } else {
        //Elemento6 pestaña para no admin
        let adminHTMLElement06 = document.createElement('li');
        adminHTMLElement06.classList.add("nav-item");
        let adminHTMLElement06Interior = document.createElement('a');
        adminHTMLElement06Interior.classList.add("nav-link");
        adminHTMLElement06Interior.href = 'index.html';
        let interior06 = document.createTextNode('Listado de Productos');
        adminHTMLElement06Interior.appendChild(interior06);
        adminHTMLElement06.appendChild(adminHTMLElement06Interior);
        document.getElementById("menuUserAdmin").parentElement.appendChild(adminHTMLElement06);
        //
        userName = sessionStorage.getItem("username");
    }


    // defino variable para despues modificar
    let userId;
    axios.get('http://localhost:8081/users/' + userName)
        .then((response) => {
            const user = response.data;
            document.getElementById('name').value = user.name;
            // document.getElementById('username').value= user.username;
            document.getElementById('password').value = user.password;
            document.getElementById('role').value = user.role;
            document.getElementById('tel').value = user.tel;
            document.getElementById('address').value = user.address;
            document.getElementById('zip_code').value = user.zip_code;
            document.getElementById('city').value = user.city;
            document.getElementById('country').value = user.country;
            userId = user.id_user;
            

            
        });

        window.modifyUser = function() {
            const name = document.getElementById('name').value;
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

           

            // const queryParams = new URLSearchParams(window.location.search);
            // const supplierId = queryParams.get('id_supplier');


            axios.put('http://localhost:8081/users/' + userId, {
                 name: name,
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
                if (response.status == 204) {
                    notifyOk('Usuario Modificado');
                } else {
                    notifyError('Error en la modificacion del usuario, proveedor no modificado');
                }
            });

           
        };

       
            
};
