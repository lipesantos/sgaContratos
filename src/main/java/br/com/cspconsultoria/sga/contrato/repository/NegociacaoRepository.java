package br.com.cspconsultoria.sga.contrato.repository;

import br.com.cspconsultoria.sga.contrato.domain.Negociacao;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Negociacao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NegociacaoRepository extends JpaRepository<Negociacao, Long> {
}
