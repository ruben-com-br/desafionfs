package br.com.ruben.desafionfs.controller;

import br.com.ruben.desafionfs.model.Credito;
import br.com.ruben.desafionfs.service.CreditoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/creditos")
public class CreditoController {

    @Autowired
    private CreditoService service;

    @GetMapping("/{numeroNfse}")
    public ResponseEntity<List<Credito>> buscarPorNfse(@PathVariable String numeroNfse) {
        List<Credito> creditos = service.buscarPorNfse(numeroNfse);
        return ResponseEntity.ok(creditos);
    }

    @GetMapping("/credito/{numeroCredito}")
    public ResponseEntity<Credito> buscarPorCredito(@PathVariable String numeroCredito) {
        return service.buscarPorCredito(numeroCredito)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}