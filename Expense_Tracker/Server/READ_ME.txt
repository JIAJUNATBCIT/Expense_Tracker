To build this application run the following script in Mongo inside a database
called retailerDB.



db.products.insert(
    [
        { _id:1, productName:'Cake Mix', price:2.99 },
        { _id:2, productName:'Cookie Dough', price:1.25 },
        { _id:3, productName:'Orange Juice', price:4.25},
        { _id:4, productName:'Cookie Dough', price:1.45 },
        { _id:5, productName:'Carrots', price:1.01 },
    ]
)
