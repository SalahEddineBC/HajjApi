const express=require('express');
const {User}=require('../models/');
const restify=require('express-restify-mongoose');
const router=express.Router();
restify.serve(router, User);
module.exports=router
