import { Product, taxCalculation } from './06-function-destructuring'

const shoppingCart: Product[] = [
    { description: 'Samsung S1', price: 10 },
    { description: 'ASUS VivoBook', price: 200 },
    { description: 'ViewSonic v2', price: 300 },
];

const [total, tax] = taxCalculation({tax: 0.12, products: shoppingCart});

console.log('Total: ', total);
console.log('Tax: ', tax);

//next->14

