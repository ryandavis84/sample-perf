package com.sophos.central.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Endpoint.
 */
@Entity
@Table(name = "endpoint")
public class Endpoint implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    private Customer customer;

    @OneToMany(mappedBy = "endpoint")
    @JsonIgnore
    private Set<Event> events = new HashSet<>();

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

    public Endpoint name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Endpoint customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Set<Event> getEvents() {
        return events;
    }

    public Endpoint events(Set<Event> events) {
        this.events = events;
        return this;
    }

    public Endpoint addEvent(Event event) {
        this.events.add(event);
        event.setEndpoint(this);
        return this;
    }

    public Endpoint removeEvent(Event event) {
        this.events.remove(event);
        event.setEndpoint(null);
        return this;
    }

    public void setEvents(Set<Event> events) {
        this.events = events;
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
        Endpoint endpoint = (Endpoint) o;
        if (endpoint.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), endpoint.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Endpoint{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
