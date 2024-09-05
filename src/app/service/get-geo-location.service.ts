import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import countryToCurrency from "country-to-currency";

@Injectable({
  providedIn: 'root'
})
export class GeoLocationCallService {
  private ipApiBaseUrl = `https://api.ipapi.com/api/check?access_key=${environment.ipApiKey}`;

  constructor(private http: HttpClient) {}

  // Method to get the user's country code and map it to a currency code
  getAPI(): Observable<string | undefined> {
    return this.http.get<{ country_code: string }>(this.ipApiBaseUrl).pipe(
      map(response => this.getCurrencyCode(response.country_code)),
      catchError(this.handleError)
    );
  }

  // Method to get the currency code based on the country code
  getCurrencyCode(countryCode: string): string | undefined {
    if (countryCode in countryToCurrency) {
      return countryToCurrency[countryCode as keyof typeof countryToCurrency];
    }
    return undefined; // or handle the case where the country code is not found
  }
  
  // Method to handle errors in the API call
  private handleError(error: HttpErrorResponse) {
    console.error('API call failed:', error); // Log the error to the console
    return throwError(() => new Error('Failed to retrieve currency information. Please try again later.'));
  }
}
