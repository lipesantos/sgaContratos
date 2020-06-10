package br.com.cspconsultoria.sga.contrato.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Negociacao.
 */
@Entity
@Table(name = "negociacao")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Negociacao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data")
    private Instant data;

    @Column(name = "descricao")
    private String descricao;

    @ManyToOne
    @JsonIgnoreProperties(value = "negociacaos", allowSetters = true)
    private Cliente cliente;

    @ManyToMany(mappedBy = "negociacoes")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Proposta> propostas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getData() {
        return data;
    }

    public Negociacao data(Instant data) {
        this.data = data;
        return this;
    }

    public void setData(Instant data) {
        this.data = data;
    }

    public String getDescricao() {
        return descricao;
    }

    public Negociacao descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public Negociacao cliente(Cliente cliente) {
        this.cliente = cliente;
        return this;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Set<Proposta> getPropostas() {
        return propostas;
    }

    public Negociacao propostas(Set<Proposta> propostas) {
        this.propostas = propostas;
        return this;
    }

    public Negociacao addPropostas(Proposta proposta) {
        this.propostas.add(proposta);
        proposta.getNegociacoes().add(this);
        return this;
    }

    public Negociacao removePropostas(Proposta proposta) {
        this.propostas.remove(proposta);
        proposta.getNegociacoes().remove(this);
        return this;
    }

    public void setPropostas(Set<Proposta> propostas) {
        this.propostas = propostas;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Negociacao)) {
            return false;
        }
        return id != null && id.equals(((Negociacao) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Negociacao{" +
            "id=" + getId() +
            ", data='" + getData() + "'" +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
