export {};

const name: string = 'curtis';
let hpPoints: number | 'FULL' = 95;
const isAlive: boolean = true;

// array

let threePigs: number[] = [1, 2, 3];
let days: string[] = ['Sunday', 'Monday', 'Tuesday'];
let months: Array<string> = ['Junary', 'February', 'March', 'April'];

// Enum

enum Colors { Blue, Yellow, Grey, White, Red, Black };

let bestColor: Colors = Colors.Blue;

// Any

let anything: any = 'I am a string';
anything = 5;

hpPoints = 'FULL';

console.log(name);
console.log(hpPoints);
console.log(isAlive);

console.log(threePigs);
console.log(days);
console.log(months);
console.log(bestColor);
console.log(anything);