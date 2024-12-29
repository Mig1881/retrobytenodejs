import axios from 'axios';
import { notifyError, notifyOk } from './dialogUtil.js';
import { el, td } from './documentUtil.js';
// no se como se pasa el codigo estas dos lineas igual estan mal 

window.viewUser = function() {
    const queryParams = new URLSearchParams(window.location.search);
    const userName = queryParams.get('username');
    axios.get('http://localhost:8081/users/' + userName)
        .then((response) => {
            const user = response.data;
            const userTable = el('tableBodyView');
            
            
                const row = document.createElement('tr');
                row.innerHTML = '<td>Name: </td>' +
                                td(user.name);
                userTable.appendChild(row);
                const row1 = document.createElement('tr');
                row1.innerHTML = '<td>Username: </td>' +
                                td(user.username);
                userTable.appendChild(row1);
                const row2 = document.createElement('tr');
                row2.innerHTML = '<td>Role: </td>' +
                                td(user.role);
                userTable.appendChild(row2);
                const row3 = document.createElement('tr');
                row3.innerHTML = '<td>Tel: </td>' +
                                td(user.tel);
                userTable.appendChild(row3);
                const row4 = document.createElement('tr');
                row4.innerHTML = '<td>Address: </td>' +
                                td(user.address);
                userTable.appendChild(row4);
                const row5 = document.createElement('tr');
                row5.innerHTML = '<td>Zip code: </td>' +
                                td(user.zip_code);
                userTable.appendChild(row5);
                const row6 = document.createElement('tr');
                row6.innerHTML = '<td>City: </td>' +
                                td(user.city);
                userTable.appendChild(row6);
                const row7 = document.createElement('tr');
                row7.innerHTML = '<td>Country: </td>' +
                                td(user.country);
                userTable.appendChild(row7);
                
                

                                
           
            
        });

    
};