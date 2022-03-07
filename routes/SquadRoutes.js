const express=require('express');
const ObjectId=require('mongoose').Types.ObjectId;
const router=express.Router();
const {Squad}=require('../model/Squad');
const {Lesson}=require('../model/Lesson');

//Get squad details
router.get('/squads',(req,res)=>{
    Squad.find((err,docs)=>{
        if(err){
            res.status(500).send({error:"Error occured while fetching squad data"})
        }
        else{
            res.send(docs)
        }
    })
})
//Post squad details
router.post('/squads',(req,res)=>{
    const newSquad=new Squad(req.body)
    newSquad.save((err,docs)=>{
        if(err){
            res.status(500).send({error:"Error while posting Squad data"})
        }
        else{
        res.send(docs)
        }
    })
})
//Getting exact squad details by using id
router.get('/squads/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(404).send({error:"Invalid Id"})
    }
    Squad.findById(req.params.id,(err,docs)=>{
        if(err){
            res.status(500).send({error:"Error occured while fetching squad data using id"})
        }
        else{
        res.send(docs)
        }
    })
})
//Updating a squad detail
router.put('/squads/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(404).send({error:"Invalid Id"})
    }
    const updatedSquad=req.body;
    Squad.findByIdAndUpdate(req.params.id,{$set:updatedSquad},{new:true},(err,docs)=>{
        if(err){
            res.status(500).send({error:"Error occured while updating squad data using id"})
        }
        else{
        res.send(docs)
        }
    })
})
//Deleting the resource
router.delete('/squads/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(404).send({error:"Invalid Id"})
    }
    Squad.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(err){
            res.status(500).send({error:"Error occured while deleting squad data"})
        }
        else{
        res.send(docs)
        }
    })
})
//posting lesson document in squad document
router.post('/map/:id/:name',(req,res)=>{
    let newLesson,newSquad;
    Lesson.findById(req.params.id,(err,docs)=>{
        if(err){
            res.status(500).send({error:"Error"})
        }
        newLesson=new Lesson(docs)
    })
    Squad.findOne({name:req.params.name},(err,docs)=>{
        newSquad=new Squad(docs);
        newSquad.lessonId.push(newLesson)
        newSquad.save((err,docs)=>{
            if(err){
                res.status(500).send({error:"Error"})
            }
            else{
            res.send(docs)
            }
        })
    })
})
//populate() to get view nested documents
router.get('/view',(req,res)=>{
    Squad.find({}).populate('lessonId').exec((err,docs)=>{
        if(err){
            res.status(500).send({error:"Error"})
        }
        else{
        res.send(docs)
        }
    })
})
module.exports={router};