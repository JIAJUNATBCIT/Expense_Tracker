import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BASE_URL = "http://localhost:1337/Expense/";

@Component({
    selector: 'app-root',
    templateUrl: './app.page-b.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class PageBComponent {

    constructor(private http: HttpClient) {
        this._http = http;
        this.getAllExpenses();
    }

    _expensesArray: Array<any>;
    _http:HttpClient;
    _errorMessage:String = "";

    getAllExpenses() {
        let url = BASE_URL + 'Index'
        this._http.get<any>(url)
            // Get data and wait for result.
            .subscribe(result => {
                this._expensesArray = result.expenses;
            }, 
  
            error =>{
              // Let user know about the error.
                this._errorMessage = error;
            })
    }

    checkExpense(_items) {
        var table_content = "";
        _items.forEach(item => {
            table_content +=
            "<tr><td>" + item.name + "</td><td>"+ item.category + "</td><td>"+item.qty+"</td>"+
            "<td>$"+item.price+"</td></tr>"
        });
        document.getElementById("detail_table").innerHTML = "<label class='my_header'>Expense Details:</label><br/>"+
        "<table><tr><td class='my_header_2'>Product</td><td class='my_header_2'>Category</td><td class='my_header_2'>QTY</td><td class='my_header_2'>Total</td><td></td></tr>" 
        + table_content + "</table>"
    }
    
    deleteExpense(_id) {

        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }), 
          "body": { _id:_id}
        };
      
        let url = BASE_URL + "Delete"
        this.http.delete(  url , httpOptions) 
        .subscribe(
            // Data is received from the post request.
            (data) => {
                this._errorMessage = data["errorMessage"];
                this.getAllExpenses(); 
                document.getElementById("detail_table").innerHTML = "";
            },
            // An error occurred. Data is not received. 
            error  => {
              this._errorMessage = error; 
            });
      }
}
