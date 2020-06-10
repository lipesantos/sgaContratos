package br.com.cspconsultoria.sga.contrato.web.rest;

import br.com.cspconsultoria.sga.contrato.domain.Proposta;
import br.com.cspconsultoria.sga.contrato.repository.PropostaRepository;
import br.com.cspconsultoria.sga.contrato.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link br.com.cspconsultoria.sga.contrato.domain.Proposta}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PropostaResource {

    private final Logger log = LoggerFactory.getLogger(PropostaResource.class);

    private static final String ENTITY_NAME = "proposta";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PropostaRepository propostaRepository;

    public PropostaResource(PropostaRepository propostaRepository) {
        this.propostaRepository = propostaRepository;
    }

    /**
     * {@code POST  /propostas} : Create a new proposta.
     *
     * @param proposta the proposta to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new proposta, or with status {@code 400 (Bad Request)} if the proposta has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/propostas")
    public ResponseEntity<Proposta> createProposta(@RequestBody Proposta proposta) throws URISyntaxException {
        log.debug("REST request to save Proposta : {}", proposta);
        if (proposta.getId() != null) {
            throw new BadRequestAlertException("A new proposta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Proposta result = propostaRepository.save(proposta);
        return ResponseEntity.created(new URI("/api/propostas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /propostas} : Updates an existing proposta.
     *
     * @param proposta the proposta to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated proposta,
     * or with status {@code 400 (Bad Request)} if the proposta is not valid,
     * or with status {@code 500 (Internal Server Error)} if the proposta couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/propostas")
    public ResponseEntity<Proposta> updateProposta(@RequestBody Proposta proposta) throws URISyntaxException {
        log.debug("REST request to update Proposta : {}", proposta);
        if (proposta.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Proposta result = propostaRepository.save(proposta);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, proposta.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /propostas} : get all the propostas.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of propostas in body.
     */
    @GetMapping("/propostas")
    public ResponseEntity<List<Proposta>> getAllPropostas(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Propostas");
        Page<Proposta> page;
        if (eagerload) {
            page = propostaRepository.findAllWithEagerRelationships(pageable);
        } else {
            page = propostaRepository.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /propostas/:id} : get the "id" proposta.
     *
     * @param id the id of the proposta to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the proposta, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/propostas/{id}")
    public ResponseEntity<Proposta> getProposta(@PathVariable Long id) {
        log.debug("REST request to get Proposta : {}", id);
        Optional<Proposta> proposta = propostaRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(proposta);
    }

    /**
     * {@code DELETE  /propostas/:id} : delete the "id" proposta.
     *
     * @param id the id of the proposta to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/propostas/{id}")
    public ResponseEntity<Void> deleteProposta(@PathVariable Long id) {
        log.debug("REST request to delete Proposta : {}", id);
        propostaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
