package br.com.cspconsultoria.sga.contrato.repository;

import br.com.cspconsultoria.sga.contrato.domain.Cliente;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Cliente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
