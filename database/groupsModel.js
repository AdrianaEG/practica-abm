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
    findByField(value){
        console.log(value);
        let rows = this.readFile();
        let rowsSearch = rows.filter(row =>{
            return row.name.includes(value);
        });
        console.log(rowsSearch)
        return rowsSearch;

    },
    create(row){
        let rows = this.readFile();
        row.id = this.nextId();
        rows.push(row);
        this.writeFile(rows);
        return row.id;
    },
    update(row){
        
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
       
        return row.id;
    },
    delete(id){
        
        /*let rows = this.readFile();
        rows.splice((id-1), (1));//Elimino el elemento del array
        let aux = 1;//Les reasigno un id
        rows.forEach(row => {
            row.id = aux;
            aux++;
        });
        this.writeFile(rows);//Reescribo el json*/
        let rows = this.readFile();
        let updateRows = rows.filter(oneRow=>{
            return oneRow.id != id;
        });
        this.writeFile(updateRows);
    }
}

module.exports = groupsModel;