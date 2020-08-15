const groupsModel = require('../database/groupsModel');
//const { delete } = require('../database/groupsModel');
const fs = require('fs');
const path = require('path');

module.exports = {
    index: (req, res) => {
        let groups = groupsModel.readFile();
        res.render('groups/index',  {groups});
    },
    create: (req, res) => {
        res.render('groups/create');
    },
    store: (req, res) => {
        
        let newGroup = req.body;

        console.log(req.file);
        newGroup.image = 'default.jpg';
        if(req.file){
            newGroup.image = req.file.filename;
        }
        else if(req.body.oldImage){
            newGroup.image = req.file.filename;
        }
        delete newGroup.oldImage;
        
        /*{
            name : req.body.name,
            description: req.body.description,
            repository: req.body.repository,
            image: null
        }*/
        let groupId = groupsModel.create(newGroup);
        res.redirect('/groups/' + groupId);//Me lleva al detalle del grupo recién creado.
    },
    edit: (req, res) => {
        let group = groupsModel.find(req.params.id)
        res.render('groups/edit', {group});
    },
    update: (req, res) => {
        let group = req.body;
        group.id = req.params.id;
        //group.image = 'default.jpg';
        if(req.file){
            group.image = req.file.filename;
        }
        else if(req.body.oldImage){
            group.image = req.body.oldImage;
        }
        delete group.oldImage;
        /*{
            id : req.params.id,
            name: req.body.name,
            description: req.body.description,
            repository: req.body.repository,
            image: null
        }*/
        let groupId = groupsModel.update(group);
        
        res.redirect('/groups/' + groupId);//Me lleva al detalle del grupo recién editado.
    },
    show: (req, res) => {

        let group = groupsModel.find(req.params.id)
        res.render('groups/detail', {group});
    },
    destroy: (req, res) => {
        let group = groupsModel.find(req.params.id);
        groupsModel.delete(req.params.id);
        /*Borrar imagen*/
        let imagenPath = path.join(__dirname, '../public/img/groups/' + group.image);
        if(fs.existsSync(imagenPath)){
            fs.unlinkSync(imagenPath);
        }
        res.redirect('/groups')
    },
    search: (req, res) => {
        let search = req.query.search;
        let groups = groupsModel.findByField(search);
        console.log(groups);
        res.render('groups/search', {search, groups});
    },
}
