import { Component, Input, OnInit } from '@angular/core';
import { CurrencyConverterService} from '../service/currency-converter.service'
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent {
  @Input() fromCurrency: string = '';
  @Input() toCurrency: string = '';
  value: number = 0;
  convertedValue: number | null = null;
  errorMessage: string = '';

  constructor(private service: CurrencyConverterService) {}

  convert(): void {
    if (this.value > 0 && this.fromCurrency && this.toCurrency) {
      this.service.getCurrencyConversions(this.value, this.fromCurrency, this.toCurrency).subscribe(
        result => {
          this.convertedValue = result;
        },
        error => {
          this.errorMessage = error.message;
        }
      );
    }
  }
}