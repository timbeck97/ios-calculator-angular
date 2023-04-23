import { Component } from '@angular/core';
import { CalculatorService } from './calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  displayValue: string = '0';
  service:CalculatorService;
  total:number=0;
  operator:string='';
  constructor(CalculatorService: CalculatorService) { 
    this.service=CalculatorService;
  }
  pressButton(event: MouseEvent): void {
    let value = (event.target as HTMLSpanElement).innerText;
    if (value.match(/^\d+$/)){
      this.handleNumber(value);
    }else if(value.match(/^[+x/-]$/)){
      this.handleOperator(value);
    }else if(value.match(/^[,]$/)){
      this.handleComma();
    }else if(value.match(/^[=]$/)){
      this.displayValue=String(this.service.calculate(this.total,parseFloat(this.displayValue),this.operator));
    }else if(value.match('AC')){
     this.handleAc();
    }else if(value.match(/^\+\/\-$/)){
      this.handleNegative();
    }
    
    
  }
  handleNumber(value: string): void {
    if (this.displayValue === '0') {
      this.displayValue = value;
    } else {
      this.displayValue += value;
    }
  }
  handleOperator(value: string): void {
    this.total=parseFloat(this.displayValue);
    this.displayValue='0';
    this.operator=value;
  }
  handleComma():void{
    if(this.displayValue.includes(',')){
      return;
    }
    this.displayValue+=',';
  }
  handleAc():void{
    this.displayValue='0';
    this.total=0;
    this.operator='';
  }
  handleNegative():void{
    this.displayValue='-'+this.displayValue;
  }
}
