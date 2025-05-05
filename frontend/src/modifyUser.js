import axios from 'axios';
import { notifyError, notifyOk } from './dialogUtil.js';
import { host } from './documentUtil.js';

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
        let interior05 = document.createTextNode('User List');
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
        let interior06 = document.createTextNode('Product List');
        adminHTMLElement06Interior.appendChild(interior06);
        adminHTMLElement06.appendChild(adminHTMLElement06Interior);
        document.getElementById("menuUserAdmin").parentElement.appendChild(adminHTMLElement06);
        //
        userName = sessionStorage.getItem("username");
    }


    // defino variable para despues modificar
    let userId;
    axios.get(host + 'users/' + userName)
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
                notifyError('Username required');
                return;
            }

            if (password === '') {
                notifyError('Password required');
                return;
            }

            if (role === '') {
                notifyError('Role required');
                return;
            } else {
                let roleSession = sessionStorage.getItem("role");
                if (roleSession != 'admin') {
                    if (role == 'admin') {
                        notifyError('Admin can be created just by another admin');
                        return;
                    } else {
                        if(role != 'user'){
                            notifyError('Role need to be user');
                            return; 
                        }
                    }
                } else {
                    if (!(role == 'admin' || role == 'user ')) {
                        notifyError('Role have to be user or admin');
                        return;
                    }
                }
            }    

            if (tel === '') {
                notifyError('Phone Number required');
                return;
            }

            if (address === '') {
                notifyError('Address required');
                return;
            }

            if (zip_code === '') {
                notifyError('Postcode required');
                return;
            }

            if (city === '') {
                notifyError('City required');
                return;
            }

            if (country === '') {
                notifyError('Country required');
                return;
            }

           

            // const queryParams = new URLSearchParams(window.location.search);
            // const supplierId = queryParams.get('id_supplier');

            axios.put(host + 'users/' + userId, {
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
                    notifyOk('User Modified');
                } else {
                    notifyError('Error. Supplier not modified.');
                }
            });

           
        };

       
            
};
