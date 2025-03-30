const { findProducts, findProduct, registerProduct, modifyProduct, removeProduct } = require("../service/products");
//ESTA CAPA SE PODRIA DENOMINAR COMO LA DE FUNCIONES DE ALTO NIVEL, Y LA
//SERVICE LAS DE BAJO NIVEL, DE COMUNICACIONES CON LA BD
// va a ver una funcion por ruta, es decir se hace primero las routes, despues desde
//aqui se llama a las funciones y en el service esta la logica de todo


const getProducts = (async (req, res) => {
    // ESTA FUNCION VA A LLAMAR A OTRA QUE ESTA EN SERVICE,
    //QUE VA A TENER UN METODO POR CADA OPERACION QUE HAYA QUE HACER A MAS BAJO NIVEL
    //DE CAPA
    const ProductList = await findProducts();

    res.status(200).json(ProductList);
});

const getProduct = (async (req, res) => {
    const product = await findProduct(req.params.id_product);

    if (product === undefined) {
        res.status(404).json({
            status: 'not-found',
            message: 'Product not found'
        });
        return;
    }

    res.status(200).json(product);
});

const postProduct = (async (req, res) => {
    //Aqui realizamos las validaciones
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
        // id: req.body.id_product,
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

const putProduct = (async (req, res) => {
    await modifyProduct(req.params.id_product,req.body.product_name, req.body.description,req.body.sale_price,req.body.stock_units,req.body.image,req.body.release_date,req.body.product_status,req.body.id_supplier);

    res.status(204).json({});
});

const deleteProduct = (async (req, res) => {
    // TODO este va bien???
    
    await removeProduct(req.params.id_product);
    
    res.status(204).json({})
});

module.exports = {
    getProducts,
    getProduct,
    postProduct,
    putProduct,
    deleteProduct
};

//las vamos a exportar..., porque..¿quien lo va a necesitar??? ==> el route