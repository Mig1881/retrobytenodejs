import axios from 'axios';
import { notifyError, notifyOk } from './dialogUtil.js';
import { el, td } from './documentUtil.js';

var arrayIdsupplier = [];

window.loadProduct = function() {
    //leo suppliers para comprobacion de codigo de supplier
    axios.get('http://localhost:8081/suppliers')
    .then((response) => {
        const supplierList = response.data;
        const supplierTable = el('tableBody');
        
        supplierList.forEach(supplier => {
            const row = document.createElement('tr');
            row.innerHTML = td(supplier.id_supplier) +
                            td(supplier.name); 
            supplierTable.appendChild(row);
            arrayIdsupplier.push(supplier.id_supplier);
        })
        
    });

    const queryParams = new URLSearchParams(window.location.search);
    const productId = queryParams.get('id_product');
    axios.get('http://localhost:8081/products/' + productId)
        .then((response) => {
            const product = response.data;
            document.getElementById('product_name').value = product.product_name;
            document.getElementById('description').value= product.description;
            document.getElementById('sale_price').value = product.sale_price;
            document.getElementById('stock_units').value = product.stock_units;
            document.getElementById('release_date').value = product.release_date;
            document.getElementById('product_status').value = product.product_status;
            document.getElementById('id_supplier').value = product.id_supplier;
            // document.getElementById('image').value = product.image;

                                
           
            
        });

        window.modifyProduct = function() {
            const product_name = document.getElementById('product_name').value;
            const description = document.getElementById('description').value;
            const sale_price = document.getElementById('sale_price').value;
            const stock_units = document.getElementById('stock_units').value;
            const release_date = document.getElementById('release_date').value;
            const product_status = document.getElementById('product_status').value;
            const id_supplier = document.getElementById('id_supplier').value;
            const image = document.getElementById('image').value;

            //Validación de datos
            if (product_name === '') {
                notifyError('El nombre del producto es un campo obligatorio');
                return;
            }

            if (description === '') {
                notifyError('Descripcion es un campo obligatorio');
                return;
            }

            if (sale_price === '') {
                notifyError('Precio de venta es un campo obligatorio');
                return;
            }

            if (stock_units === '') {
                notifyError('El unidades en stock es un campo obligatorio');
                return;
            }
        
            if (release_date === '') {
                notifyError('Fecha de lanzamiento es un campo obligatorio');
                return;
            }
        
            if (product_status === '') {
                notifyError('Estado del producto es un campo obligatorio');
                return;
            }
        
            if (id_supplier !== '') {
                    let igualTest = false;
                    for (let idAux of arrayIdsupplier) {
                        if (idAux == id_supplier){
                            igualTest = true;
                       }
                    }
                    if (!igualTest){
                        notifyError('Codigo proveedor no encontrado');
                        return;
                    }
            } else {
                    notifyError('Codigo proveedor es un campo obligatorio');
                    return;
            }

            if (image === '') {
                notifyError('Imagen es un campo obligatorio');
                return;
            } else {
                const imageFile = el('image').files[0];
            
                 // Prepara los datos del formulario para ser enviados al backend
                const formData = new FormData();
                formData.append('image', imageFile);
                
                axios.post('http://localhost:8081/images', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'   
                     }
                    }).then((response) => {
                        notifyOk('Los datos de imagen se han registrado correctamente');
                        
                        imageAux = response.data;
                        //Nombre de la imagen del producto afectado
                        const queryParams = new URLSearchParams(window.location.search);
                        const productId = queryParams.get('id_product');


                        axios.put('http://localhost:8081/products/' + productId, {
                            product_name: product_name,
                            description: description,
                            sale_price: sale_price,
                            stock_units: stock_units,
                            image: imageAux,
                            release_date: release_date,
                            product_status: product_status,
                            id_supplier: id_supplier
                        })
                        .then((response) => {
                            // Confirmar al usuario que todo ha ido bien (o mal)
                            if (response.status == 204) {
                                notifyOk('Producto Modificado');
                            } else {
                                notifyError('Error en la modificacion del producto, producto no modificado');
                            }
                        });
        
                        }).catch((error) => {
                            notifyError('Se ha producido un error al enviar los datos de imagen');
                            console.log(error);
                        });
        
            }


            

        };

       
            
};