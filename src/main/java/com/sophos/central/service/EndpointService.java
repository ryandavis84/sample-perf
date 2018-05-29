package com.sophos.central.service;

import com.sophos.central.service.dto.EndpointDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Endpoint.
 */
public interface EndpointService {

    /**
     * Save a endpoint.
     *
     * @param endpointDTO the entity to save
     * @return the persisted entity
     */
    EndpointDTO save(EndpointDTO endpointDTO);

    /**
     * Get all the endpoints.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<EndpointDTO> findAll(Pageable pageable);

    /**
     * Get the "id" endpoint.
     *
     * @param id the id of the entity
     * @return the entity
     */
    EndpointDTO findOne(Long id);

    /**
     * Delete the "id" endpoint.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
