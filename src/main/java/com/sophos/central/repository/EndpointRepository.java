package com.sophos.central.repository;

import com.sophos.central.domain.Endpoint;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Endpoint entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EndpointRepository extends JpaRepository<Endpoint, Long> {

}
