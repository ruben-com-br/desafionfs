import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import Swal from 'sweetalert2';

import { CreditoService, Credito } from './services/credito';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatProgressSpinnerModule ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'consulta-credito';
  numeroCredito: number | null = 123456;
  numeroNfse: number | null = 7891011; 
  isLoading = false;
  listaCreditos: Credito[] = [];
  detalhesCredito: Credito[] = [];
  displayedColumns: string[] = [
    'aliquota',
    'baseCalculo',
    'dataConstituicao',
    'numeroCredito',
    'numeroNfse',
    'simplesNacional',
    'tipoCredito',
    'valorDeducao',
    'valorFaturado',
    'valorIssqn'
  ];

  constructor(private creditoService: CreditoService) {}

  buscarPorCredito() {
    if (this.numeroCredito === null || this.numeroCredito === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo obrigatório',
        text: 'Informe o número do crédito para realizar a busca.',
        confirmButtonColor: '#3f51b5'
      });
      return;
    }

    this.isLoading = true;
    this.listaCreditos = [];
    this.detalhesCredito = [];

    this.creditoService.buscarCredito(this.numeroCredito.toString()).subscribe({
      next: (res) => {
        if (res) {
          this.detalhesCredito = [res];
          this.listaCreditos = [];
        } else {
          this.detalhesCredito = [];
          Swal.fire({
            icon: 'warning',
            title: 'Nenhum resultado encontrado.',
            text: `Não foi encontrado crédito com o número ${this.numeroCredito}`,
            confirmButtonColor: '#3f51b5'
          });
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar crédito:', err);
        Swal.fire({
          icon: 'error',
          title: 'Erro na consulta',
          text: 'Ocorreu um erro ao buscar o crédito. Tente novamente.',
          confirmButtonColor: '#3f51b5'
        });
        this.isLoading = false;
      }
    });
  }

  buscarPorNfse() {
    if (this.numeroNfse === null || this.numeroNfse === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo obrigatório',
        text: 'Informe o número da NFS-e para realizar a busca.',
        confirmButtonColor: '#3f51b5'
      });
      return;
    }

    this.isLoading = true;
    this.listaCreditos = [];
    this.detalhesCredito = [];

    this.creditoService.listaCreditosByNumeroNfse(this.numeroNfse.toString()).subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          this.listaCreditos = res;
          this.detalhesCredito = [];
        } else {
          this.listaCreditos = [];
          Swal.fire({
            icon: 'warning',
            title: 'Nenhum resultado encontrado.',
            text: `Não foram encontrados créditos para a NFS-e ${this.numeroNfse}`,
            confirmButtonColor: '#3f51b5'
          });
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar créditos por NFS-e:', err);
        Swal.fire({
          icon: 'error',
          title: 'Erro na consulta',
          text: 'Ocorreu um erro ao buscar os créditos. Tente novamente.',
          confirmButtonColor: '#3f51b5'
        });
        this.isLoading = false;
      }
    });
  }
}