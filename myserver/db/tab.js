const mongoose=require("mongoose");
 mongoose.connect('mongodb://localhost/dest');
  let tab=new mongoose.Schema({
	firstName:String,
	age:Number,
	race:String
});
   const Tab= mongoose.model("tab",tab);
 // const Table=new Tab({
 //                  firstName: '熊大',
 //                  age: 32,
 //                  race: '狗熊',
 // })
 // Table.save(); //在数据库里面创建的时候插入一条数据，现在就不需要了
 module.exports=Tab