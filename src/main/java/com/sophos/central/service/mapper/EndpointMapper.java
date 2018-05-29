package com.sophos.central.service.mapper;

import com.sophos.central.domain.*;
import com.sophos.central.service.dto.EndpointDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Endpoint and its DTO EndpointDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class})
public interface EndpointMapper extends EntityMapper<EndpointDTO, Endpoint> {

    @Mapping(source = "customer.id", target = "customerId")
    EndpointDTO toDto(Endpoint endpoint);

    @Mapping(source = "customerId", target = "customer")
    @Mapping(target = "events", ignore = true)
    Endpoint toEntity(EndpointDTO endpointDTO);

    default Endpoint fromId(Long id) {
        if (id == null) {
            return null;
        }
        Endpoint endpoint = new Endpoint();
        endpoint.setId(id);
        return endpoint;
    }
}
