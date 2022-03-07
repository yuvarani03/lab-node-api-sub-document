const express=require('express');
const ObjectId=require('mongoose').Types.ObjectId;
const router=express.Router();
const {Lesson}=require('../model/Lesson');

//Get lessons details
router.get('/lessons',(req,res)=>{
    Lesson.find((err,docs)=>{
        if(err){
            res.status(500).send({error:"Error occured while fetchinglesson data"})
        }
        else{
        res.send(docs)
        }
    })
})
//Post lessons details
router.post('/lessons',(req,res)=>{
    const newLesson=new Lesson(req.body)
    newLesson.save((err,docs)=>{
        if(err){
            res.status(500).send({error:"Error occured while posting lesson data"})
        }
        else{
        res.send(docs)
        }
    })
})
//get exact lesson details using id
router.get('/lessons/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(404).send({error:"Invalid Id"})
    }
    Lesson.findById(req.params.id,(err,docs)=>{
        if(err){
            res.status(500).send({error:"Error occured while fetching lesson data by using id"})
        }
        else{
        res.send(docs)
        }
    })
})
//Updating a lesson detail
router.put('/lessons/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(404).send({error:"Invalid Id"})
    }
    const updatedLesson=req.body;
    Lesson.findByIdAndUpdate(req.params.id,{$set:updatedLesson},{new:true},(err,docs)=>{
        if(err){
            res.status(500).send({error:"Error while uploading lesson data using id"})
        }
        else{
        res.send(docs)
        }
    })
})
//Deleting the resource
router.delete('/lessons/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(404).send({error:"Invalid Id"})
    }
    Lesson.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(err){
            res.status(500).send({error:"Error while deleting lesson data"})
        }
        else{
        res.send(docs)
        }
    })
})
module.exports={router};