package br.com.cspconsultoria.sga.contrato.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Evento.
 */
@Entity
@Table(name = "evento")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Evento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_emissao")
    private Instant dataEmissao;

    @Column(name = "data_vencimento")
    private Instant dataVencimento;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "valor")
    private String valor;

    @ManyToOne
    @JsonIgnoreProperties(value = "eventos", allowSetters = true)
    private Proposta proposta;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDataEmissao() {
        return dataEmissao;
    }

    public Evento dataEmissao(Instant dataEmissao) {
        this.dataEmissao = dataEmissao;
        return this;
    }

    public void setDataEmissao(Instant dataEmissao) {
        this.dataEmissao = dataEmissao;
    }

    public Instant getDataVencimento() {
        return dataVencimento;
    }

    public Evento dataVencimento(Instant dataVencimento) {
        this.dataVencimento = dataVencimento;
        return this;
    }

    public void setDataVencimento(Instant dataVencimento) {
        this.dataVencimento = dataVencimento;
    }

    public String getDescricao() {
        return descricao;
    }

    public Evento descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getValor() {
        return valor;
    }

    public Evento valor(String valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(String valor) {
        this.valor = valor;
    }

    public Proposta getProposta() {
        return proposta;
    }

    public Evento proposta(Proposta proposta) {
        this.proposta = proposta;
        return this;
    }

    public void setProposta(Proposta proposta) {
        this.proposta = proposta;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Evento)) {
            return false;
        }
        return id != null && id.equals(((Evento) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Evento{" +
            "id=" + getId() +
            ", dataEmissao='" + getDataEmissao() + "'" +
            ", dataVencimento='" + getDataVencimento() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", valor='" + getValor() + "'" +
            "}";
    }
}
