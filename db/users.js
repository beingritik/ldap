const mongoose = require("mongoose");
var url ="mongodb://127.0.0.1:27017";
const userSchema = new mongoose.Schema({

    userName:{

      type:String

    },
    userGroup:{

        type:String

    }

})

 



module.exports =mongoose.model("users", userSchema);
// mongoose.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
  
// });