const Expense = require('../Models/Expense');

class ExpenseRepo {

    // This is the constructor.
    ExpenseRepo() {
    }

    // Gets all products.
    async allExpenses() {
        let expenses = await Expense.find().exec();
        return expenses;
    }

    // Create new expense
    async create(expenseObj) {
        try {
            // Checks if model conforms to validation rules that we set in Mongoose.
            var error = await expenseObj.validateSync();

            // The model is invalid. Return the object and error message.
            if(error) {
                let response = {
                    obj: expenseObj,
                    errorMessage: error.message };

                return response; // Exit if the model is invalid.
            }

            // Model is not invalid so save it.
            const result = await expenseObj.save();

            // Success! Return the model and no error message needed.
            let response = {
                obj: result,
                errorMessage: "" };

            return response;
        }
            //  Error occurred during the save(). Return orginal model and error message.
        catch (err) {
            let response = {
                obj: expenseObj,
                errorMessage: err.message };

            return response;
        }
    }

    async delete(id) {
        console.log("Id to be deleted is: " + id);
        let deletedItem =  await Expense.find({_id:id}).deleteOne().exec();
        console.log(deletedItem);
        return deletedItem;
    }

}


module.exports = ExpenseRepo;
