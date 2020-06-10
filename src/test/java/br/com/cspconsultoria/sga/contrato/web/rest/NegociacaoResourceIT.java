package br.com.cspconsultoria.sga.contrato.web.rest;

import br.com.cspconsultoria.sga.contrato.SgaContratosApp;
import br.com.cspconsultoria.sga.contrato.domain.Negociacao;
import br.com.cspconsultoria.sga.contrato.repository.NegociacaoRepository;

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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link NegociacaoResource} REST controller.
 */
@SpringBootTest(classes = SgaContratosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class NegociacaoResourceIT {

    private static final Instant DEFAULT_DATA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    @Autowired
    private NegociacaoRepository negociacaoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNegociacaoMockMvc;

    private Negociacao negociacao;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Negociacao createEntity(EntityManager em) {
        Negociacao negociacao = new Negociacao()
            .data(DEFAULT_DATA)
            .descricao(DEFAULT_DESCRICAO);
        return negociacao;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Negociacao createUpdatedEntity(EntityManager em) {
        Negociacao negociacao = new Negociacao()
            .data(UPDATED_DATA)
            .descricao(UPDATED_DESCRICAO);
        return negociacao;
    }

    @BeforeEach
    public void initTest() {
        negociacao = createEntity(em);
    }

    @Test
    @Transactional
    public void createNegociacao() throws Exception {
        int databaseSizeBeforeCreate = negociacaoRepository.findAll().size();
        // Create the Negociacao
        restNegociacaoMockMvc.perform(post("/api/negociacaos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(negociacao)))
            .andExpect(status().isCreated());

        // Validate the Negociacao in the database
        List<Negociacao> negociacaoList = negociacaoRepository.findAll();
        assertThat(negociacaoList).hasSize(databaseSizeBeforeCreate + 1);
        Negociacao testNegociacao = negociacaoList.get(negociacaoList.size() - 1);
        assertThat(testNegociacao.getData()).isEqualTo(DEFAULT_DATA);
        assertThat(testNegociacao.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
    }

    @Test
    @Transactional
    public void createNegociacaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = negociacaoRepository.findAll().size();

        // Create the Negociacao with an existing ID
        negociacao.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNegociacaoMockMvc.perform(post("/api/negociacaos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(negociacao)))
            .andExpect(status().isBadRequest());

        // Validate the Negociacao in the database
        List<Negociacao> negociacaoList = negociacaoRepository.findAll();
        assertThat(negociacaoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllNegociacaos() throws Exception {
        // Initialize the database
        negociacaoRepository.saveAndFlush(negociacao);

        // Get all the negociacaoList
        restNegociacaoMockMvc.perform(get("/api/negociacaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(negociacao.getId().intValue())))
            .andExpect(jsonPath("$.[*].data").value(hasItem(DEFAULT_DATA.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)));
    }
    
    @Test
    @Transactional
    public void getNegociacao() throws Exception {
        // Initialize the database
        negociacaoRepository.saveAndFlush(negociacao);

        // Get the negociacao
        restNegociacaoMockMvc.perform(get("/api/negociacaos/{id}", negociacao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(negociacao.getId().intValue()))
            .andExpect(jsonPath("$.data").value(DEFAULT_DATA.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO));
    }
    @Test
    @Transactional
    public void getNonExistingNegociacao() throws Exception {
        // Get the negociacao
        restNegociacaoMockMvc.perform(get("/api/negociacaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNegociacao() throws Exception {
        // Initialize the database
        negociacaoRepository.saveAndFlush(negociacao);

        int databaseSizeBeforeUpdate = negociacaoRepository.findAll().size();

        // Update the negociacao
        Negociacao updatedNegociacao = negociacaoRepository.findById(negociacao.getId()).get();
        // Disconnect from session so that the updates on updatedNegociacao are not directly saved in db
        em.detach(updatedNegociacao);
        updatedNegociacao
            .data(UPDATED_DATA)
            .descricao(UPDATED_DESCRICAO);

        restNegociacaoMockMvc.perform(put("/api/negociacaos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedNegociacao)))
            .andExpect(status().isOk());

        // Validate the Negociacao in the database
        List<Negociacao> negociacaoList = negociacaoRepository.findAll();
        assertThat(negociacaoList).hasSize(databaseSizeBeforeUpdate);
        Negociacao testNegociacao = negociacaoList.get(negociacaoList.size() - 1);
        assertThat(testNegociacao.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testNegociacao.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
    }

    @Test
    @Transactional
    public void updateNonExistingNegociacao() throws Exception {
        int databaseSizeBeforeUpdate = negociacaoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNegociacaoMockMvc.perform(put("/api/negociacaos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(negociacao)))
            .andExpect(status().isBadRequest());

        // Validate the Negociacao in the database
        List<Negociacao> negociacaoList = negociacaoRepository.findAll();
        assertThat(negociacaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNegociacao() throws Exception {
        // Initialize the database
        negociacaoRepository.saveAndFlush(negociacao);

        int databaseSizeBeforeDelete = negociacaoRepository.findAll().size();

        // Delete the negociacao
        restNegociacaoMockMvc.perform(delete("/api/negociacaos/{id}", negociacao.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Negociacao> negociacaoList = negociacaoRepository.findAll();
        assertThat(negociacaoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
