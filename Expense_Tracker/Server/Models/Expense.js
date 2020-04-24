var mongoose = require('mongoose');

var expenseSchema    = mongoose.Schema({
        // The _id property serves as the primary key. If you don't include it
        // the it is added automatically. However, you can add it in if you
        // want to manually include it when creating an object.

        // _id property is created by default when data is inserted.
        date:    {
            "type" : "string",
            required: [true, 'required']
        },
        amount: {"type" : "number", min:0},
        items: {type : Array , "default" : []},
    },
    {   // Include this to eliminate the __v attribute which otherwise gets added
        // by default.
        versionKey: false
    });
var Expense    = mongoose.model('Expense', expenseSchema);
module.exports = Expense;