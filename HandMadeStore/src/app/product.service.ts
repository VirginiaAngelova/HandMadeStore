import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "./Product.interface";

@Injectable({
    providedIn: 'root'
})
export class productService {

    url = 'http://localhost:3000/product';

    constructor(private http: HttpClient) { }

    getProduct(): Observable<Product[]> {
        return this.http.get<Product[]>(this.url);
    }
    getProductId(id: number): Observable<Product> {
        const url = `${this.url}/${id}`;

        return this.http.get<Product>(url);
    }

    addProduct(product: Product): Observable<any> {
        return this.http.post(this.url, product);
    }
    updateProduct(product: Product): Observable<any> {
        const url = `${this.url}/${product.id}`;
        return this.http.put(url, product);
    }
    deleteProduct(id: number): Observable<any> {
        const url = `${this.url}/${id}`;
        return this.http.delete(url);
    }
}