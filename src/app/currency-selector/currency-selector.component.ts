import { Component, OnInit, Output, EventEmitter, OnDestroy, signal, ViewEncapsulation } from '@angular/core';
import { CurrencyCallService, Currency } from '../service/currency-call.service';
import { GeoLocationCallService } from '../service/get-geo-location.service';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-currency-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CurrencySelectorComponent implements OnInit, OnDestroy {
  private currencySubscription: Subscription | null = null;
  private geoLocationSubscription: Subscription | null = null; // Add subscription for geolocation
  currencies: Currency[] = [];
  
  fromCurrency = signal('USD'); // Default value with signal
  toCurrency = signal('EUR'); // Default value with signal

  errorMessage: string = '';
  @Output() currencyChange = new EventEmitter<{ fromCurrency: string; toCurrency: string }>();

  constructor(
    private currencyService: CurrencyCallService,
    private geoLocationService: GeoLocationCallService // Inject the geolocation service
  ) {}

  ngOnInit(): void {
    this.loadCurrencies();
  }

  loadCurrencies(): void {
    this.currencySubscription = this.currencyService.getCurrencyCodes().subscribe({
      next: (data) => {
        this.currencies = data;
        this.emitCurrencyChange();
      },
      error: (err) => this.errorMessage = err.message
    });
  }

  emitCurrencyChange(): void {
    this.currencyChange.emit({ fromCurrency: this.fromCurrency(), toCurrency: this.toCurrency() });
  }

  onCurrencyChange(): void {
    this.emitCurrencyChange();
  }

  // Method to get the user's location and update fromCurrency
  getIpAddress(): void {
    this.geoLocationSubscription = this.geoLocationService.getAPI().subscribe({
      next: (currencyCode) => {
        if (currencyCode) {
          this.fromCurrency.set(currencyCode);
          this.emitCurrencyChange(); // Emit the change to parent
        } else {
          console.error('Currency code not found for the location.');
        }
      },
      error: (err) => console.error('Failed to get geolocation:', err)
    });
  }

  ngOnDestroy(): void {
    if (this.currencySubscription) {
      this.currencySubscription.unsubscribe();
    }
    if (this.geoLocationSubscription) {
      this.geoLocationSubscription.unsubscribe();
    }
  }
}
