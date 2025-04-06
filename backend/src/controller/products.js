const { findProducts, findProduct, registerProduct, modifyProduct, removeProduct } = require("../service/products");


//All products
const getProducts = (async (req, res) => {
    
    const productList = await findProducts();
    
    res.status(200).json(productList);
});
//One Product
const getProduct = (async (req, res) => {
    const productId = parseInt(req.params.id_product);

    if (!Number.isInteger(productId)) {
        res.status(400).json({
            status: 'bad-request',
            message: 'productId is not a valid number'
        });
        return;
    }

    const product = await findProduct(productId);

    if (product === undefined) {
        res.status(404).json({
            status: 'not-found',
            message: 'Product not found'
        });
        return;
    }

    res.status(200).json(product);
});
//Post product
const postProduct = (async (req, res) => {
    //CHECKS
    if (req.body.product_name === undefined || req.body.product_name === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'product_name field is mandatory'
        });
        return;
    }

    if (req.body.description === undefined || req.body.description === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'product_name field is mandatory'
        });
        return;
    }

    if (req.body.sale_price <= 0) {
        res.status(400).json({
            status: 'bad-request',
            message: 'sale_price must be greater than 0'
        });
        return;
    }

    if (req.body.product_status === undefined || req.body.product_status === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'product_status field is mandatory'
        });
        return;
    }

    if (req.body.stock_units < 0) {
        res.status(400).json({
            status: 'bad-request',
            message: 'stock_units must not be smaller than 0'
        });
        return;
    }
    
    if  (req.body.release_date === undefined || req.body.release_date === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'release_date is an obliglatory field'
        });
        return;
    }
    if  (req.body.id_supplier === undefined || req.body.id_supplier === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'id_supplier is an obliglatory field'
        });
        return;
    }


    const result = await registerProduct(req.body.product_name, req.body.description,req.body.sale_price,req.body.stock_units,req.body.image,req.body.release_date,req.body.product_status,req.body.id_supplier);
    
    
    res.status(201).json({
        id_product: result.id,
        product_name: req.body.product_name,
        description: req.body.description,
        sale_price: req.body.sale_price,
        stock_units: req.body.stock_units,
        image : req.body.image,
        release_date: req.body.release_date,
        product_status: req.body.product_status,
        id_supplier: req.body.id_supplier
    
    });
});
//Put product
const putProduct = (async (req, res) => {
    
    if (req.body.product_name === undefined || req.body.product_name === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'product_name field is mandatory'
        });
        return;
    }

    if (req.body.description === undefined || req.body.description === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'product_name field is mandatory'
        });
        return;
    }

    if (req.body.sale_price <= 0) {
        res.status(400).json({
            status: 'bad-request',
            message: 'sale_price must be greater than 0'
        });
        return;
    }

    if (req.body.product_status === undefined || req.body.product_status === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'product_status field is mandatory'
        });
        return;
    }

    if (req.body.stock_units < 0) {
        res.status(400).json({
            status: 'bad-request',
            message: 'stock_units must not be smaller than 0'
        });
        return;
    }
    
    if  (req.body.release_date === undefined || req.body.release_date === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'release_date is an obliglatory field'
        });
        return;
    }
    if  (req.body.id_supplier === undefined || req.body.id_supplier === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'id_supplier is an obliglatory field'
        });
        return;
    }

    const modified = await modifyProduct(req.params.id_product,req.body.product_name, req.body.description,req.body.sale_price,req.body.stock_units,req.body.image,req.body.release_date,req.body.product_status,req.body.id_supplier);
    
    if (!modified) {
        res.status(404).json({
            status: 'not-found',
            message: 'product not found'
        });
        return;
    }
    
    res.status(204).json({
        id_product: req.body.id_product,
        product_name: req.body.product_name,
        description: req.body.description,
        sale_price: req.body.sale_price,
        stock_units: req.body.stock_units,
        image : req.body.image,
        release_date: req.body.release_date,
        product_status: req.body.product_status,
        id_supplier: req.body.id_supplier
    
    });
});
// Delete Product
const deleteProduct = (async (req, res) => {
    const productId = parseInt(req.params.id_product);

    if (!Number.isInteger(productId)) {
        res.status(400).json({
            status: 'bad-request',
            message: 'ProductId is not a valid number'
        });
        return;
    }
    
    const removed = await removeProduct(productId);

    if (!removed) {
        res.status(404).json({
            status: 'not-found',
            message: 'product not found'
        });
        return;
    }

    res.status(204).json({});
});

module.exports = {
    getProducts,
    getProduct,
    postProduct,
    putProduct,
    deleteProduct
};
