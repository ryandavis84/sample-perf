package com.sophos.central.service.impl;

import com.sophos.central.service.PartnerService;
import com.sophos.central.domain.Partner;
import com.sophos.central.repository.PartnerRepository;
import com.sophos.central.service.dto.PartnerDTO;
import com.sophos.central.service.mapper.PartnerMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Partner.
 */
@Service
@Transactional
public class PartnerServiceImpl implements PartnerService {

    private final Logger log = LoggerFactory.getLogger(PartnerServiceImpl.class);

    private final PartnerRepository partnerRepository;

    private final PartnerMapper partnerMapper;

    public PartnerServiceImpl(PartnerRepository partnerRepository, PartnerMapper partnerMapper) {
        this.partnerRepository = partnerRepository;
        this.partnerMapper = partnerMapper;
    }

    /**
     * Save a partner.
     *
     * @param partnerDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PartnerDTO save(PartnerDTO partnerDTO) {
        log.debug("Request to save Partner : {}", partnerDTO);
        Partner partner = partnerMapper.toEntity(partnerDTO);
        partner = partnerRepository.save(partner);
        return partnerMapper.toDto(partner);
    }

    /**
     * Get all the partners.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PartnerDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Partners");
        return partnerRepository.findAll(pageable)
            .map(partnerMapper::toDto);
    }

    /**
     * Get one partner by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PartnerDTO findOne(Long id) {
        log.debug("Request to get Partner : {}", id);
        Partner partner = partnerRepository.findOne(id);
        return partnerMapper.toDto(partner);
    }

    /**
     * Delete the partner by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Partner : {}", id);
        partnerRepository.delete(id);
    }
}
