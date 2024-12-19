function classDecorator<T extends { new (...args:any[]): {} }>(
    constructor: T
) {
    return class extends constructor {
        newProperty = 'New Property';
        hello='override'
    }
}

// classDecorator anade 2 propiedades nuevas a SuperClass
// el decorador es una funcion que le anade un comportamiento o  propiedades a otra clase
@classDecorator
export class SuperClass {
    public myProperty: string = 'Avc123';

    print() {
        console.log('Hola mundo!');
    }
}

// imprimo la definicion de la clase
console.log(SuperClass);


const myClass = new SuperClass();
// imprimo la instancia de la clase
console.log( myClass );


