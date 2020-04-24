import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common'

const BASE_URL = "http://localhost:1337/Product/";
const EXPENSE_URL = "http://localhost:1337/Expense/";
var nameRegExp = new RegExp("^[a-zA-Z][a-zA-Z \-']+$")

@Component({
      selector: 'app-root',
      templateUrl: './app.page-a.html',
      styleUrls: ['./app.component.css']
})
export class PageAComponent {
  _productsArray: Array<any>;
  _expenseItems: Array<any> = [];
  _http: HttpClient;
  _errorMessage: String = "";
  _editId: Number = null;
  _singleProductNumber: number = null;
  _singleProductName: string = "";
  _singleProductCategory: string = "";
  _singleProductPrice: number = 0;
  _singleProductQty: number = 0;
  _tax: number = 0.0;
  _subtotal: number = 0.0;
  _finaltotal: number = 0.0;
  _button_name: string = "Add Item";
  _expense_error: string = "";

  // Since we are using a provider above we can receive
  // an instance through a constructor.
  constructor(private http: HttpClient) {
    this._http = http;
    this.getAllProducts();
  }

  getAllProducts() {
    let url = BASE_URL + 'Index'
    this._http.get<any>(url)
    // Get data and wait for result.
      .subscribe(result => {
          this._productsArray = result.products;
        },

        error => {
          // Let user know about the error.
          this._errorMessage = error;
        })
  }

  getProduct(id) {
    let url = BASE_URL + 'Detail?_id=' + id;

    this._http.get<any>(url)
    // Get data and wait for result.
      .subscribe(result => {
          this._singleProductName = result.product.productName;
          this._singleProductNumber = result.product._id;
          this._singleProductPrice = result.product.price;
          this._singleProductQty = null;
        },

        error => {
          // Let user know about the error.
          this._errorMessage = error;
        })
  }

  sum() {
    this._subtotal = 0;
    this._tax = 0;
    this._finaltotal = 0;
    this._expenseItems.forEach(item => {
      this._subtotal += item.price * item.qty;
    });
    this._tax = 0.12*this._subtotal;
    this._finaltotal = this._subtotal + this._tax;
  }

  addItem() {
    if (this.addItemValidator()) {
      if (this.isDuplicated(this._singleProductName)) {
        this.updateItem(this._singleProductName,this._singleProductQty)
      } else {
        let newItem = { 
          'name':this._singleProductName,
          'price':this._singleProductPrice,
          'category': this._singleProductCategory,
          'qty':this._singleProductQty
        }
        this._expenseItems.push(newItem);
        this._button_name = "Add Item";
      }
      this.sum();
    }
  }

  removeItem(name) {
    for (var i=0; i<this._expenseItems.length; i++) {
      if (this._expenseItems[i].name == name) {
        this._expenseItems.splice(i,1);
      } 
    }
    this.sum();
  }

  isDuplicated(name) {
    for (var i=0; i<this._expenseItems.length; i++){
      if (this._expenseItems[i].name == name) {
        return true;
      }
    }
    return false;
  }

  updateItem(name,qty) {
    this._expenseItems.forEach(item => {
      if (item.name == name) {
        item.qty = qty;
      }
    });
  }

  submitExpense() {
    if(this._expenseItems.length > 0) {
      var r=confirm("Submit the expense ?");
      if(!r){
          return;
      }
      // This free online service receives post submissions.
      this.http.post(EXPENSE_URL + "AddExpense",
          {
              date:   new Date().toDateString(),
              amount: this._finaltotal,
              items: this._expenseItems
          })
      .subscribe(
          // Data is received from the post request.
          (data) => {
              // Inspect the data to know how to parse it.
              console.log("POST call successful. Inspect response.", 
                          JSON.stringify(data));
              if (data["errorMessage"] == "") {
                confirm("Expense Submited");
                this.clearAll();
              } else {
                this._errorMessage = data["errorMessage"];
              }              
          },
          // An error occurred. Data is not received. 
          error => {
              this._errorMessage = error;                
          });
    } else {
      this._errorMessage = "Your shopping cart is empty!"
    }
  }

  addItemValidator() {
    if(this._singleProductName != "" 
        && this.qty_validator(this._singleProductQty) 
          && this.price_validator(this._singleProductPrice)) {
      this._expense_error = "";
      return true;
    } else {
      this._expense_error = "Add item failed, pls check your input!";
      return false;
    }
  }

  qty_validator(qty) {
    if (qty != null && qty != "" && qty > 0) {
      return true;
    } else {
      this._expense_error = "qty is invalid";
    }
  }

  price_validator(price) {
    if (price != null && price != "" && price > 0) {
      return true;
    } else {
      this._expense_error = "Unit price is invalid";
    }
  }

  clearAll() {
    this._expenseItems = [];
    this._singleProductQty = null;
    this._errorMessage = "";
    this._editId = null;
    this._singleProductNumber = null;
    this._singleProductName = "";
    this._singleProductCategory = "";
    this._singleProductPrice = 0;
    this._singleProductQty = 0;
    this._tax = 0.0;
    this._subtotal = 0.0;
    this._finaltotal = 0.0;
    this._button_name = "Add Item";
    this._expense_error = "";
  }
}
