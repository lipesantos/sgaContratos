package br.com.cspconsultoria.sga.contrato.repository;

import br.com.cspconsultoria.sga.contrato.domain.Negociacao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Negociacao entity.
 */
@Repository
public interface NegociacaoRepository extends JpaRepository<Negociacao, Long> {

    @Query(value = "select distinct negociacao from Negociacao negociacao left join fetch negociacao.propostas",
        countQuery = "select count(distinct negociacao) from Negociacao negociacao")
    Page<Negociacao> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct negociacao from Negociacao negociacao left join fetch negociacao.propostas")
    List<Negociacao> findAllWithEagerRelationships();

    @Query("select negociacao from Negociacao negociacao left join fetch negociacao.propostas where negociacao.id =:id")
    Optional<Negociacao> findOneWithEagerRelationships(@Param("id") Long id);
}
