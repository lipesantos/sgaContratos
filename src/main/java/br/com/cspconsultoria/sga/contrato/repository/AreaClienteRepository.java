package br.com.cspconsultoria.sga.contrato.repository;

import br.com.cspconsultoria.sga.contrato.domain.AreaCliente;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the AreaCliente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AreaClienteRepository extends JpaRepository<AreaCliente, Long> {
}
