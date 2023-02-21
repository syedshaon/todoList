const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
// const date = require(__dirname + "/date.js");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');


const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(pw);
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}



// const itemSchema = new mongoose.Schema({
//     name: String
// })

  const listSchema = new mongoose.Schema({
        name: String
    })

const item = mongoose.model("item", listSchema);

const item1 = new item({
    name: "Eat Food"
});

const item2 = new item({
    name: "Sleep 1 hour"
});

const item3 = new item({
    name: "Run 20 minutes"
});









app.get("/:paramName", function (req, res) {
    const newListName = req.params.paramName;
  

    // console.log(newListName);

    if (newListName !== "favicon.ico") {

            const list = mongoose.model(newListName, listSchema);
     
            list.find(function (err, lists) {
                if(err){
                    // console.log(err);
                    console.log(`No collection exist with ${newListName} name. Creating a new collection.`);
                }else{
                    // let todo = lists;
                    // return todo;
                    
                    
                    if (lists.length === 0) {

                        list.insertMany([item1, item2, item3], function (err) {
                            if(err){
                                console.log(err);
                            }else{
                                console.log("Successfully saved all tasks to todoList DB");
                            }
                        })
                       return  res.redirect(`/${newListName}`); 
                    }

                   
                    res.render("list", {listTitle: newListName+" List", newListItems: lists, targetURL: "/"+newListName});
                  
                    
                }
            })
        
    }

        
        
    

    
  

})

app.post("/:paramName", function (req, res) {

     const newListName = req.params.paramName;

    

     if (newListName !== "itemdelete") {      
        
        const list = mongoose.model(newListName, listSchema);
        
        const newItem = new list({
                name: req.body.todo
            });

            newItem.save();
    
        res.redirect(`/${newListName}`); 
    }else{
         const itemsToDelete = req.body.checkbox; 
    
        item.deleteOne({_id: itemsToDelete},  function (err) {
            if (err) {
                console.log(err);
            }else{
                console.log("Deleted successfully");
            }
         })
    
        res.redirect(`/`);
    }

})

app.post("/itemdelete/:paramName", function (req, res) {
      const newListName = req.params.paramName;
        const list = mongoose.model(newListName, listSchema);

    const itemsToDelete = req.body.checkbox; 
    
        list.deleteOne({_id: itemsToDelete},  function (err) {
        if (err) {
            console.log(err);
        }else{
            console.log("Deleted successfully");
        }
    })
     res.redirect(`/${newListName}`); 
})



// let day =   date.getDate();
app.get("/", function (req, res) {
 

        item.find(function (err, items) {
        if(err){
            console.log(err);
        }else{
            // let todo = items;
            // return todo;
            
            
            if (items.length === 0) {

                item.insertMany([item1, item2, item3], function (err) {
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Successfully saved all tasks to todoList DB");
                    }
                })
                return  res.redirect(`/`); 
            }

            res.render("list", {listTitle: "Today", newListItems: items, targetURL: "/"});
        }
    })
    
})


app.post("/", function (req, res) {

    // console.log(req.body);

    // if (req.body.list === "work") {
    //     workItems.push(req.body.todo);
    //     res.redirect("/work"); 
    // }else{
         
    //     const newItem = new item({
    //         name: req.body.todo
    //     });

    //     newItem.save();
   
    //  res.redirect("/"); 
    // }   
    
     const newItem = new item({
            name: req.body.todo
        });

        newItem.save(function (err, success) {
            if (err) {
               console.log(err); 
            }else{
                res.redirect("/"); 
            }
        });
   
     

})

//  put the following part in app.post("/:paramName"

// app.post("/itemdelete", function (req, res) {
//     const itemsToDelete = req.body.checkbox; 
    
//         item.deleteOne({_id: itemsToDelete},  function (err) {
//         if (err) {
//             console.log(err);
//         }else{
//             console.log("Deleted successfully");
//         }
//     })
//      res.redirect('back');
// })





app.listen(port, function () {
    console.log("Server started.")
})



