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
      let teste=this.desformatNumber(this.displayValue);
      console.log(teste);
      
      let result=String(this.service.calculate(this.total,parseFloat(this.desformatNumber(this.displayValue)),this.operator));
      this.displayValue=this.formatNumber(result.replace('.',','));
    }else if(value.match('AC')){
     this.handleAc();
    }else if(value.match(/^\+\/\-$/)){
      this.handleNegative();
    }else if(value.match('%')){
      this.handlePercent();
    }
    
    
  }
  handleNumber(value: string): void {
    let val;
    if (this.displayValue === '0') {
      val = value;
    } else {
      val=this.displayValue + value;
    }
    this.displayValue= this.formatNumber(val);
  }
  handleOperator(value: string): void {
    this.total=parseFloat(this.desformatNumber(this.displayValue));
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
  handlePercent():void{
    this.displayValue=String(parseFloat(this.displayValue.replace(',','.'))/100).replace('.',',');
  }
  formatNumber(value: string): string {
    console.log(value);
    
    value=value.replaceAll('.','');
    let index=value.includes(',')?value.indexOf(','):value.length;
    for(let i=index-3;i>0;i-=3){
      value=value.slice(0,i)+'.'+value.slice(i);
    } 
    return value;
  }
  desformatNumber(value: string): string {
    return value.replaceAll('.','').replaceAll(',','.');
  }
}
