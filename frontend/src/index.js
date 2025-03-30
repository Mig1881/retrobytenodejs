import axios from 'axios';
import { el, icon, td } from './documentUtil';
import { notifyOk } from './dialogUtil';

window.readProducts = function() {
    let usernameSession = sessionStorage.getItem("username");
    let roleSession = sessionStorage.getItem("role");
    const usernameDisplay = el('userJs');
    const rolDisplay = el('rolJs');
    const logoutDisplay = el('logout');
    if (usernameSession == null) {
        usernameDisplay.innerHTML += 'no user';
    } else {
        if (roleSession == 'admin') {
            //Elemento 1 pestaña de alta de productos
            let adminHTMLElement01 = document.createElement('li'); //Creamos el elemento que añadiremos en este caso es un 'li'
            adminHTMLElement01.classList.add("nav-item"); //Le añadimos la clase a la que pertenece
            let adminHTMLElement01Interior = document.createElement('a'); //Creamos un elemento que sera el hijo del que hemos creado previamente
            adminHTMLElement01Interior.classList.add("nav-link"); //Le añadimos la clase
            adminHTMLElement01Interior.href = 'register.html'; //Le añadimos el 'href' con la direccion que queremos
            let interior01 = document.createTextNode('Alta de Producto'); //Añadimos el contenido de TEXTO que ira dentro
            adminHTMLElement01Interior.appendChild(interior01); //Añadimos al elemento que sera el hijo el contenido de texto
            adminHTMLElement01.appendChild(adminHTMLElement01Interior); //Añadimos al elemento padre su hijo
            document.getElementById("menuUser").parentElement.appendChild(adminHTMLElement01); //añadimos al documento el elemento padre que contiene todo
            //Elemento2 pestaña de proveedores
            let adminHTMLElement02 = document.createElement('li');
            adminHTMLElement02.classList.add("nav-item");
            let adminHTMLElement02Interior = document.createElement('a');
            adminHTMLElement02Interior.classList.add("nav-link");
            adminHTMLElement02Interior.href = 'indexSupplier.html';
            let interior02 = document.createTextNode('Listado de Proveedores');
            adminHTMLElement02Interior.appendChild(interior02);
            adminHTMLElement02.appendChild(adminHTMLElement02Interior);
            document.getElementById("menuUser").parentElement.appendChild(adminHTMLElement02);
            //Elemento3 pestaña de usuarios
            let adminHTMLElement03 = document.createElement('li');
            adminHTMLElement03.classList.add("nav-item");
            let adminHTMLElement03Interior = document.createElement('a');
            adminHTMLElement03Interior.classList.add("nav-link");
            adminHTMLElement03Interior.href = 'indexUser.html';
            let interior03 = document.createTextNode('Listado de Usuarios');
            adminHTMLElement03Interior.appendChild(interior03);
            adminHTMLElement03.appendChild(adminHTMLElement03Interior);
            document.getElementById("menuUser").parentElement.appendChild(adminHTMLElement03);
        } else {
            //Elemento4 pestaña de Modificacion datos del usuario no admin
            if (usernameSession !== "no user") {
                let adminHTMLElement04 = document.createElement('li');
                adminHTMLElement04.classList.add("nav-item");
                let adminHTMLElement04Interior = document.createElement('a');
                adminHTMLElement04Interior.classList.add("nav-link");
                adminHTMLElement04Interior.href = 'modifyUser.html';
                let interior04 = document.createTextNode('Modificacion datos de tu Usuario');
                adminHTMLElement04Interior.appendChild(interior04);
                adminHTMLElement04.appendChild(adminHTMLElement04Interior);
                document.getElementById("menuUser").parentElement.appendChild(adminHTMLElement04);
            }

        }
         // Displayamos el usuario activo 
         if (usernameSession !== "no user") {
            logoutDisplay.innerHTML +=  '<a class="signin-line"  href="javascript:logoutApp()"> Logout</a>';
            usernameDisplay.innerHTML += usernameSession;
            rolDisplay.innerHTML += roleSession;
         } else {
            usernameDisplay.innerHTML += 'no user';
         }
    };

    axios.get('http://localhost:8081/products')
        .then((response) => {
            const productList = response.data;
            const productTable = el('tableBody');
            
            productList.forEach(product => {
                const row = document.createElement('tr');
                row.id = 'product-' + product.id_product;
                
                // let roleSession1 = localStorage.getItem("role");
                if ( product.stock_units != 0 ) {
                    if (roleSession == 'admin') {   
                    row.innerHTML = td(product.product_name) +
                                    td(product.description) +
                                    td(product.sale_price) +
                                    '&nbsp;&nbsp;<a class="btn btn-warning" href="modify.html?id_product=' + product.id_product + '">' +
                                    icon('edit') + 
                                    '</a>&nbsp; ' +
                                    '<a class="btn btn-danger" href="javascript:removeProduct(' + product.id_product + ')">' +
                                    icon('delete') +
                                    '</a>' +
                                    '&nbsp;&nbsp;<a class="btn btn-info" href="viewproduct.html?id_product=' + product.id_product + '">' +
                                    icon('view');
                    } else {
                        row.innerHTML = td(product.product_name) +
                                    td(product.description) +
                                    td(product.sale_price) +
                                    '&nbsp;&nbsp;<a class="btn btn-info" href="viewproduct.html?id_product=' + product.id_product + '">' +
                                    icon('view') +'</a>';


                    }                
                    productTable.appendChild(row);
                }
            })
            
        });
    
};
// Esta claro que asi no se pasan los codigos( clave = valor???)
window.removeProduct = function(id_product) {
    if (confirm('¿Está seguro de que desea eliminar este producto?')) {
        axios.delete('http://localhost:8081/products/' + id_product)
            .then((response) => {
                if (response.status == 204) {
                    notifyOk('Producto eliminado correctamente');
                    el('product-' + id_product).remove();
                } else {
                    notifyError('Error en la eliminacion del producto, producto no eliminado');
                }
            });
    }
};

window.logoutApp = function() {
    sessionStorage.setItem("username","no user");
    sessionStorage.setItem("role","");
    location.reload();
    notifyOk('Sesion cerrada correctamente');
};
