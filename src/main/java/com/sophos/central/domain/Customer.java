package com.sophos.central.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Customer.
 */
@Entity
@Table(name = "customer")
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    private Partner partner;

    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    private Set<Endpoint> endpoints = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Customer name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Partner getPartner() {
        return partner;
    }

    public Customer partner(Partner partner) {
        this.partner = partner;
        return this;
    }

    public void setPartner(Partner partner) {
        this.partner = partner;
    }

    public Set<Endpoint> getEndpoints() {
        return endpoints;
    }

    public Customer endpoints(Set<Endpoint> endpoints) {
        this.endpoints = endpoints;
        return this;
    }

    public Customer addEndpoint(Endpoint endpoint) {
        this.endpoints.add(endpoint);
        endpoint.setCustomer(this);
        return this;
    }

    public Customer removeEndpoint(Endpoint endpoint) {
        this.endpoints.remove(endpoint);
        endpoint.setCustomer(null);
        return this;
    }

    public void setEndpoints(Set<Endpoint> endpoints) {
        this.endpoints = endpoints;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Customer customer = (Customer) o;
        if (customer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Customer{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
