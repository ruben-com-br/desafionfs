package br.com.ruben.desafionfs.service;

import br.com.ruben.desafionfs.model.Credito;
import br.com.ruben.desafionfs.repository.CreditoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CreditoService {

    @Autowired
    private CreditoRepository repository;

    public List<Credito> buscarPorNfse(String numeroNfse) {
        return repository.findByNumeroNfse(numeroNfse);
    }

    public Optional<Credito> buscarPorCredito(String numeroCredito) {
        return repository.findByNumeroCredito(numeroCredito);
    }
}