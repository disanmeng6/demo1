const mongoose=require("mongoose");
 mongoose.connect('mongodb://localhost/dest',{ useNewUrlParser: true, useUnifiedTopology: true })
 
 // const Schema=mongoose.Schema;

 let stu=new mongoose.Schema({
	list:String,
	user:String	
})


 const Stu= mongoose.model("Db",stu);


module.exports=Stu