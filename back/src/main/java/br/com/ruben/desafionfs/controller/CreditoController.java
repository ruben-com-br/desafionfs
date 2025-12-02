package br.com.ruben.desafionfs.controller;

import br.com.ruben.desafionfs.model.Credito;
import br.com.ruben.desafionfs.service.CreditoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
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