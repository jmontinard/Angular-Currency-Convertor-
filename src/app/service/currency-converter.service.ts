import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterService {

  // GET https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/EUR/GBP
  private exChangeConvertUrl: string = ' https://v6.exchangerate-api.com/v6/'
  // private convertUrl: string = 'https://openexchangerates.org/api/convert/'
  constructor(private http: HttpClient) { }

  getCurrencyConversions(value: number, fromCurrency: string, toCurrency: string): Observable<number> {
    const url = `${this.exChangeConvertUrl}${environment.apiKey}/pair/${fromCurrency}/${toCurrency}/${value}`;
    return this.http.get<{ conversion_result: number }>(url).pipe(
      map(response => response.conversion_result),  // Extract the conversion result
      catchError(this.handleError)
    );
  }

  //  had to change api's this endpoint is not availble on the free version
  // getCurrencyConversions(value: number, fromCurrency: string, toCurrency: string): Observable<{}> {
  //   const url = `${this.convertUrl}${value}/${fromCurrency}/${toCurrency}?app_id=${enviorment.apiID}`;
  //   return this.http.get<{}>(url).pipe(
  //     catchError(this.handleError)
  //   );
  // }


  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong!'));
  }
}
