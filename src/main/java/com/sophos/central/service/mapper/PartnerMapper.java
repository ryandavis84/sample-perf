package com.sophos.central.service.mapper;

import com.sophos.central.domain.*;
import com.sophos.central.service.dto.PartnerDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Partner and its DTO PartnerDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PartnerMapper extends EntityMapper<PartnerDTO, Partner> {


    @Mapping(target = "customers", ignore = true)
    Partner toEntity(PartnerDTO partnerDTO);

    default Partner fromId(Long id) {
        if (id == null) {
            return null;
        }
        Partner partner = new Partner();
        partner.setId(id);
        return partner;
    }
}
