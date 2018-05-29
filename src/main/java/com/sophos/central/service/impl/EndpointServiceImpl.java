package com.sophos.central.service.impl;

import com.sophos.central.service.EndpointService;
import com.sophos.central.domain.Endpoint;
import com.sophos.central.repository.EndpointRepository;
import com.sophos.central.service.dto.EndpointDTO;
import com.sophos.central.service.mapper.EndpointMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Endpoint.
 */
@Service
@Transactional
public class EndpointServiceImpl implements EndpointService {

    private final Logger log = LoggerFactory.getLogger(EndpointServiceImpl.class);

    private final EndpointRepository endpointRepository;

    private final EndpointMapper endpointMapper;

    public EndpointServiceImpl(EndpointRepository endpointRepository, EndpointMapper endpointMapper) {
        this.endpointRepository = endpointRepository;
        this.endpointMapper = endpointMapper;
    }

    /**
     * Save a endpoint.
     *
     * @param endpointDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public EndpointDTO save(EndpointDTO endpointDTO) {
        log.debug("Request to save Endpoint : {}", endpointDTO);
        Endpoint endpoint = endpointMapper.toEntity(endpointDTO);
        endpoint = endpointRepository.save(endpoint);
        return endpointMapper.toDto(endpoint);
    }

    /**
     * Get all the endpoints.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<EndpointDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Endpoints");
        return endpointRepository.findAll(pageable)
            .map(endpointMapper::toDto);
    }

    /**
     * Get one endpoint by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public EndpointDTO findOne(Long id) {
        log.debug("Request to get Endpoint : {}", id);
        Endpoint endpoint = endpointRepository.findOne(id);
        return endpointMapper.toDto(endpoint);
    }

    /**
     * Delete the endpoint by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Endpoint : {}", id);
        endpointRepository.delete(id);
    }
}
