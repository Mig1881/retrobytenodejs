import axios from 'axios';
import { notifyError, notifyOk } from './dialogUtil.js';
import { el, td } from './documentUtil.js';
// no se como se pasa el codigo estas dos lineas igual estan mal 

window.verifyUser = function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === '' || password ===''){
        notifyError('Debes de rellenar los dos campos Username y Password');
        return;
    }
    axios.get('http://localhost:8081/users/' + username)
        .then((response) => {

            if (response.status == 200) {
                const user = response.data;
                if (user.username == undefined){
                    notifyError('El Usuario no existe');
                    return;
                }
                if (user.password != password) {
                    notifyError('El Password es erroneo');
                    return;
                } else {
                    notifyOk('Login realizado');
                    sessionStorage.setItem("username",user.username);
                    sessionStorage.setItem("role",user.role);
                    
                }  
            }        
        });

    
};