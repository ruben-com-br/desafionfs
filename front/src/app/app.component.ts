import { Component } from '@angular/core';
import { CreditosService, Credito } from './creditos.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  numeroNfse = '';
  numeroCredito = '';
  resultados: Credito[] = [];
  loading = false;
  error = '';


  constructor(private svc: CreditosService) { }


  buscarPorNfse() {
    this.error = '';
    if (!this.numeroNfse) { this.error = 'Informe o número da NFS-e'; return; }
    this.loading = true;
    this.svc.findByNfse(this.numeroNfse).subscribe({
      next: res => { this.resultados = res; this.loading = false; },
      error: err => { this.error = 'Erro ao consultar NFS-e'; this.loading = false; }
    });
  }


  buscarPorCredito() {
    this.error = '';
    if (!this.numeroCredito) { this.error = 'Informe o número do crédito'; return; }
    this.loading = true;
    this.svc.findByCredito(this.numeroCredito).subscribe({
      next: res => { this.resultados = [res]; this.loading = false; },
      error: err => { this.error = 'Erro ao consultar crédito'; this.loading = false; }
    });
  }
}