
/*
export class Person{
    public name: string;
    private address: string;

    constructor(name: string, address: string) {
        this.name = name;
        this.address = address;
    }
}
*/
// forma corta
export class Person{
    constructor(
        public firstName: string,
        public lastName: string,
        // @ts-ignore
        private address: string = 'No Address'
    ) {};
}

// ? Herencia
/*
export class Hero extends Person {
    constructor(
        public alterEgo: string,
        public age: number,
        public realName: string
    ) {
        super(realName, 'New York');
    }
}
*/

// ? Por composicion
export class Hero {
    // public person: Person;
    constructor(
        public alterEgo: string,
        public age: number,
        public realName: string,
        public person: Person
    ) {
        //this.person = new Person(realName)
    }
}
const tony = new Person('Tony',"Stark", "New York")
const ironman = new Hero("Iron Man", 45, 'Tony', tony);

console.log(ironman);