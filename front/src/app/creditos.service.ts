import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Credito {
numeroCredito: string;
numeroNfse: string;
dataConstituicao: string;
valorIssqn: number;
tipoCredito: string;
simplesNacional: string | boolean;
aliquota: number;
valorFaturado: number;
valorDeducao: number;
baseCalculo: number;
}


@Injectable({ providedIn: 'root' })
export class CreditosService {
// ajustar se a API estiver em outro host/porta
private API_BASE = 'http://localhost:8080/api/creditos';
constructor(private http: HttpClient) {}


findByNfse(numeroNfse: string): Observable<Credito[]> {
return this.http.get<Credito[]>(`${this.API_BASE}/${encodeURIComponent(numeroNfse)}`);
}


findByCredito(numeroCredito: string): Observable<Credito> {
return this.http.get<Credito>(`${this.API_BASE}/credito/${encodeURIComponent(numeroCredito)}`);
}
}