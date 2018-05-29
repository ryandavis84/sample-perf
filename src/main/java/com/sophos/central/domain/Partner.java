package com.sophos.central.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Partner.
 */
@Entity
@Table(name = "partner")
public class Partner implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "partner")
    @JsonIgnore
    private Set<Customer> customers = new HashSet<>();

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

    public Partner name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Customer> getCustomers() {
        return customers;
    }

    public Partner customers(Set<Customer> customers) {
        this.customers = customers;
        return this;
    }

    public Partner addCustomer(Customer customer) {
        this.customers.add(customer);
        customer.setPartner(this);
        return this;
    }

    public Partner removeCustomer(Customer customer) {
        this.customers.remove(customer);
        customer.setPartner(null);
        return this;
    }

    public void setCustomers(Set<Customer> customers) {
        this.customers = customers;
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
        Partner partner = (Partner) o;
        if (partner.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), partner.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Partner{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
