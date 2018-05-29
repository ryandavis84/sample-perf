package com.sophos.central.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sophos.central.service.PartnerService;
import com.sophos.central.web.rest.errors.BadRequestAlertException;
import com.sophos.central.web.rest.util.HeaderUtil;
import com.sophos.central.web.rest.util.PaginationUtil;
import com.sophos.central.service.dto.PartnerDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Partner.
 */
@RestController
@RequestMapping("/api")
public class PartnerResource {

    private final Logger log = LoggerFactory.getLogger(PartnerResource.class);

    private static final String ENTITY_NAME = "partner";

    private final PartnerService partnerService;

    public PartnerResource(PartnerService partnerService) {
        this.partnerService = partnerService;
    }

    /**
     * POST  /partners : Create a new partner.
     *
     * @param partnerDTO the partnerDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new partnerDTO, or with status 400 (Bad Request) if the partner has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/partners")
    @Timed
    public ResponseEntity<PartnerDTO> createPartner(@RequestBody PartnerDTO partnerDTO) throws URISyntaxException {
        log.debug("REST request to save Partner : {}", partnerDTO);
        if (partnerDTO.getId() != null) {
            throw new BadRequestAlertException("A new partner cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PartnerDTO result = partnerService.save(partnerDTO);
        return ResponseEntity.created(new URI("/api/partners/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /partners : Updates an existing partner.
     *
     * @param partnerDTO the partnerDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated partnerDTO,
     * or with status 400 (Bad Request) if the partnerDTO is not valid,
     * or with status 500 (Internal Server Error) if the partnerDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/partners")
    @Timed
    public ResponseEntity<PartnerDTO> updatePartner(@RequestBody PartnerDTO partnerDTO) throws URISyntaxException {
        log.debug("REST request to update Partner : {}", partnerDTO);
        if (partnerDTO.getId() == null) {
            return createPartner(partnerDTO);
        }
        PartnerDTO result = partnerService.save(partnerDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, partnerDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /partners : get all the partners.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of partners in body
     */
    @GetMapping("/partners")
    @Timed
    public ResponseEntity<List<PartnerDTO>> getAllPartners(Pageable pageable) {
        log.debug("REST request to get a page of Partners");
        Page<PartnerDTO> page = partnerService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/partners");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /partners/:id : get the "id" partner.
     *
     * @param id the id of the partnerDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the partnerDTO, or with status 404 (Not Found)
     */
    @GetMapping("/partners/{id}")
    @Timed
    public ResponseEntity<PartnerDTO> getPartner(@PathVariable Long id) {
        log.debug("REST request to get Partner : {}", id);
        PartnerDTO partnerDTO = partnerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(partnerDTO));
    }

    /**
     * DELETE  /partners/:id : delete the "id" partner.
     *
     * @param id the id of the partnerDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/partners/{id}")
    @Timed
    public ResponseEntity<Void> deletePartner(@PathVariable Long id) {
        log.debug("REST request to delete Partner : {}", id);
        partnerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
