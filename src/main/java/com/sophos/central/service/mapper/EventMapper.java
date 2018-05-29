package com.sophos.central.service.mapper;

import com.sophos.central.domain.*;
import com.sophos.central.service.dto.EventDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Event and its DTO EventDTO.
 */
@Mapper(componentModel = "spring", uses = {EndpointMapper.class})
public interface EventMapper extends EntityMapper<EventDTO, Event> {

    @Mapping(source = "endpoint.id", target = "endpointId")
    EventDTO toDto(Event event);

    @Mapping(source = "endpointId", target = "endpoint")
    Event toEntity(EventDTO eventDTO);

    default Event fromId(Long id) {
        if (id == null) {
            return null;
        }
        Event event = new Event();
        event.setId(id);
        return event;
    }
}
