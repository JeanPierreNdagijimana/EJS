const express = require('express');
const router = express.Router();
const members = require ('../../Members');
const uuid = require('uuid');

//create a route to get single member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));//some functions acts like boolean
    if (found)
            res.json(members.filter(member => member.id === parseInt(req.params.id)));
    else
            res.status(400).json({ msg: `No member with id of ${req.params.id}`});
});

//create a route to get all members
router.get('/', (req, res) => res.json(members));

//create member
router.post('/', (req, res) => {
    const newMember = {
        id:uuid.v4(),
        name: req.body.name,
        status: 'active'
    }

    if(!newMember.name){
        return res.status(400).json({ msg: 'Please provide the name'});
    }
    members.push(newMember);
    // res.json(members);
    res.redirect('/');
});

//update a member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));//some functions acts like boolean
    if (found){
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updMember.name ? updMember.name : member.name;

                res.json({ msg: 'Member was updated', member });
            }
        })
    }
            
    else{
        res.status(400).json({ msg: `No member with id of ${req.params.id}`});
    }
});

//delete a member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));//some functions acts like boolean
    if (found){
        res.json( { msg: 'Member deleted', members:members.filter(member => member.id !== parseInt(req.params.id))});
    }
            
    else{
        res.status(400).json({ msg: `No member with id of ${req.params.id}`});   
    }
});

module.exports = router;