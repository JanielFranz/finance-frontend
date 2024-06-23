import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

//private apiUrl = 'http://localhost:8080/api/finanzasgrupo4/v1/Customer';
  private apiUrl = 'http://localhost:8080/api/finanzasgrupo4/v1/Customer';

  constructor(private http:HttpClient) { }

  getClientes():Observable<any>{
    return this.http.get(this.apiUrl);
  }

  addCliente(data:Cliente):Observable<any>{
    return this.http.post(this.apiUrl,data);
  }

  deleteCliente(id:number):Observable<any>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
  /*get_cronograma_cliente(idCliente: number, idCronograma: number): Observable<any> {
    const url = `${this.apiUrl}/id/${idCliente}/cronograma/${idCronograma}`;

    return this.http.get(url);
  }*/

}
