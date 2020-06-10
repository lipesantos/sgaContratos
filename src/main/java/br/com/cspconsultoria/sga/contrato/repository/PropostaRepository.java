package br.com.cspconsultoria.sga.contrato.repository;

import br.com.cspconsultoria.sga.contrato.domain.Proposta;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Proposta entity.
 */
@Repository
public interface PropostaRepository extends JpaRepository<Proposta, Long> {

    @Query(value = "select distinct proposta from Proposta proposta left join fetch proposta.negociacoes",
        countQuery = "select count(distinct proposta) from Proposta proposta")
    Page<Proposta> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct proposta from Proposta proposta left join fetch proposta.negociacoes")
    List<Proposta> findAllWithEagerRelationships();

    @Query("select proposta from Proposta proposta left join fetch proposta.negociacoes where proposta.id =:id")
    Optional<Proposta> findOneWithEagerRelationships(@Param("id") Long id);
}
