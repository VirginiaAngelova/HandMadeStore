import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { categories } from "./categories.interface";

@Injectable({
    providedIn: 'root'
})
export class categoriesService {

    url = 'http://localhost:3000/categories';

    constructor(private http: HttpClient) { }

    getCategory(): Observable<categories[]> {
        return this.http.get<categories[]>(this.url);
    }
    getCategoryId(id: number): Observable<categories> {
        const url = `${this.url}/${id}`;

        return this.http.get<categories>(url);
    }
    
}