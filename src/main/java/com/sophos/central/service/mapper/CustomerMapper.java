package com.sophos.central.service.mapper;

import com.sophos.central.domain.*;
import com.sophos.central.service.dto.CustomerDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Customer and its DTO CustomerDTO.
 */
@Mapper(componentModel = "spring", uses = {PartnerMapper.class})
public interface CustomerMapper extends EntityMapper<CustomerDTO, Customer> {

    @Mapping(source = "partner.id", target = "partnerId")
    CustomerDTO toDto(Customer customer);

    @Mapping(source = "partnerId", target = "partner")
    @Mapping(target = "endpoints", ignore = true)
    Customer toEntity(CustomerDTO customerDTO);

    default Customer fromId(Long id) {
        if (id == null) {
            return null;
        }
        Customer customer = new Customer();
        customer.setId(id);
        return customer;
    }
}
