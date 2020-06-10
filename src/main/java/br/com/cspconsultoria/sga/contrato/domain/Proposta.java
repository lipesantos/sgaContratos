package br.com.cspconsultoria.sga.contrato.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import br.com.cspconsultoria.sga.contrato.domain.enumeration.TipoProposta;

/**
 * A Proposta.
 */
@Entity
@Table(name = "proposta")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Proposta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private TipoProposta tipo;

    @Column(name = "data_inicio")
    private Instant dataInicio;

    @Column(name = "data_fim")
    private Instant dataFim;

    @Column(name = "referencia")
    private String referencia;

    @Column(name = "descricao_contrato")
    private String descricaoContrato;

    @Column(name = "descricao_proposta")
    private String descricaoProposta;

    @Column(name = "valor_inicial", precision = 21, scale = 2)
    private BigDecimal valorInicial;

    @OneToMany(mappedBy = "proposta")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Evento> eventos = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "propostas", allowSetters = true)
    private Cliente cliente;

    @ManyToOne
    @JsonIgnoreProperties(value = "propostas", allowSetters = true)
    private UnidadeComercial unidadeComercial;

    @ManyToOne
    @JsonIgnoreProperties(value = "propostas", allowSetters = true)
    private AreaCliente areaCliente;

    @ManyToMany(mappedBy = "propostas")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Negociacao> negociacoes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TipoProposta getTipo() {
        return tipo;
    }

    public Proposta tipo(TipoProposta tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(TipoProposta tipo) {
        this.tipo = tipo;
    }

    public Instant getDataInicio() {
        return dataInicio;
    }

    public Proposta dataInicio(Instant dataInicio) {
        this.dataInicio = dataInicio;
        return this;
    }

    public void setDataInicio(Instant dataInicio) {
        this.dataInicio = dataInicio;
    }

    public Instant getDataFim() {
        return dataFim;
    }

    public Proposta dataFim(Instant dataFim) {
        this.dataFim = dataFim;
        return this;
    }

    public void setDataFim(Instant dataFim) {
        this.dataFim = dataFim;
    }

    public String getReferencia() {
        return referencia;
    }

    public Proposta referencia(String referencia) {
        this.referencia = referencia;
        return this;
    }

    public void setReferencia(String referencia) {
        this.referencia = referencia;
    }

    public String getDescricaoContrato() {
        return descricaoContrato;
    }

    public Proposta descricaoContrato(String descricaoContrato) {
        this.descricaoContrato = descricaoContrato;
        return this;
    }

    public void setDescricaoContrato(String descricaoContrato) {
        this.descricaoContrato = descricaoContrato;
    }

    public String getDescricaoProposta() {
        return descricaoProposta;
    }

    public Proposta descricaoProposta(String descricaoProposta) {
        this.descricaoProposta = descricaoProposta;
        return this;
    }

    public void setDescricaoProposta(String descricaoProposta) {
        this.descricaoProposta = descricaoProposta;
    }

    public BigDecimal getValorInicial() {
        return valorInicial;
    }

    public Proposta valorInicial(BigDecimal valorInicial) {
        this.valorInicial = valorInicial;
        return this;
    }

    public void setValorInicial(BigDecimal valorInicial) {
        this.valorInicial = valorInicial;
    }

    public Set<Evento> getEventos() {
        return eventos;
    }

    public Proposta eventos(Set<Evento> eventos) {
        this.eventos = eventos;
        return this;
    }

    public Proposta addEvento(Evento evento) {
        this.eventos.add(evento);
        evento.setProposta(this);
        return this;
    }

    public Proposta removeEvento(Evento evento) {
        this.eventos.remove(evento);
        evento.setProposta(null);
        return this;
    }

    public void setEventos(Set<Evento> eventos) {
        this.eventos = eventos;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public Proposta cliente(Cliente cliente) {
        this.cliente = cliente;
        return this;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public UnidadeComercial getUnidadeComercial() {
        return unidadeComercial;
    }

    public Proposta unidadeComercial(UnidadeComercial unidadeComercial) {
        this.unidadeComercial = unidadeComercial;
        return this;
    }

    public void setUnidadeComercial(UnidadeComercial unidadeComercial) {
        this.unidadeComercial = unidadeComercial;
    }

    public AreaCliente getAreaCliente() {
        return areaCliente;
    }

    public Proposta areaCliente(AreaCliente areaCliente) {
        this.areaCliente = areaCliente;
        return this;
    }

    public void setAreaCliente(AreaCliente areaCliente) {
        this.areaCliente = areaCliente;
    }

    public Set<Negociacao> getNegociacoes() {
        return negociacoes;
    }

    public Proposta negociacoes(Set<Negociacao> negociacaos) {
        this.negociacoes = negociacaos;
        return this;
    }

    public Proposta addNegociacoes(Negociacao negociacao) {
        this.negociacoes.add(negociacao);
        negociacao.getPropostas().add(this);
        return this;
    }

    public Proposta removeNegociacoes(Negociacao negociacao) {
        this.negociacoes.remove(negociacao);
        negociacao.getPropostas().remove(this);
        return this;
    }

    public void setNegociacoes(Set<Negociacao> negociacaos) {
        this.negociacoes = negociacaos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Proposta)) {
            return false;
        }
        return id != null && id.equals(((Proposta) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Proposta{" +
            "id=" + getId() +
            ", tipo='" + getTipo() + "'" +
            ", dataInicio='" + getDataInicio() + "'" +
            ", dataFim='" + getDataFim() + "'" +
            ", referencia='" + getReferencia() + "'" +
            ", descricaoContrato='" + getDescricaoContrato() + "'" +
            ", descricaoProposta='" + getDescricaoProposta() + "'" +
            ", valorInicial=" + getValorInicial() +
            "}";
    }
}
