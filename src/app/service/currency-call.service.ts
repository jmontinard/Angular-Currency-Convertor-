import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { runMain } from 'module';
export interface Currency {
  code: string;
  name: string;
}


@Injectable({
  providedIn: 'root'
})
export class CurrencyCallService {
  private currencyCodeUrl = 'https://openexchangerates.org/api/currencies.json'
  constructor(private http: HttpClient) { }
  
  getCurrencyCodes(): Observable<Currency[]> {
    return this.http.get<{ [key: string]: string }>(this.currencyCodeUrl).pipe(
      map(data => {
        return Object.entries(data).map(([code, name]) => ({ code, name }));
      }),
      catchError(this.handleError) // Optional: you can add error handling here
    );
  }
  private handleError(error: HttpErrorResponse) {
    // You can customize the error handling here
    return throwError(() => new Error('Something went wrong!'));

}

}



// getCurrencies(): Observable<Currency[]> {
//   return this.http.get<any>(this.apiUrl).pipe(
//     map(data => {
//       // Transform the API response to an array of objects
//       return Object.keys(data.rates).map(key => ({
//         code: key,
//         name: this.getCurrencyName(key)
//       }));
//     }),
//     catchError(this.handleError)
//   );
// }

// // A method to map currency codes to their names
// private getCurrencyName(code: string): string {
//   const currencyNames = {
//     USD: 'United States Dollar',
//     EUR: 'Euro',
//     GBP: 'British Pound',
//     INR: 'Indian Rupee',
//     JPY: 'Japanese Yen',
//     // Add more mappings as needed
//   };
//   return currencyNames[code] || code;
// }

// // Error handling
// private handleError(error: HttpErrorResponse) {
//   console.error('Error fetching data', error);
//   return throwError('Error fetching data; please try again later.');
// }
// }