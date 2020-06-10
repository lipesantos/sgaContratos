package br.com.cspconsultoria.sga.contrato.web.rest;

import br.com.cspconsultoria.sga.contrato.SgaContratosApp;
import br.com.cspconsultoria.sga.contrato.domain.AreaCliente;
import br.com.cspconsultoria.sga.contrato.repository.AreaClienteRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AreaClienteResource} REST controller.
 */
@SpringBootTest(classes = SgaContratosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AreaClienteResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private AreaClienteRepository areaClienteRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAreaClienteMockMvc;

    private AreaCliente areaCliente;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AreaCliente createEntity(EntityManager em) {
        AreaCliente areaCliente = new AreaCliente()
            .nome(DEFAULT_NOME);
        return areaCliente;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AreaCliente createUpdatedEntity(EntityManager em) {
        AreaCliente areaCliente = new AreaCliente()
            .nome(UPDATED_NOME);
        return areaCliente;
    }

    @BeforeEach
    public void initTest() {
        areaCliente = createEntity(em);
    }

    @Test
    @Transactional
    public void createAreaCliente() throws Exception {
        int databaseSizeBeforeCreate = areaClienteRepository.findAll().size();
        // Create the AreaCliente
        restAreaClienteMockMvc.perform(post("/api/area-clientes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(areaCliente)))
            .andExpect(status().isCreated());

        // Validate the AreaCliente in the database
        List<AreaCliente> areaClienteList = areaClienteRepository.findAll();
        assertThat(areaClienteList).hasSize(databaseSizeBeforeCreate + 1);
        AreaCliente testAreaCliente = areaClienteList.get(areaClienteList.size() - 1);
        assertThat(testAreaCliente.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createAreaClienteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = areaClienteRepository.findAll().size();

        // Create the AreaCliente with an existing ID
        areaCliente.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAreaClienteMockMvc.perform(post("/api/area-clientes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(areaCliente)))
            .andExpect(status().isBadRequest());

        // Validate the AreaCliente in the database
        List<AreaCliente> areaClienteList = areaClienteRepository.findAll();
        assertThat(areaClienteList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = areaClienteRepository.findAll().size();
        // set the field null
        areaCliente.setNome(null);

        // Create the AreaCliente, which fails.


        restAreaClienteMockMvc.perform(post("/api/area-clientes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(areaCliente)))
            .andExpect(status().isBadRequest());

        List<AreaCliente> areaClienteList = areaClienteRepository.findAll();
        assertThat(areaClienteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAreaClientes() throws Exception {
        // Initialize the database
        areaClienteRepository.saveAndFlush(areaCliente);

        // Get all the areaClienteList
        restAreaClienteMockMvc.perform(get("/api/area-clientes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(areaCliente.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)));
    }
    
    @Test
    @Transactional
    public void getAreaCliente() throws Exception {
        // Initialize the database
        areaClienteRepository.saveAndFlush(areaCliente);

        // Get the areaCliente
        restAreaClienteMockMvc.perform(get("/api/area-clientes/{id}", areaCliente.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(areaCliente.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME));
    }
    @Test
    @Transactional
    public void getNonExistingAreaCliente() throws Exception {
        // Get the areaCliente
        restAreaClienteMockMvc.perform(get("/api/area-clientes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAreaCliente() throws Exception {
        // Initialize the database
        areaClienteRepository.saveAndFlush(areaCliente);

        int databaseSizeBeforeUpdate = areaClienteRepository.findAll().size();

        // Update the areaCliente
        AreaCliente updatedAreaCliente = areaClienteRepository.findById(areaCliente.getId()).get();
        // Disconnect from session so that the updates on updatedAreaCliente are not directly saved in db
        em.detach(updatedAreaCliente);
        updatedAreaCliente
            .nome(UPDATED_NOME);

        restAreaClienteMockMvc.perform(put("/api/area-clientes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAreaCliente)))
            .andExpect(status().isOk());

        // Validate the AreaCliente in the database
        List<AreaCliente> areaClienteList = areaClienteRepository.findAll();
        assertThat(areaClienteList).hasSize(databaseSizeBeforeUpdate);
        AreaCliente testAreaCliente = areaClienteList.get(areaClienteList.size() - 1);
        assertThat(testAreaCliente.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingAreaCliente() throws Exception {
        int databaseSizeBeforeUpdate = areaClienteRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAreaClienteMockMvc.perform(put("/api/area-clientes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(areaCliente)))
            .andExpect(status().isBadRequest());

        // Validate the AreaCliente in the database
        List<AreaCliente> areaClienteList = areaClienteRepository.findAll();
        assertThat(areaClienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAreaCliente() throws Exception {
        // Initialize the database
        areaClienteRepository.saveAndFlush(areaCliente);

        int databaseSizeBeforeDelete = areaClienteRepository.findAll().size();

        // Delete the areaCliente
        restAreaClienteMockMvc.perform(delete("/api/area-clientes/{id}", areaCliente.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AreaCliente> areaClienteList = areaClienteRepository.findAll();
        assertThat(areaClienteList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
