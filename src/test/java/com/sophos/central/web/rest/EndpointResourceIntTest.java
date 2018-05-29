package com.sophos.central.web.rest;

import com.sophos.central.SampleApp;

import com.sophos.central.domain.Endpoint;
import com.sophos.central.repository.EndpointRepository;
import com.sophos.central.service.EndpointService;
import com.sophos.central.service.dto.EndpointDTO;
import com.sophos.central.service.mapper.EndpointMapper;
import com.sophos.central.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.sophos.central.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EndpointResource REST controller.
 *
 * @see EndpointResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SampleApp.class)
public class EndpointResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private EndpointRepository endpointRepository;

    @Autowired
    private EndpointMapper endpointMapper;

    @Autowired
    private EndpointService endpointService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEndpointMockMvc;

    private Endpoint endpoint;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EndpointResource endpointResource = new EndpointResource(endpointService);
        this.restEndpointMockMvc = MockMvcBuilders.standaloneSetup(endpointResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Endpoint createEntity(EntityManager em) {
        Endpoint endpoint = new Endpoint()
            .name(DEFAULT_NAME);
        return endpoint;
    }

    @Before
    public void initTest() {
        endpoint = createEntity(em);
    }

    @Test
    @Transactional
    public void createEndpoint() throws Exception {
        int databaseSizeBeforeCreate = endpointRepository.findAll().size();

        // Create the Endpoint
        EndpointDTO endpointDTO = endpointMapper.toDto(endpoint);
        restEndpointMockMvc.perform(post("/api/endpoints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(endpointDTO)))
            .andExpect(status().isCreated());

        // Validate the Endpoint in the database
        List<Endpoint> endpointList = endpointRepository.findAll();
        assertThat(endpointList).hasSize(databaseSizeBeforeCreate + 1);
        Endpoint testEndpoint = endpointList.get(endpointList.size() - 1);
        assertThat(testEndpoint.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createEndpointWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = endpointRepository.findAll().size();

        // Create the Endpoint with an existing ID
        endpoint.setId(1L);
        EndpointDTO endpointDTO = endpointMapper.toDto(endpoint);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEndpointMockMvc.perform(post("/api/endpoints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(endpointDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Endpoint in the database
        List<Endpoint> endpointList = endpointRepository.findAll();
        assertThat(endpointList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEndpoints() throws Exception {
        // Initialize the database
        endpointRepository.saveAndFlush(endpoint);

        // Get all the endpointList
        restEndpointMockMvc.perform(get("/api/endpoints?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(endpoint.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getEndpoint() throws Exception {
        // Initialize the database
        endpointRepository.saveAndFlush(endpoint);

        // Get the endpoint
        restEndpointMockMvc.perform(get("/api/endpoints/{id}", endpoint.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(endpoint.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEndpoint() throws Exception {
        // Get the endpoint
        restEndpointMockMvc.perform(get("/api/endpoints/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEndpoint() throws Exception {
        // Initialize the database
        endpointRepository.saveAndFlush(endpoint);
        int databaseSizeBeforeUpdate = endpointRepository.findAll().size();

        // Update the endpoint
        Endpoint updatedEndpoint = endpointRepository.findOne(endpoint.getId());
        // Disconnect from session so that the updates on updatedEndpoint are not directly saved in db
        em.detach(updatedEndpoint);
        updatedEndpoint
            .name(UPDATED_NAME);
        EndpointDTO endpointDTO = endpointMapper.toDto(updatedEndpoint);

        restEndpointMockMvc.perform(put("/api/endpoints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(endpointDTO)))
            .andExpect(status().isOk());

        // Validate the Endpoint in the database
        List<Endpoint> endpointList = endpointRepository.findAll();
        assertThat(endpointList).hasSize(databaseSizeBeforeUpdate);
        Endpoint testEndpoint = endpointList.get(endpointList.size() - 1);
        assertThat(testEndpoint.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingEndpoint() throws Exception {
        int databaseSizeBeforeUpdate = endpointRepository.findAll().size();

        // Create the Endpoint
        EndpointDTO endpointDTO = endpointMapper.toDto(endpoint);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEndpointMockMvc.perform(put("/api/endpoints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(endpointDTO)))
            .andExpect(status().isCreated());

        // Validate the Endpoint in the database
        List<Endpoint> endpointList = endpointRepository.findAll();
        assertThat(endpointList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEndpoint() throws Exception {
        // Initialize the database
        endpointRepository.saveAndFlush(endpoint);
        int databaseSizeBeforeDelete = endpointRepository.findAll().size();

        // Get the endpoint
        restEndpointMockMvc.perform(delete("/api/endpoints/{id}", endpoint.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Endpoint> endpointList = endpointRepository.findAll();
        assertThat(endpointList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Endpoint.class);
        Endpoint endpoint1 = new Endpoint();
        endpoint1.setId(1L);
        Endpoint endpoint2 = new Endpoint();
        endpoint2.setId(endpoint1.getId());
        assertThat(endpoint1).isEqualTo(endpoint2);
        endpoint2.setId(2L);
        assertThat(endpoint1).isNotEqualTo(endpoint2);
        endpoint1.setId(null);
        assertThat(endpoint1).isNotEqualTo(endpoint2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EndpointDTO.class);
        EndpointDTO endpointDTO1 = new EndpointDTO();
        endpointDTO1.setId(1L);
        EndpointDTO endpointDTO2 = new EndpointDTO();
        assertThat(endpointDTO1).isNotEqualTo(endpointDTO2);
        endpointDTO2.setId(endpointDTO1.getId());
        assertThat(endpointDTO1).isEqualTo(endpointDTO2);
        endpointDTO2.setId(2L);
        assertThat(endpointDTO1).isNotEqualTo(endpointDTO2);
        endpointDTO1.setId(null);
        assertThat(endpointDTO1).isNotEqualTo(endpointDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(endpointMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(endpointMapper.fromId(null)).isNull();
    }
}
