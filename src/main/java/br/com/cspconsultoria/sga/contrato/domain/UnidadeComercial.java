package br.com.cspconsultoria.sga.contrato.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A UnidadeComercial.
 */
@Entity
@Table(name = "unidade_comercial")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class UnidadeComercial implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cnpj")
    private Long cnpj;

    @Column(name = "razao_social")
    private String razaoSocial;

    @OneToMany(mappedBy = "unidadeComercial")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Proposta> propostas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCnpj() {
        return cnpj;
    }

    public UnidadeComercial cnpj(Long cnpj) {
        this.cnpj = cnpj;
        return this;
    }

    public void setCnpj(Long cnpj) {
        this.cnpj = cnpj;
    }

    public String getRazaoSocial() {
        return razaoSocial;
    }

    public UnidadeComercial razaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
        return this;
    }

    public void setRazaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
    }

    public Set<Proposta> getPropostas() {
        return propostas;
    }

    public UnidadeComercial propostas(Set<Proposta> propostas) {
        this.propostas = propostas;
        return this;
    }

    public UnidadeComercial addProposta(Proposta proposta) {
        this.propostas.add(proposta);
        proposta.setUnidadeComercial(this);
        return this;
    }

    public UnidadeComercial removeProposta(Proposta proposta) {
        this.propostas.remove(proposta);
        proposta.setUnidadeComercial(null);
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
        if (!(o instanceof UnidadeComercial)) {
            return false;
        }
        return id != null && id.equals(((UnidadeComercial) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UnidadeComercial{" +
            "id=" + getId() +
            ", cnpj=" + getCnpj() +
            ", razaoSocial='" + getRazaoSocial() + "'" +
            "}";
    }
}
