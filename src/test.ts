// function Component(id: number) {
//     console.log('init');
//     return (target: Function) => {
//         console.log('run');
//         target.prototype.id = id;
//     }
// }
// function Logger() {
//     console.log('init log');
//     return (target: Function) => {
//         console.log('run log');
//     }
// }

// function Method(
//     target: Object,
//     propertyKey: string,
//     propdesc: PropertyDescriptor): void {
//     console.log(propertyKey);
//     const oldvalue = propdesc.value;
//     propdesc.value = function (...args: any[]) {
//         return args[0] * 10;
//     }
// }

// function Prop(
//     target: Object,
//     propertyKey: string) {
//         let value: number;

//         const getter=()=>{
//             console.log('get');
//             return value;
//         }
//         const setter = (newValue:number)=>{
//             console.log('set');
//             value=newValue;
//         }

//         Object.defineProperty(target, propertyKey,{
//             get:getter,
//             set:setter
//         });
// }


// function Param(
//     target: Object,
//     propertyKey: string,
//     index: number) {
//         console.log(propertyKey, index);
        
// }

// //decorators
// @Logger()
// @Component(2)
// export class User {
//     @Prop id: number;

//     @Method
//     updateId(@Param newId: number) {
//         this.id = newId;
//         return this.id;
//     }
// }


// console.log(new User().id);
// console.log(new User().updateId(3));
//! ----------

import 'reflect-metadata';

function Test(target:Function){
    Reflect.defineMetadata('a', 1, target);
    const meta =Reflect.getMetadata('a',target);
    console.log(meta);
    
}

@Test 
export class C{

}