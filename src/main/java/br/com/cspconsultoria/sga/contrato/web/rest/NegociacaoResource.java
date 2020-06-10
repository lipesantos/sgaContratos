package br.com.cspconsultoria.sga.contrato.web.rest;

import br.com.cspconsultoria.sga.contrato.domain.Negociacao;
import br.com.cspconsultoria.sga.contrato.repository.NegociacaoRepository;
import br.com.cspconsultoria.sga.contrato.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link br.com.cspconsultoria.sga.contrato.domain.Negociacao}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class NegociacaoResource {

    private final Logger log = LoggerFactory.getLogger(NegociacaoResource.class);

    private static final String ENTITY_NAME = "negociacao";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NegociacaoRepository negociacaoRepository;

    public NegociacaoResource(NegociacaoRepository negociacaoRepository) {
        this.negociacaoRepository = negociacaoRepository;
    }

    /**
     * {@code POST  /negociacaos} : Create a new negociacao.
     *
     * @param negociacao the negociacao to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new negociacao, or with status {@code 400 (Bad Request)} if the negociacao has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/negociacaos")
    public ResponseEntity<Negociacao> createNegociacao(@RequestBody Negociacao negociacao) throws URISyntaxException {
        log.debug("REST request to save Negociacao : {}", negociacao);
        if (negociacao.getId() != null) {
            throw new BadRequestAlertException("A new negociacao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Negociacao result = negociacaoRepository.save(negociacao);
        return ResponseEntity.created(new URI("/api/negociacaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /negociacaos} : Updates an existing negociacao.
     *
     * @param negociacao the negociacao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated negociacao,
     * or with status {@code 400 (Bad Request)} if the negociacao is not valid,
     * or with status {@code 500 (Internal Server Error)} if the negociacao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/negociacaos")
    public ResponseEntity<Negociacao> updateNegociacao(@RequestBody Negociacao negociacao) throws URISyntaxException {
        log.debug("REST request to update Negociacao : {}", negociacao);
        if (negociacao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Negociacao result = negociacaoRepository.save(negociacao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, negociacao.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /negociacaos} : get all the negociacaos.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of negociacaos in body.
     */
    @GetMapping("/negociacaos")
    public List<Negociacao> getAllNegociacaos(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Negociacaos");
        return negociacaoRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /negociacaos/:id} : get the "id" negociacao.
     *
     * @param id the id of the negociacao to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the negociacao, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/negociacaos/{id}")
    public ResponseEntity<Negociacao> getNegociacao(@PathVariable Long id) {
        log.debug("REST request to get Negociacao : {}", id);
        Optional<Negociacao> negociacao = negociacaoRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(negociacao);
    }

    /**
     * {@code DELETE  /negociacaos/:id} : delete the "id" negociacao.
     *
     * @param id the id of the negociacao to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/negociacaos/{id}")
    public ResponseEntity<Void> deleteNegociacao(@PathVariable Long id) {
        log.debug("REST request to delete Negociacao : {}", id);
        negociacaoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
