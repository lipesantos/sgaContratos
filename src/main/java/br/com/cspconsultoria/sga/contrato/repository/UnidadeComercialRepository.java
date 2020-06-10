package br.com.cspconsultoria.sga.contrato.repository;

import br.com.cspconsultoria.sga.contrato.domain.UnidadeComercial;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the UnidadeComercial entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UnidadeComercialRepository extends JpaRepository<UnidadeComercial, Long> {
}
