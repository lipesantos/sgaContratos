package br.com.cspconsultoria.sga.contrato.web.rest;

import br.com.cspconsultoria.sga.contrato.SgaContratosApp;
import br.com.cspconsultoria.sga.contrato.domain.UnidadeComercial;
import br.com.cspconsultoria.sga.contrato.repository.UnidadeComercialRepository;

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
 * Integration tests for the {@link UnidadeComercialResource} REST controller.
 */
@SpringBootTest(classes = SgaContratosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class UnidadeComercialResourceIT {

    private static final Long DEFAULT_CNPJ = 1L;
    private static final Long UPDATED_CNPJ = 2L;

    private static final String DEFAULT_RAZAO_SOCIAL = "AAAAAAAAAA";
    private static final String UPDATED_RAZAO_SOCIAL = "BBBBBBBBBB";

    @Autowired
    private UnidadeComercialRepository unidadeComercialRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUnidadeComercialMockMvc;

    private UnidadeComercial unidadeComercial;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UnidadeComercial createEntity(EntityManager em) {
        UnidadeComercial unidadeComercial = new UnidadeComercial()
            .cnpj(DEFAULT_CNPJ)
            .razaoSocial(DEFAULT_RAZAO_SOCIAL);
        return unidadeComercial;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UnidadeComercial createUpdatedEntity(EntityManager em) {
        UnidadeComercial unidadeComercial = new UnidadeComercial()
            .cnpj(UPDATED_CNPJ)
            .razaoSocial(UPDATED_RAZAO_SOCIAL);
        return unidadeComercial;
    }

    @BeforeEach
    public void initTest() {
        unidadeComercial = createEntity(em);
    }

    @Test
    @Transactional
    public void createUnidadeComercial() throws Exception {
        int databaseSizeBeforeCreate = unidadeComercialRepository.findAll().size();
        // Create the UnidadeComercial
        restUnidadeComercialMockMvc.perform(post("/api/unidade-comercials").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(unidadeComercial)))
            .andExpect(status().isCreated());

        // Validate the UnidadeComercial in the database
        List<UnidadeComercial> unidadeComercialList = unidadeComercialRepository.findAll();
        assertThat(unidadeComercialList).hasSize(databaseSizeBeforeCreate + 1);
        UnidadeComercial testUnidadeComercial = unidadeComercialList.get(unidadeComercialList.size() - 1);
        assertThat(testUnidadeComercial.getCnpj()).isEqualTo(DEFAULT_CNPJ);
        assertThat(testUnidadeComercial.getRazaoSocial()).isEqualTo(DEFAULT_RAZAO_SOCIAL);
    }

    @Test
    @Transactional
    public void createUnidadeComercialWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = unidadeComercialRepository.findAll().size();

        // Create the UnidadeComercial with an existing ID
        unidadeComercial.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUnidadeComercialMockMvc.perform(post("/api/unidade-comercials").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(unidadeComercial)))
            .andExpect(status().isBadRequest());

        // Validate the UnidadeComercial in the database
        List<UnidadeComercial> unidadeComercialList = unidadeComercialRepository.findAll();
        assertThat(unidadeComercialList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllUnidadeComercials() throws Exception {
        // Initialize the database
        unidadeComercialRepository.saveAndFlush(unidadeComercial);

        // Get all the unidadeComercialList
        restUnidadeComercialMockMvc.perform(get("/api/unidade-comercials?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(unidadeComercial.getId().intValue())))
            .andExpect(jsonPath("$.[*].cnpj").value(hasItem(DEFAULT_CNPJ.intValue())))
            .andExpect(jsonPath("$.[*].razaoSocial").value(hasItem(DEFAULT_RAZAO_SOCIAL)));
    }
    
    @Test
    @Transactional
    public void getUnidadeComercial() throws Exception {
        // Initialize the database
        unidadeComercialRepository.saveAndFlush(unidadeComercial);

        // Get the unidadeComercial
        restUnidadeComercialMockMvc.perform(get("/api/unidade-comercials/{id}", unidadeComercial.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(unidadeComercial.getId().intValue()))
            .andExpect(jsonPath("$.cnpj").value(DEFAULT_CNPJ.intValue()))
            .andExpect(jsonPath("$.razaoSocial").value(DEFAULT_RAZAO_SOCIAL));
    }
    @Test
    @Transactional
    public void getNonExistingUnidadeComercial() throws Exception {
        // Get the unidadeComercial
        restUnidadeComercialMockMvc.perform(get("/api/unidade-comercials/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUnidadeComercial() throws Exception {
        // Initialize the database
        unidadeComercialRepository.saveAndFlush(unidadeComercial);

        int databaseSizeBeforeUpdate = unidadeComercialRepository.findAll().size();

        // Update the unidadeComercial
        UnidadeComercial updatedUnidadeComercial = unidadeComercialRepository.findById(unidadeComercial.getId()).get();
        // Disconnect from session so that the updates on updatedUnidadeComercial are not directly saved in db
        em.detach(updatedUnidadeComercial);
        updatedUnidadeComercial
            .cnpj(UPDATED_CNPJ)
            .razaoSocial(UPDATED_RAZAO_SOCIAL);

        restUnidadeComercialMockMvc.perform(put("/api/unidade-comercials").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedUnidadeComercial)))
            .andExpect(status().isOk());

        // Validate the UnidadeComercial in the database
        List<UnidadeComercial> unidadeComercialList = unidadeComercialRepository.findAll();
        assertThat(unidadeComercialList).hasSize(databaseSizeBeforeUpdate);
        UnidadeComercial testUnidadeComercial = unidadeComercialList.get(unidadeComercialList.size() - 1);
        assertThat(testUnidadeComercial.getCnpj()).isEqualTo(UPDATED_CNPJ);
        assertThat(testUnidadeComercial.getRazaoSocial()).isEqualTo(UPDATED_RAZAO_SOCIAL);
    }

    @Test
    @Transactional
    public void updateNonExistingUnidadeComercial() throws Exception {
        int databaseSizeBeforeUpdate = unidadeComercialRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUnidadeComercialMockMvc.perform(put("/api/unidade-comercials").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(unidadeComercial)))
            .andExpect(status().isBadRequest());

        // Validate the UnidadeComercial in the database
        List<UnidadeComercial> unidadeComercialList = unidadeComercialRepository.findAll();
        assertThat(unidadeComercialList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUnidadeComercial() throws Exception {
        // Initialize the database
        unidadeComercialRepository.saveAndFlush(unidadeComercial);

        int databaseSizeBeforeDelete = unidadeComercialRepository.findAll().size();

        // Delete the unidadeComercial
        restUnidadeComercialMockMvc.perform(delete("/api/unidade-comercials/{id}", unidadeComercial.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UnidadeComercial> unidadeComercialList = unidadeComercialRepository.findAll();
        assertThat(unidadeComercialList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
