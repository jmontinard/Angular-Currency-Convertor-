import { Component, OnInit, Output, EventEmitter,ViewEncapsulation } from '@angular/core';
import { CurrencyCallService, Currency } from '../service/currency-call.service';

import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

import { throws } from 'assert';
@Component({
  selector: 'app-currency-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.scss'],
  encapsulation: ViewEncapsulation.None // Try this to make styles global
})
export class CurrencySelectorComponent implements OnInit {
  
  currencies: Currency[] = [];
  fromCurrency: string = 'USD'; // Default value
  toCurrency: string = 'EUR'; // Default value

    // this alows the child to get the varibles from its parent and pass it up then we use the eventEmitter to listen for changes 
  @Output() currencyChange = new EventEmitter<{ fromCurrency: string; toCurrency: string }>();
  constructor( private currencyService: CurrencyCallService) {}

  ngOnInit(): void {
    this.loadCurrencies()
  }

  loadCurrencies(): void {
    this.currencyService.getCurrencyCodes().subscribe(
      data =>{
        // console.log(data)
        this.currencies = data
        this.emitCurrencyChange()
      }
    )
  }

  emitCurrencyChange(): void {
    this.currencyChange.emit({ fromCurrency: this.fromCurrency, toCurrency: this.toCurrency });
  }

  // Whenever the user changes the currency, emit the new values
  onCurrencyChange(): void {
    this.emitCurrencyChange();
  }
}
