package br.com.cspconsultoria.sga.contrato.web.rest;

import br.com.cspconsultoria.sga.contrato.domain.AreaCliente;
import br.com.cspconsultoria.sga.contrato.repository.AreaClienteRepository;
import br.com.cspconsultoria.sga.contrato.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link br.com.cspconsultoria.sga.contrato.domain.AreaCliente}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AreaClienteResource {

    private final Logger log = LoggerFactory.getLogger(AreaClienteResource.class);

    private static final String ENTITY_NAME = "areaCliente";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AreaClienteRepository areaClienteRepository;

    public AreaClienteResource(AreaClienteRepository areaClienteRepository) {
        this.areaClienteRepository = areaClienteRepository;
    }

    /**
     * {@code POST  /area-clientes} : Create a new areaCliente.
     *
     * @param areaCliente the areaCliente to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new areaCliente, or with status {@code 400 (Bad Request)} if the areaCliente has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/area-clientes")
    public ResponseEntity<AreaCliente> createAreaCliente(@Valid @RequestBody AreaCliente areaCliente) throws URISyntaxException {
        log.debug("REST request to save AreaCliente : {}", areaCliente);
        if (areaCliente.getId() != null) {
            throw new BadRequestAlertException("A new areaCliente cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AreaCliente result = areaClienteRepository.save(areaCliente);
        return ResponseEntity.created(new URI("/api/area-clientes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /area-clientes} : Updates an existing areaCliente.
     *
     * @param areaCliente the areaCliente to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated areaCliente,
     * or with status {@code 400 (Bad Request)} if the areaCliente is not valid,
     * or with status {@code 500 (Internal Server Error)} if the areaCliente couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/area-clientes")
    public ResponseEntity<AreaCliente> updateAreaCliente(@Valid @RequestBody AreaCliente areaCliente) throws URISyntaxException {
        log.debug("REST request to update AreaCliente : {}", areaCliente);
        if (areaCliente.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AreaCliente result = areaClienteRepository.save(areaCliente);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, areaCliente.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /area-clientes} : get all the areaClientes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of areaClientes in body.
     */
    @GetMapping("/area-clientes")
    public List<AreaCliente> getAllAreaClientes() {
        log.debug("REST request to get all AreaClientes");
        return areaClienteRepository.findAll();
    }

    /**
     * {@code GET  /area-clientes/:id} : get the "id" areaCliente.
     *
     * @param id the id of the areaCliente to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the areaCliente, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/area-clientes/{id}")
    public ResponseEntity<AreaCliente> getAreaCliente(@PathVariable Long id) {
        log.debug("REST request to get AreaCliente : {}", id);
        Optional<AreaCliente> areaCliente = areaClienteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(areaCliente);
    }

    /**
     * {@code DELETE  /area-clientes/:id} : delete the "id" areaCliente.
     *
     * @param id the id of the areaCliente to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/area-clientes/{id}")
    public ResponseEntity<Void> deleteAreaCliente(@PathVariable Long id) {
        log.debug("REST request to delete AreaCliente : {}", id);
        areaClienteRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
