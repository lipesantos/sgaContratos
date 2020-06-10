package br.com.cspconsultoria.sga.contrato.web.rest;

import br.com.cspconsultoria.sga.contrato.domain.UnidadeComercial;
import br.com.cspconsultoria.sga.contrato.repository.UnidadeComercialRepository;
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
 * REST controller for managing {@link br.com.cspconsultoria.sga.contrato.domain.UnidadeComercial}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class UnidadeComercialResource {

    private final Logger log = LoggerFactory.getLogger(UnidadeComercialResource.class);

    private static final String ENTITY_NAME = "unidadeComercial";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UnidadeComercialRepository unidadeComercialRepository;

    public UnidadeComercialResource(UnidadeComercialRepository unidadeComercialRepository) {
        this.unidadeComercialRepository = unidadeComercialRepository;
    }

    /**
     * {@code POST  /unidade-comercials} : Create a new unidadeComercial.
     *
     * @param unidadeComercial the unidadeComercial to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new unidadeComercial, or with status {@code 400 (Bad Request)} if the unidadeComercial has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/unidade-comercials")
    public ResponseEntity<UnidadeComercial> createUnidadeComercial(@RequestBody UnidadeComercial unidadeComercial) throws URISyntaxException {
        log.debug("REST request to save UnidadeComercial : {}", unidadeComercial);
        if (unidadeComercial.getId() != null) {
            throw new BadRequestAlertException("A new unidadeComercial cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UnidadeComercial result = unidadeComercialRepository.save(unidadeComercial);
        return ResponseEntity.created(new URI("/api/unidade-comercials/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /unidade-comercials} : Updates an existing unidadeComercial.
     *
     * @param unidadeComercial the unidadeComercial to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated unidadeComercial,
     * or with status {@code 400 (Bad Request)} if the unidadeComercial is not valid,
     * or with status {@code 500 (Internal Server Error)} if the unidadeComercial couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/unidade-comercials")
    public ResponseEntity<UnidadeComercial> updateUnidadeComercial(@RequestBody UnidadeComercial unidadeComercial) throws URISyntaxException {
        log.debug("REST request to update UnidadeComercial : {}", unidadeComercial);
        if (unidadeComercial.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UnidadeComercial result = unidadeComercialRepository.save(unidadeComercial);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, unidadeComercial.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /unidade-comercials} : get all the unidadeComercials.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of unidadeComercials in body.
     */
    @GetMapping("/unidade-comercials")
    public List<UnidadeComercial> getAllUnidadeComercials() {
        log.debug("REST request to get all UnidadeComercials");
        return unidadeComercialRepository.findAll();
    }

    /**
     * {@code GET  /unidade-comercials/:id} : get the "id" unidadeComercial.
     *
     * @param id the id of the unidadeComercial to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the unidadeComercial, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/unidade-comercials/{id}")
    public ResponseEntity<UnidadeComercial> getUnidadeComercial(@PathVariable Long id) {
        log.debug("REST request to get UnidadeComercial : {}", id);
        Optional<UnidadeComercial> unidadeComercial = unidadeComercialRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(unidadeComercial);
    }

    /**
     * {@code DELETE  /unidade-comercials/:id} : delete the "id" unidadeComercial.
     *
     * @param id the id of the unidadeComercial to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/unidade-comercials/{id}")
    public ResponseEntity<Void> deleteUnidadeComercial(@PathVariable Long id) {
        log.debug("REST request to delete UnidadeComercial : {}", id);
        unidadeComercialRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
