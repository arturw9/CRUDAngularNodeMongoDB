const express = require('express');
const router = express.Router();

const mongoTypes = require('mongoose').Types;
const Post = require('../backend/Models/Post.js');

//Obter todos
router.get('/',(req,res)=>{
    Post.find((err, doc) => {
        if(err) {
            console.log('Error occures while fetching data.'+ err);
            res.status(400).send('Internal error', err);
        } else {
            res.send(doc);
        }
    })
})

//criar um novo
router.post('/',(req,res)=> {
    let post = new Post({
        title: req.body.title,
        content: req.body.content,
        username: req.body.username
    })

    post.save((err,doc)=>{
        if(err){
            console.log('Internal error :', err);
            res.status(400).send('Internal Error:'+err);
        }else{
            res.send(doc);
        }
    })
})

//Obter pelo id
router.get('/:id',(req,res)=>{
    if(mongoTypes.ObjectId.isValid(req.params.id)){
        Post.findById(req.params.id, (err,doc) => {
            if(err){
                console.log('Internal error', err);
                res.status(400).send('Internal error', err);
            } else {
                res.send(doc);
            }
        })
    }else{
        res.status(400).send('No record found with id :', id);
    }
})

//Deletar pelo id
router.delete('/:id',(req,res)=>{
    if(mongoTypes.ObjectId.isValid(req.params.id)){
        Post.findByIdAndRemove(req.params.id, (err,doc) => {
            if(err){
                console.log('Internal error', err);
                res.status(400).send('Internal error', err);
            } else {
                res.send(doc);
            }
        })
    }else{
        res.status(400).send('No record found with id :', id);
    }
})

//Atualizar pelo id
router.put('/:id',(req,res)=>{

    let post = {
        title: req.body.title,
        content: req.body.content,
        username: req.body.username
    }
    if(mongoTypes.ObjectId.isValid(req.params.id)){
        Post.findByIdAndUpdate(req.params.id,{$set : post},{new : true}, (err,doc) => {
            if(err){
                console.log('Internal error', err);
                res.status(400).send('Internal error', err);
            } else {
                res.send(doc);
            }
        })
    }else{
        res.status(400).send('No record found with id :', id);
    }
})

module.exports = router;