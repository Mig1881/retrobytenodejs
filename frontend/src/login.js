import axios from 'axios';
import { notifyError, notifyOk } from './dialogUtil.js';
import { el, td, host } from './documentUtil.js'; 

window.verifyUser = function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === '' || password ===''){
        notifyError('You must fill both fields');
        return;
    }
    axios.get(host + 'users/' + username)
        .then((response) => {

            if (response.status == 200) {
                const user = response.data;
                if (user.username == undefined){
                    notifyError('User does not exist');
                    return;
                }
                if (user.password != password) {
                    notifyError('Wrong password');
                    return;
                } else {
                    notifyOk('Login successfully');
                    sessionStorage.setItem("username",user.username);
                    sessionStorage.setItem("role",user.role);
                    
                }  
            }        
        });

    
};