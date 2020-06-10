package br.com.cspconsultoria.sga.contrato.repository;

import br.com.cspconsultoria.sga.contrato.domain.Proposta;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Proposta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PropostaRepository extends JpaRepository<Proposta, Long> {
}
