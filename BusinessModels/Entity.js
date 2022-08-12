const { v4 } = require("uuid");

class Entity {

    constructor(){
        
    }

    createId (){
        this.id = v4()
    }


}