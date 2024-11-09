import axios from 'axios';

window.readProducts = function() {
    axios.get('http://localhost:8081/products')
        .then((response) => {
            const productList = response.data;
            const productUl = document.getElementById('products');

            productList.forEach(product => {
                const li = document.createElement('li');
                li.appendChild(document.createTextNode(product.product_name + ' (' + product.release_date + ') ' + product.sale_price));
                productUl.appendChild(li);
            })
        });
    //con esto compruebo que se llama a la funcion y que todo esta bien linkado, es una traza
    const pantalla= document.querySelector('.pantalla')
    pantalla.textContent = 'Se esta ejecutando';
}


//*
// Campos de la tabla products
//  id_product int PRIMARY KEY AUTO_INCREMENT,
// 	product_name varchar(50),
// 	description varchar(150),
// 	sale_price decimal(9,2),
// 	stock_units int default 1,
// 	image varchar(40),
// 	release_date date,
// 	product_status varchar(100),
// 	id_supplier int
//*