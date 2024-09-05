import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { GeoLocationCallService } from '../service/get-geo-location.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-geo-location',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './geo-location.component.html',
  styleUrls: ['./geo-location.component.scss']
})
export class GeoLocationComponent implements OnInit, OnDestroy {
  private geoLocationSubscription: Subscription | null = null;
  fromCurrency = signal('USD'); // Initialize with a default value

  constructor(private service: GeoLocationCallService) {}

  ngOnInit(): void {
    this.getIpAdress();
  }

  // Call getAPI then set the currency code response
  getIpAdress(): void {
    this.geoLocationSubscription = this.service.getAPI().subscribe({
      next: data => {
        console.log(data); // Log the currency code for debugging
        this.fromCurrency.set(data ?? 'USD'); // Set the signal to the currency code or 'USD' as fallback
      },
      error: err => {
        console.error(err);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.geoLocationSubscription) {
      this.geoLocationSubscription.unsubscribe();
    }
  }
}
