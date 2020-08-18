//Validador de grupo
const {check} = require('express-validator');//destructuración => Agarrá express-validator y buscá la propiedad check y crea const check = require('express-validator').check

module.exports = {
    createForm: [
        check('name')
            .notEmpty().withMessage('Debes completar el campo de nombre').bail()//si esto no se completó no sigo validando
            .isLength({min:5}).withMessage('El nombre debe tener al menos 5 caracteres'),//Quiero que este campo no esté vacío.
        check('repository')
            .notEmpty().withMessage('Debes completar con un repo').bail()
            .custom(value=>value.startsWith('https://github.com/')).withMessage('Debe ser una url de Github'),
        check('description')
            .notEmpty().withMessage('Debes completar el campo descripción').bail()
            .isLength({min:50}).withMessage('Debe tener 50 caracateres'),//Quiero que este campo no esté vacío.
    ],
    search: [
        check('search')
            .notEmpty().withMessage('Debes completar el campo de búsqueda').bail()//si esto no se completó no sigo validando
            .isLength({min:3}).withMessage('El nombre debe tener al menos 3 caracteres'),//Quiero que este campo no esté vacío.
    ]
}