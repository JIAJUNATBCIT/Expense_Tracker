const ProductRepo   = require('../Data/ProductRepo');
const _productRepo  = new ProductRepo();
const Product       = require('../Models/Product');


// This is the default page for domain.com/product/index.
// It shows a listing of products if any exist.
exports.Index = async function(request, response){
    let products = await _productRepo.allProducts();
    if(products!= null) {
        // response.render('Product/Index', { products:products })
        response.json({products:products});
    }
    else {
        // response.render('Product/Index', { products:[] })
        response.json({products:[]});
    }
};

// Shows one single object at a time. 
exports.Detail = async function(request, response) {
    // request.query used to get url parameter.
    let productID  = request.query._id; 
    
    let productObj = await _productRepo.getProduct(productID);
    // response.render('Product/Detail', { product:productObj });
    response.json({ product:productObj});
};

// GET request calls here to display 'Product' create form.
exports.Create = async function(request, response) {
    // response.render('Product/Create', { errorMessage:"", product:{} });
    response.json({ errorMessage:"", product:{} });
};

// Receives POST data and tries to save it.
exports.CreateProduct = async function(request, response) {

    // Package object up nicely using content from 'body'
    // of the POST request.
    let tempProductObj  = new Product( {
        "_id":request.body._id,
        "productName":    request.body.productName,
    });

    // Call Repo to save 'Product' object.
    let responseObject = await _productRepo.create(tempProductObj);

    // No errors so save is successful.
    if(responseObject.errorMessage == "") {
        console.log('Saved without errors.');
        console.log(JSON.stringify(responseObject.obj));
        // response.render('Product/Detail', { product:responseObject.obj, 
        //                                     errorMessage:""});
        response.json({ product:responseObject.obj, errorMessage:""});
    }
    // There are errors. Show form the again with an error message.
    else {
        console.log("An error occured. Item not created.");
        /*
        response.render('Product/Create', {
                        product:responseObject.obj,
                        errorMessage:responseObject.errorMessage}); */
        response.json({ product:responseObject.obj,
                        errorMessage:responseObject.errorMessage});
    }
};

// Displays 'edit' form and is accessed with get request.
exports.Edit = async function(request, response) {
    let productID  = request.query._id;
    console.log(productID);
    let productObj = await _productRepo.getProduct(productID);   

    // response.render('Product/Edit', {product:productObj, errorMessage:""});
    response.json({product:productObj, errorMessage:""});
};

// Receives posted data that is used to update the item.
exports.Update = async function(request, response) {
    let productID = request.body._id;
    console.log("The posted product id is: " + productID);

    // Parcel up data in a 'Product' object.
    let tempProductObj  = new Product( {
        _id: productID,
        productName:    request.body.productName,
        qty: request.body.qty,
    });

    // Call update() function in repository with the object.
    let responseObject = await _productRepo.update(tempProductObj);

    // Update was successful. Show detail page with updated object.
    if(responseObject.errorMessage == "") {
        /* response.render('Product/Detail', { product:responseObject.obj, 
                                               errorMessage:"" }); */
        response.json({ product:responseObject.obj, errorMessage:"" });
    }

    // Update not successful. Show edit form again.
    else {
        /*
        response.render('Product/Edit', { 
            product:      responseObject.obj, 
            errorMessage: responseObject.errorMessage }); */
        response.json({ product:      responseObject.obj, 
                        errorMessage: responseObject.errorMessage });
    }
};

// This function receives an id when it is posted. 
// It then performs the delete and shows the product listing after.
// A nicer (future) version could take you to a page to confirm the deletion first.
exports.Delete = async function(request, response) {
    let id           = request.body._id;
    let deletedItem  = await _productRepo.delete(id);

    // Some debug data to ensure the item is deleted.
    console.log(JSON.stringify(deletedItem));
    let products     = await _productRepo.allProducts();
    // response.render('Product/Index', {products:products});
   // res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    response.json({products:products});
};

