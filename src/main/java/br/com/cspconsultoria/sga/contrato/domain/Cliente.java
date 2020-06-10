package br.com.cspconsultoria.sga.contrato.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Cliente.
 */
@Entity
@Table(name = "cliente")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Cliente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cnpj")
    private Long cnpj;

    @Column(name = "razao_social")
    private String razaoSocial;

    @Column(name = "nome_fantasia")
    private String nomeFantasia;

    @Column(name = "postal_code")
    private String postalCode;

    @Column(name = "city")
    private String city;

    @Column(name = "state_province")
    private String stateProvince;

    @OneToMany(mappedBy = "cliente")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<AreaCliente> areaClientes = new HashSet<>();

    @OneToMany(mappedBy = "cliente")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Proposta> propostas = new HashSet<>();

    @OneToMany(mappedBy = "cliente")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Negociacao> negociacaos = new HashSet<>();

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

    public Cliente cnpj(Long cnpj) {
        this.cnpj = cnpj;
        return this;
    }

    public void setCnpj(Long cnpj) {
        this.cnpj = cnpj;
    }

    public String getRazaoSocial() {
        return razaoSocial;
    }

    public Cliente razaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
        return this;
    }

    public void setRazaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
    }

    public String getNomeFantasia() {
        return nomeFantasia;
    }

    public Cliente nomeFantasia(String nomeFantasia) {
        this.nomeFantasia = nomeFantasia;
        return this;
    }

    public void setNomeFantasia(String nomeFantasia) {
        this.nomeFantasia = nomeFantasia;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public Cliente postalCode(String postalCode) {
        this.postalCode = postalCode;
        return this;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return city;
    }

    public Cliente city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStateProvince() {
        return stateProvince;
    }

    public Cliente stateProvince(String stateProvince) {
        this.stateProvince = stateProvince;
        return this;
    }

    public void setStateProvince(String stateProvince) {
        this.stateProvince = stateProvince;
    }

    public Set<AreaCliente> getAreaClientes() {
        return areaClientes;
    }

    public Cliente areaClientes(Set<AreaCliente> areaClientes) {
        this.areaClientes = areaClientes;
        return this;
    }

    public Cliente addAreaCliente(AreaCliente areaCliente) {
        this.areaClientes.add(areaCliente);
        areaCliente.setCliente(this);
        return this;
    }

    public Cliente removeAreaCliente(AreaCliente areaCliente) {
        this.areaClientes.remove(areaCliente);
        areaCliente.setCliente(null);
        return this;
    }

    public void setAreaClientes(Set<AreaCliente> areaClientes) {
        this.areaClientes = areaClientes;
    }

    public Set<Proposta> getPropostas() {
        return propostas;
    }

    public Cliente propostas(Set<Proposta> propostas) {
        this.propostas = propostas;
        return this;
    }

    public Cliente addProposta(Proposta proposta) {
        this.propostas.add(proposta);
        proposta.setCliente(this);
        return this;
    }

    public Cliente removeProposta(Proposta proposta) {
        this.propostas.remove(proposta);
        proposta.setCliente(null);
        return this;
    }

    public void setPropostas(Set<Proposta> propostas) {
        this.propostas = propostas;
    }

    public Set<Negociacao> getNegociacaos() {
        return negociacaos;
    }

    public Cliente negociacaos(Set<Negociacao> negociacaos) {
        this.negociacaos = negociacaos;
        return this;
    }

    public Cliente addNegociacao(Negociacao negociacao) {
        this.negociacaos.add(negociacao);
        negociacao.setCliente(this);
        return this;
    }

    public Cliente removeNegociacao(Negociacao negociacao) {
        this.negociacaos.remove(negociacao);
        negociacao.setCliente(null);
        return this;
    }

    public void setNegociacaos(Set<Negociacao> negociacaos) {
        this.negociacaos = negociacaos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cliente)) {
            return false;
        }
        return id != null && id.equals(((Cliente) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Cliente{" +
            "id=" + getId() +
            ", cnpj=" + getCnpj() +
            ", razaoSocial='" + getRazaoSocial() + "'" +
            ", nomeFantasia='" + getNomeFantasia() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", city='" + getCity() + "'" +
            ", stateProvince='" + getStateProvince() + "'" +
            "}";
    }
}
