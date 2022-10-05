function Component(id:number){
    console.log('init');
    return (target:Function)=>{
        console.log('run');
        target.prototype.id=id;
    }
}
function Logger(id:number){
    console.log('init');
    return (target:Function)=>{
        console.log('run');
        target.prototype.id=id;
    }
}

@Component(2)
export class User {
    id:number;

    updateId(newId:number){
        this.id=newId;
        return this.id;
    }
}


 console.log(new User().id);
