const fs = require('fs');
const path = require('path');

let groupsModel = {
    tablePath: path.join(__dirname, '../data/groups.json'),
    readFile (){
        let fileContents = fs.readFileSync(this.tablePath, 'utf-8');
        if(fileContents){
            return JSON.parse(fileContents);
        }
        else{
            return [];
        }
    },
    writeFile (contents){
        let fileContents = JSON.stringify(contents, null, ' ');
            fs.writeFileSync(this.tablePath, fileContents);
    },
    nextId(){
        let rows = this.readFile();
        let lastRow = rows.pop();

        if(lastRow){
            return ++lastRow.id;
        }
        else{
            return 1;
        }
    },
    all(){
        return this.readFile();
    },
    find(id){
        let rows = this.readFile();
        return rows.find(row=> row.id == id);
    },
    findByField(field, value){//campo valor... Buscador que se utiliza en el search
        //Microdesafío
        //1. Leer el archivo
        //2. Buscar por campo y valor
        //3. Retornar los resultados
    },
    create(row){//row serían los datos
        //Microdesafío
        //1. Leer el archivo
        //2. Generar un nuevo id
        //3. Agregar el registro 
        //4. Guardar los cambios
        let rows = this.readFile();
        row.id = this.nextId();
        rows.push(row);
        this.writeFile(rows);

        return row.id;
    },
    update(row){
        //Microdesafío
        //1. Leer el archivo 
        //2. Modificar el registro en cuestión
        //3. Guardar los cambios
        //4 . devolver el id modificado
        let rows = this.readFile();
        let updateRows = rows.map(oneRow=>{
            if(oneRow.id == row.id){
                return row;
            }
            else{
                return oneRow;
            }
        })

        this.writeFile(updateRows);
        console.log(row.id)
        return row.id;
    },
    delete(id){
        //Microdesafío
        //1. Leer el archivo
        //2. Filtrar el registro en cuestión
        //3. Guardar los cambios
    }
}

module.exports = groupsModel;