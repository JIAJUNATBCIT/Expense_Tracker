var mongoose         = require('mongoose');

var productSchema    = mongoose.Schema({
        // The _id property serves as the primary key. If you don't include it
        // the it is added automatically. However, you can add it in if you
        // want to manually include it when creating an object.

        // _id property is created by default when data is inserted.
        _id:            {"type" : Number, min:0, max:1000000},
        productName:    {"type" : "String", required: true},
        productCategory: {"type" : "String", required: true},
        productPrice: {"type" : "number", min:0},
        qty: {"type" : Number, min:0, max:1000000},
    }, 
    {   // Include this to eliminate the __v attribute which otherwise gets added
        // by default.
        versionKey: false 
    });
var Product    = mongoose.model('Product', productSchema);
module.exports = Product;
