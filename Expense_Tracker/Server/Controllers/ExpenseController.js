const ExpenseRepo   = require('../Data/ExpenseRepo');
const _expenseRepo  = new ExpenseRepo();
const Expense       = require('../Models/Expense');

// This is the default page for domain.com/product/index.
// It shows a listing of products if any exist.
exports.Index = async function(request, response){
    let expenses = await _expenseRepo.allExpenses();
    if(expenses!= null) {
        response.json({expenses:expenses});
    }
    else {
        response.json({expenses:[]});
    }
};

// Receives POST data and tries to save it.
exports.AddExpense = async function(request, response) {

    // Package object up nicely using content from 'body'
    // of the POST request.
    let tempExpenseObj  = new Expense( {
        "date":request.body.date,
        "amount": request.body.amount,
        "items": request.body.items
    });

    // Call Repo to save 'Expense' object.
    let responseObject = await _expenseRepo.create(tempExpenseObj);

    // No errors so save is successful.
    if(responseObject.errorMessage == "") {
        console.log('Saved without errors.');
        console.log(JSON.stringify(responseObject.obj));
        response.json({ expense:responseObject.obj, errorMessage:""});
    }
    // There are errors. Show form the again with an error message.
    else {
        console.log("An error occured. Expense not created.");
        response.json({ expense:responseObject.obj,
            errorMessage:responseObject.errorMessage});
    }
};


// This function receives an id when it is posted.
// It then performs the delete and shows the product listing after.
// A nicer (future) version could take you to a page to confirm the deletion first.
exports.Delete = async function(request, response) {
    let id           = request.body._id;
    let deletedItem  = await _expenseRepo.delete(id);

    // Some debug data to ensure the item is deleted.
    console.log(JSON.stringify(deletedItem));
    let expenses     = await _expenseRepo.allExpenses();
    response.json({expenses:expenses});
};

