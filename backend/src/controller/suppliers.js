const { findSuppliers, findSupplier, registerSupplier, modifySupplier, removeSupplier } = require("../service/suppliers");

// ALL suppliers
const getSuppliers = (async (req, res) => {
    const SupplierList = await findSuppliers();

    res.status(200).json(SupplierList);
});
//One Supplier
const getSupplier = (async (req, res) => {
    const supplierId = parseInt(req.params.id_supplier);

    if (!Number.isInteger(supplierId)) {
        res.status(400).json({
            status: 'bad-request',
            message: 'supplierId is not a valid number'
        });
        return;
    }

    const supplier = await findSupplier(supplierId);

    if (supplier === undefined) {
        res.status(404).json({
            status: 'not-found',
            message: 'Supplier not found'
        });
        return;
    }

    res.status(200).json(supplier);
});
//Post Supplier
const postSupplier = (async (req, res) => {
    //CHECKS
    if (req.body.name === undefined || req.body.name === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'name field is mandatory'
        });
        return;
    }

    if (req.body.tel === undefined || req.body.tel === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'tel field is mandatory'
        });
        return;
    }

    if (req.body.address === undefined || req.body.address === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'address field is mandatory'
        });
        return;
    }

    if (req.body.zip_code === undefined || req.body.zip_code === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'zip_code field is mandatory'
        });
        return;
    }

    if (req.body.city === undefined || req.body.city === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'city field is mandatory'
        });
        return;
    }
   
    if  (req.body.country === undefined || req.body.country === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'country is an obliglatory field'
        });
        return;
    }

    if  (req.body.website === undefined || req.body.website === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'website is an obliglatory field'
        });
        return;
    }

    if  (req.body.email === undefined || req.body.email === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'email is an obliglatory field'
        });
        return;
    }

    const result = await registerSupplier(req.body.name, req.body.tel,req.body.address,req.body.zip_code,req.body.city,req.body.country,req.body.website,req.body.email);
       
    res.status(201).json({
        id_supplier: result.id,
        name: req.body.name,
        tel: req.body.tel,
        address: req.body.address,
        zip_code: req.body.zip_code,
        city : req.body.city,
        country: req.body.country,
        website: req.body.website,
        email: req.body.email
    
    });
});
// Put supplier
const putSupplier = (async (req, res) => {

    if (req.body.name === undefined || req.body.name === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'Supplier name field is mandatory'
        });
        return;
    }

    if (req.body.tel === undefined || req.body.tel === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'tel field is mandatory'
        });
        return;
    }

    if (req.body.address === undefined || req.body.address === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'address field is mandatory'
        });
        return;
    }

    if (req.body.zip_code === undefined || req.body.zip_code === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'zip_code field is mandatory'
        });
        return;
    }

    if (req.body.city === undefined || req.body.city === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'city field is mandatory'
        });
        return;
    }
   
    if  (req.body.country === undefined || req.body.country === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'country is an obliglatory field'
        });
        return;
    }

    if  (req.body.website === undefined || req.body.website === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'website is an obliglatory field'
        });
        return;
    }

    if  (req.body.email === undefined || req.body.email === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'email is an obliglatory field'
        });
        return;
    }

    const modified = await modifySupplier(req.params.id_supplier,req.body.name, req.body.tel,req.body.address,req.body.zip_code,req.body.city,req.body.country,req.body.website,req.body.email);

    if (!modified) {
        res.status(404).json({
            status: 'not-found',
            message: 'supplier not found'
        });
        return;
    }

    res.status(204).json({
        id_supplier: req.body.id_supplier,
        name: req.body.name,
        tel: req.body.tel,
        address: req.body.address,
        zip_code: req.body.zip_code,
        city : req.body.city,
        country: req.body.country,
        website: req.body.website,
        email: req.body.email
    
    });
});
//Delete Supplier
const deleteSupplier = (async (req, res) => {
    const supplierId = parseInt(req.params.id_supplier);

    if (!Number.isInteger(supplierId)) {
        res.status(400).json({
            status: 'bad-request',
            message: 'SupplierId is not a valid number'
        });
        return;
    }
    
    const removed = await removeSupplier(supplierId);

    if (!removed) {
        res.status(404).json({
            status: 'not-found',
            message: 'supplier not found'
        });
        return;
    }
    
    res.status(204).json({})
});

module.exports = {
    getSuppliers,
    getSupplier,
    postSupplier,
    putSupplier,
    deleteSupplier
};