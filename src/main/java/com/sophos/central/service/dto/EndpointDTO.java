package com.sophos.central.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Endpoint entity.
 */
public class EndpointDTO implements Serializable {

    private Long id;

    private String name;

    private Long customerId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EndpointDTO endpointDTO = (EndpointDTO) o;
        if(endpointDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), endpointDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EndpointDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
