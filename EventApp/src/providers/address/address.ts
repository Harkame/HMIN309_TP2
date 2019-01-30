import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AddressProvider
{
    private apiURL: string = 'https://maps.googleapis.com/maps/api/geocode/json?';
    private apiKey: string = 'AIzaSyBQ9s-I2YGlocgEKe0fVUid6mUqacCaqbE';
    //private apiKey : string = 'AIzaSyDiadmDr6KFZAbaO4kMdFvqY4rbmYEsINk ';

    constructor(private http: HttpClient)
    {

    }

    resolveGeolocation(address: string): Observable<any>
    {
        let observable: Observable<any> = this.http.get(this.apiURL + 'address='+ address + '&key=' + this.apiKey).map((res: Response) => res);
        return observable;
    }
}
