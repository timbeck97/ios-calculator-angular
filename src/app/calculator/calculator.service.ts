import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() { }

  calculate(a: number, b: number, operator: string): number {
    console.log(a, b, operator);
    
    switch (operator) {
      case '+': return a + b;
      case '-': return a - b;
      case 'x': return a * b;
      default: return a / b;
    }
  }

  
}
