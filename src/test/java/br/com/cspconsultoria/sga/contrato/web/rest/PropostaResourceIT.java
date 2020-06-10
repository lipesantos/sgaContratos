package br.com.cspconsultoria.sga.contrato.web.rest;

import br.com.cspconsultoria.sga.contrato.SgaContratosApp;
import br.com.cspconsultoria.sga.contrato.domain.Proposta;
import br.com.cspconsultoria.sga.contrato.repository.PropostaRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.com.cspconsultoria.sga.contrato.domain.enumeration.TipoProposta;
/**
 * Integration tests for the {@link PropostaResource} REST controller.
 */
@SpringBootTest(classes = SgaContratosApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class PropostaResourceIT {

    private static final TipoProposta DEFAULT_TIPO = TipoProposta.PROJETO;
    private static final TipoProposta UPDATED_TIPO = TipoProposta.ALOCACAO;

    private static final Instant DEFAULT_DATA_INICIO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_INICIO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATA_FIM = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_FIM = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_REFERENCIA = "AAAAAAAAAA";
    private static final String UPDATED_REFERENCIA = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRICAO_CONTRATO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO_CONTRATO = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRICAO_PROPOSTA = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO_PROPOSTA = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_VALOR_INICIAL = new BigDecimal(1);
    private static final BigDecimal UPDATED_VALOR_INICIAL = new BigDecimal(2);

    @Autowired
    private PropostaRepository propostaRepository;

    @Mock
    private PropostaRepository propostaRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPropostaMockMvc;

    private Proposta proposta;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Proposta createEntity(EntityManager em) {
        Proposta proposta = new Proposta()
            .tipo(DEFAULT_TIPO)
            .dataInicio(DEFAULT_DATA_INICIO)
            .dataFim(DEFAULT_DATA_FIM)
            .referencia(DEFAULT_REFERENCIA)
            .descricaoContrato(DEFAULT_DESCRICAO_CONTRATO)
            .descricaoProposta(DEFAULT_DESCRICAO_PROPOSTA)
            .valorInicial(DEFAULT_VALOR_INICIAL);
        return proposta;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Proposta createUpdatedEntity(EntityManager em) {
        Proposta proposta = new Proposta()
            .tipo(UPDATED_TIPO)
            .dataInicio(UPDATED_DATA_INICIO)
            .dataFim(UPDATED_DATA_FIM)
            .referencia(UPDATED_REFERENCIA)
            .descricaoContrato(UPDATED_DESCRICAO_CONTRATO)
            .descricaoProposta(UPDATED_DESCRICAO_PROPOSTA)
            .valorInicial(UPDATED_VALOR_INICIAL);
        return proposta;
    }

    @BeforeEach
    public void initTest() {
        proposta = createEntity(em);
    }

    @Test
    @Transactional
    public void createProposta() throws Exception {
        int databaseSizeBeforeCreate = propostaRepository.findAll().size();
        // Create the Proposta
        restPropostaMockMvc.perform(post("/api/propostas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(proposta)))
            .andExpect(status().isCreated());

        // Validate the Proposta in the database
        List<Proposta> propostaList = propostaRepository.findAll();
        assertThat(propostaList).hasSize(databaseSizeBeforeCreate + 1);
        Proposta testProposta = propostaList.get(propostaList.size() - 1);
        assertThat(testProposta.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testProposta.getDataInicio()).isEqualTo(DEFAULT_DATA_INICIO);
        assertThat(testProposta.getDataFim()).isEqualTo(DEFAULT_DATA_FIM);
        assertThat(testProposta.getReferencia()).isEqualTo(DEFAULT_REFERENCIA);
        assertThat(testProposta.getDescricaoContrato()).isEqualTo(DEFAULT_DESCRICAO_CONTRATO);
        assertThat(testProposta.getDescricaoProposta()).isEqualTo(DEFAULT_DESCRICAO_PROPOSTA);
        assertThat(testProposta.getValorInicial()).isEqualTo(DEFAULT_VALOR_INICIAL);
    }

    @Test
    @Transactional
    public void createPropostaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = propostaRepository.findAll().size();

        // Create the Proposta with an existing ID
        proposta.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPropostaMockMvc.perform(post("/api/propostas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(proposta)))
            .andExpect(status().isBadRequest());

        // Validate the Proposta in the database
        List<Proposta> propostaList = propostaRepository.findAll();
        assertThat(propostaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPropostas() throws Exception {
        // Initialize the database
        propostaRepository.saveAndFlush(proposta);

        // Get all the propostaList
        restPropostaMockMvc.perform(get("/api/propostas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(proposta.getId().intValue())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())))
            .andExpect(jsonPath("$.[*].dataInicio").value(hasItem(DEFAULT_DATA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].dataFim").value(hasItem(DEFAULT_DATA_FIM.toString())))
            .andExpect(jsonPath("$.[*].referencia").value(hasItem(DEFAULT_REFERENCIA)))
            .andExpect(jsonPath("$.[*].descricaoContrato").value(hasItem(DEFAULT_DESCRICAO_CONTRATO)))
            .andExpect(jsonPath("$.[*].descricaoProposta").value(hasItem(DEFAULT_DESCRICAO_PROPOSTA)))
            .andExpect(jsonPath("$.[*].valorInicial").value(hasItem(DEFAULT_VALOR_INICIAL.intValue())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllPropostasWithEagerRelationshipsIsEnabled() throws Exception {
        when(propostaRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPropostaMockMvc.perform(get("/api/propostas?eagerload=true"))
            .andExpect(status().isOk());

        verify(propostaRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllPropostasWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(propostaRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPropostaMockMvc.perform(get("/api/propostas?eagerload=true"))
            .andExpect(status().isOk());

        verify(propostaRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getProposta() throws Exception {
        // Initialize the database
        propostaRepository.saveAndFlush(proposta);

        // Get the proposta
        restPropostaMockMvc.perform(get("/api/propostas/{id}", proposta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(proposta.getId().intValue()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()))
            .andExpect(jsonPath("$.dataInicio").value(DEFAULT_DATA_INICIO.toString()))
            .andExpect(jsonPath("$.dataFim").value(DEFAULT_DATA_FIM.toString()))
            .andExpect(jsonPath("$.referencia").value(DEFAULT_REFERENCIA))
            .andExpect(jsonPath("$.descricaoContrato").value(DEFAULT_DESCRICAO_CONTRATO))
            .andExpect(jsonPath("$.descricaoProposta").value(DEFAULT_DESCRICAO_PROPOSTA))
            .andExpect(jsonPath("$.valorInicial").value(DEFAULT_VALOR_INICIAL.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingProposta() throws Exception {
        // Get the proposta
        restPropostaMockMvc.perform(get("/api/propostas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProposta() throws Exception {
        // Initialize the database
        propostaRepository.saveAndFlush(proposta);

        int databaseSizeBeforeUpdate = propostaRepository.findAll().size();

        // Update the proposta
        Proposta updatedProposta = propostaRepository.findById(proposta.getId()).get();
        // Disconnect from session so that the updates on updatedProposta are not directly saved in db
        em.detach(updatedProposta);
        updatedProposta
            .tipo(UPDATED_TIPO)
            .dataInicio(UPDATED_DATA_INICIO)
            .dataFim(UPDATED_DATA_FIM)
            .referencia(UPDATED_REFERENCIA)
            .descricaoContrato(UPDATED_DESCRICAO_CONTRATO)
            .descricaoProposta(UPDATED_DESCRICAO_PROPOSTA)
            .valorInicial(UPDATED_VALOR_INICIAL);

        restPropostaMockMvc.perform(put("/api/propostas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProposta)))
            .andExpect(status().isOk());

        // Validate the Proposta in the database
        List<Proposta> propostaList = propostaRepository.findAll();
        assertThat(propostaList).hasSize(databaseSizeBeforeUpdate);
        Proposta testProposta = propostaList.get(propostaList.size() - 1);
        assertThat(testProposta.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testProposta.getDataInicio()).isEqualTo(UPDATED_DATA_INICIO);
        assertThat(testProposta.getDataFim()).isEqualTo(UPDATED_DATA_FIM);
        assertThat(testProposta.getReferencia()).isEqualTo(UPDATED_REFERENCIA);
        assertThat(testProposta.getDescricaoContrato()).isEqualTo(UPDATED_DESCRICAO_CONTRATO);
        assertThat(testProposta.getDescricaoProposta()).isEqualTo(UPDATED_DESCRICAO_PROPOSTA);
        assertThat(testProposta.getValorInicial()).isEqualTo(UPDATED_VALOR_INICIAL);
    }

    @Test
    @Transactional
    public void updateNonExistingProposta() throws Exception {
        int databaseSizeBeforeUpdate = propostaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPropostaMockMvc.perform(put("/api/propostas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(proposta)))
            .andExpect(status().isBadRequest());

        // Validate the Proposta in the database
        List<Proposta> propostaList = propostaRepository.findAll();
        assertThat(propostaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProposta() throws Exception {
        // Initialize the database
        propostaRepository.saveAndFlush(proposta);

        int databaseSizeBeforeDelete = propostaRepository.findAll().size();

        // Delete the proposta
        restPropostaMockMvc.perform(delete("/api/propostas/{id}", proposta.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Proposta> propostaList = propostaRepository.findAll();
        assertThat(propostaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
