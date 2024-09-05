import { Component, Input, OnInit, OnDestroy,signal } from '@angular/core';
import { CurrencyConverterService} from '../service/currency-converter.service'
import { Observable, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit, OnDestroy {
  private currencyConverterSubscription: Subscription | null = null
  @Input() fromCurrency: string = '';
  @Input() toCurrency: string = '';

  // Array to store conversion history
  conversionHistory: { fromCurrency: string, toCurrency: string, convertedValue: number }[] = [];

  // value: number = 0;
  // convertedValue: number | null = null;
  // errorMessage: string = '';
// Use signals for these properties
  value = signal(0); // Default value of 0
  convertedValue = signal<number | null>(null);
  errorMessage = signal<string>('');



  // Intermediate value for ngModel
  valueModel = 0;


  constructor(private service: CurrencyConverterService) {}
  ngOnInit(): void {
    
  }

  convert(): void {
    if (this.valueModel > 0 && this.fromCurrency && this.toCurrency) {
      this.currencyConverterSubscription = this.service.getCurrencyConversions(this.valueModel, this.fromCurrency, this.toCurrency).subscribe({
        next: (result) => {
          this.convertedValue.set(result);
          // Add to conversion history
          this.conversionHistory.push({
            fromCurrency: this.fromCurrency,
            toCurrency: this.toCurrency,
            convertedValue: result
          });
        },
        error: (err) => this.errorMessage.set(err.message)
      });
    }
  }


  // convert(): void {
  //   if (this.value > 0 && this.fromCurrency && this.toCurrency) {
  //     this.service.getCurrencyConversions(this.value, this.fromCurrency, this.toCurrency).subscribe(
  //       result => {
  //         this.convertedValue = result;
  //       },
  //       error => {
  //         this.errorMessage = error.message;
  //       }
  //     );
  //   }
  // }

ngOnDestroy(): void {
  if(this.currencyConverterSubscription){
    this.currencyConverterSubscription.unsubscribe()
  }
}

}