const express =require('express');
const path=require('path');
const morgan =require('morgan');
const Router =require('./router/router.js');
const app=express();
app.use(morgan('dev'));
app.use(express.urlencoded({extends:true}));
app.use(express.json());
app.use("/api",Router);
app.use(express.static(path.join(__dirname, 'public')));
app.listen(8080,()=>{
	console. log("http://localhost:8080")
})