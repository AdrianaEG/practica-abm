const groupsModel = require('../database/groupsModel');

module.exports = {
    index: (req, res) => {
        // Me traigo todos los grupos
        //Microdesafío
        //1. Leer archivo JSON 
        //2. convertir a formato JavaScript 
        //3. Enviar los grupos a la vista
        let groups = groupsModel.readFile();
        
        res.render('groups/index',  {groups});
    },
    create: (req, res) => {
        res.render('groups/create');
    },
    store: (req, res) => {
        //Microdesafío
        // 1. creo el grupo con los datos del formulario
        // 2. Leer todos los grupos
        // 3. agrego el nuevo grupo a los existentes
        // 4. guardado el nuevo listado en el archivo JSON

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

        //Busco el grupo
        //Microdesafío
        //1. Leer todos los grupos
        //2. Obtener aquel que tiene el mismo id de la ruta
        //3. Enviarlo a la vista
        //let groups = readFile();

        let group = groupsModel.find(req.params.id)

        res.render('groups/detail', {group});
    },
    destroy: (req, res) => {

        // Traigo todos los grupos
        
        // Elimino el grupo

        // Guardado el nuevo listado en el archivo JSON

        res.redirect('/groups')
    },
    search: (req, res) => {
        // Traigo todos los grupos

        // Filtro los grupos

        // Envío los grupos y lo que busco el usuario a la vista

        res.render('groups/search', {});
    },
}