function view(): void{
    console.log("Hello World");
}

function addNumber(a:number, b:number): number{
    return a + b;
}

const addNumberArrow = (a: number, b: number): string => {
    return `${a+b}`; // backticks, template literals
}

const result : number = addNumber(2, 3);
const result2 : string = addNumberArrow(2, 3);

view();
console.log(result);
console.log(result2);

// @ts-ignore
function multiply( firstNumber:number, secondNumber?:number, base:number=2){
    return firstNumber * base;
}

const multiplyResult: number = multiply(5)

console.log(multiplyResult);

interface Character {
    name: string;
    hp: number;
    showHp: () => void;
}


const healCharacter = ( character:Character, amount: number):void => {
    character.hp += amount;
}
const strider: Character = {
    name: 'Strider',
    hp: 50,
    showHp (): void {
        console.log(`Puntos de vida ${ this.hp }.`);
    },
}

healCharacter(strider, 10);

strider.showHp();

export {};