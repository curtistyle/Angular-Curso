export interface Product{
    description: string;
    price: number;
}

const phone: Product = {
    description: 'Nokia A1',
    price: 150.0
}

const table: Product ={
    description: 'iPad Air',
    price: 125.0
}

interface TaxCalculationOptions {
    tax: number;
    products: Product[];
}

// (1) function taxCalculation(options: TaxCalculationOptions): [number, number] {
// (2) function taxCalculation({ tax, products}: TaxCalculationOptions): [number, number] {
export function taxCalculation(options: TaxCalculationOptions): [number, number] {
    let total: number = 0;
    const { tax, products } = options; // (3)

    /* (1)
    options.products.forEach((product:Product) => {
        total += product.price;
    });
     */
    /* (1)
    options.products.forEach( ({ price }: Product) => {
        total += price;
    });
    */
    // (2) or (3)
    products.forEach(( {price}: Product) => {
        total += price;
    });

    return [total, total * tax];
}

const shoppingCart: Product[] = [phone, table];
const tax = 0.15;

/*
const result = taxCalculation(
    {products: shoppingCart, tax: tax},
);
console.log('Total', result[0]);
console.log('Tax', result[1]);
*/

const [totalResult, taxResult] = taxCalculation( {products: shoppingCart, tax: tax } );

console.log('Total: ',totalResult);
console.log('Tax: ',taxResult);


//export {};