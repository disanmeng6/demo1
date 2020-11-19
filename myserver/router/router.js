
const express=require("express");
const Db=require("./../db/userdb.js");
const Tab=require("./../db/tab.js");
const router=express.Router();
module.exports=router;
router.post("/user/list",function(req,res){
	// console.log(Db)
	// console.log( Db.find().pretty())
	Db.find({},function(err,data){
		// console.log(data)
	res.json({
		data:data,
		status:200
	})
	})


})

router.get("/user/tab",function(req,res){
	Tab.find({},function(err,data){
	res.json({
		data:data,
		status:200
	})
	})


})

router.post("/user/add",function(req,res){
		new Tab(req.body).save((err,data)=>{
			if(err){
				return	res.json({
					data:添加失败,
					status:400
				})
			}
			res.json({
					data:'添加成功',
					status:200
				})
		})
})
router.post("/user/remuser",function(req,res){
		console.log(req.body.id)
		Tab.find({
			_id:req.body.id
		},(err,data)=>{
			if(err){
				return 			res.json({
					data:'用户不存在',
					status:400
				})
			}
			Tab.remove({
				_id:req.body.id
			},(err,data)=>{
					if(err){
						return 	res.json({
					data:'删除失败',
					status:400
			})
					}
						res.json({
					data:'删除成功',
					status:200
			})
			})
		})
})
router.post("/user/correct",function(req,res){
	console.log(req.body)
 	Tab.findOne({
 		id:req.body.id
 	},function(err,data){
 		if(err){
 			return res.json({
					data:'修改失败，id不存在',
					status:400
			})
 		}
	 	console.log(data)
	 	Tab.updateOne(data, req.body, function(err, data) {
        if (err){
        	return res.json({
					data:'修改失败',
					status:500
			})
        };
              	res.json({
					data:'修改成功',
					status:200
    });
    });
 	})

})