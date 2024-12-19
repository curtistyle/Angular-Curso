interface Passenger {
    name: string;
    children?: string[];
}

const passenger1: Passenger = {
    name: 'Fernando'
}

const passenger2: Passenger = {
    name: 'Maria',
    children: ["Natalia", "Marcos"]
}

const printChildren = ( passenger: Passenger ) => {
    // * (?): es el optional chaining
    // ? en este caso, si la propiedad children no existe devuelve 0
    const howManyChildren: number = passenger.children?.length || 0;
    console.log(passenger.name, howManyChildren);
}

printChildren(passenger1);
printChildren(passenger2);
console.log('\n ###############3 \n');

const returnChildrenNumber = ( passenger: Passenger ): number => {
    //if ( !passenger.children ) return 0;

    // * (!): es el optional chaining
    // ? tengo que estar seguro se que siempre voy a retornar un numero
    const howManyChildren: number = passenger.children!.length;
    console.log(passenger.name, howManyChildren);
    return howManyChildren;
}
console.log(returnChildrenNumber( passenger2 ))
console.log(returnChildrenNumber( passenger1 ))
