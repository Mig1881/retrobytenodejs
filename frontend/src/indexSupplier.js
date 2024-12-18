import axios from 'axios';
import { el, icon, td } from './documentUtil';
import { notifyOk } from './dialogUtil';

window.readSuppliers = function() {
    axios.get('http://localhost:8081/suppliers')
        .then((response) => {
            const supplierList = response.data;
            const supplierTable = el('tableBody');
            
            supplierList.forEach(supplier => {
                const row = document.createElement('tr');
                row.id = 'supplier-' + supplier.id_supplier;
                row.innerHTML = td(supplier.name) +
                                td(supplier.city) +
                                td(supplier.email) +
                                '&nbsp;&nbsp;<a class="btn btn-warning" href="modifySupplier.html?id_supplier=' + supplier.id_supplier + '">' +
                                icon('edit') + 
                                '</a>&nbsp; ' +
                                '<a class="btn btn-danger" href="javascript:removeSupplier(' + supplier.id_supplier + ')">' +
                                icon('delete') +
                                '</a>' +
                                '&nbsp;&nbsp;<a class="btn btn-info" href="viewsupplier.html?id_supplier=' + supplier.id_supplier + '">' +
                                icon('view');
                supplierTable.appendChild(row);
            })
            
        });
    
};
// 
window.removeSupplier = function(id_supplier) {
    if (confirm('¿Está seguro de que desea eliminar este proveedor?')) {
        axios.delete('http://localhost:8081/suppliers/' + id_supplier)
            .then((response) => {
                if (response.status == 204) {
                    notifyOk('Proveedor eliminado correctamente');
                    el('supplier-' + id_supplier).remove();
                } else {
                    notifyError('Error en la eliminacion del proveedor, proveedor no eliminado');
                }
            });
    }
};
