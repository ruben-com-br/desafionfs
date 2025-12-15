package br.com.ruben.desafionfs.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaService {

    private final KafkaTemplate<String, String> kafkaTemplate;

    @Value("${app.kafka.topic}")
    private String topic;

    public KafkaService(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void enviarConsulta(String tipo, String numero) {
        String mensagem = String.format("Consulta: %s - Número: %s", tipo, numero);
        kafkaTemplate.send(topic, mensagem);
    }
}