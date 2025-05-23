import axios from 'axios';
import { el, icon, td, host } from './documentUtil';
import { notifyOk } from './dialogUtil';

window.readUsers = function() {
    axios.get(host + 'users')
        .then((response) => {
            const userList = response.data;
            const userTable = el('tableBody');
            
            userList.forEach(user => {
                const row = document.createElement('tr');
                row.id = 'user-' + user.id_user;
                row.innerHTML = td(user.name) +
                                td(user.username) +
                                td(user.city) +
                                '&nbsp;&nbsp;<a class="btn btn-warning" href="modifyUser.html?username=' + user.username + '">' +
                                icon('edit') + 
                                '</a>&nbsp; ' +
                                '<a class="btn btn-danger" href="javascript:removeUser(' + user.id_user + ')">' +
                                icon('delete') +
                                '</a>' +
                                '&nbsp;&nbsp;<a class="btn btn-info" href="viewuser.html?username=' + user.username + '">' +
                                icon('view');
                userTable.appendChild(row);
            })
            
        });
    
};
// 
window.removeUser = function(id_user) {
    if (confirm('Are you sure you want to delete this user?')) {
        axios.delete(host + 'users/' + id_user)
            .then((response) => {
                if (response.status == 204) {
                    notifyOk('Usuario eliminado correctamente');
                    el('user-' + id_user).remove();
                } else {
                    notifyError('Error deleting user, user not deleted');
                }
            });
    }
};
