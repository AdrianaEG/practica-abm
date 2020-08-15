const groupsModel = require('../database/groupsModel');

module.exports = {
    index: (req, res) => {
        let groups = groupsModel.readFile();
        res.render('groups/index',  {groups});
    },
    create: (req, res) => {
        res.render('groups/create');
    },
    store: (req, res) => {
        let newGroup = {
            name : req.body.name,
            description: req.body.description,
            repository: req.body.repository,
            image: null
        }
        let groupId = groupsModel.create(newGroup);
        res.redirect('/groups/' + groupId);//Me lleva al detalle del grupo recién creado.
    },
    edit: (req, res) => {
        let group = groupsModel.find(req.params.id)
        res.render('groups/edit', {group});
    },
    update: (req, res) => {
        let group = {
            id : req.params.id,
            name: req.body.name,
            description: req.body.description,
            repository: req.body.repository,
            image: null
        }
        let groupId = groupsModel.update(group);
        
        res.redirect('/groups/' + groupId);//Me lleva al detalle del grupo recién editado.
    },
    show: (req, res) => {

        let group = groupsModel.find(req.params.id)
        res.render('groups/detail', {group});
    },
    destroy: (req, res) => {
        groupsModel.delete(req.params.id);
        res.redirect('/groups')
    },
    search: (req, res) => {
        let search = req.query.search;
        let groups = groupsModel.findByField(search);
        console.log(groups);
        res.render('groups/search', {search, groups});
    },
}
