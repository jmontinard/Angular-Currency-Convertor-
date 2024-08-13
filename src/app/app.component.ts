import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { CurrencySelectorComponent } from './currency-selector/currency-selector.component';
import { HttpClientModule } from '@angular/common/http';  // Import this

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CurrencyConverterComponent, CurrencySelectorComponent,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'simple-currency-converter';

  fromCurrency: string = 'USD';
  toCurrency: string = 'EUR';

  onCurrencyChange(event: { fromCurrency: string; toCurrency: string }) {
    this.fromCurrency = event.fromCurrency;
    this.toCurrency = event.toCurrency;
  }
}
