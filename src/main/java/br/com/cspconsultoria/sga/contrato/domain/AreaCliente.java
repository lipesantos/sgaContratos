package br.com.cspconsultoria.sga.contrato.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A AreaCliente.
 */
@Entity
@Table(name = "area_cliente")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class AreaCliente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;

    @OneToMany(mappedBy = "areaCliente")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Proposta> propostas = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "areaClientes", allowSetters = true)
    private Cliente cliente;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public AreaCliente nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Set<Proposta> getPropostas() {
        return propostas;
    }

    public AreaCliente propostas(Set<Proposta> propostas) {
        this.propostas = propostas;
        return this;
    }

    public AreaCliente addProposta(Proposta proposta) {
        this.propostas.add(proposta);
        proposta.setAreaCliente(this);
        return this;
    }

    public AreaCliente removeProposta(Proposta proposta) {
        this.propostas.remove(proposta);
        proposta.setAreaCliente(null);
        return this;
    }

    public void setPropostas(Set<Proposta> propostas) {
        this.propostas = propostas;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public AreaCliente cliente(Cliente cliente) {
        this.cliente = cliente;
        return this;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AreaCliente)) {
            return false;
        }
        return id != null && id.equals(((AreaCliente) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AreaCliente{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
