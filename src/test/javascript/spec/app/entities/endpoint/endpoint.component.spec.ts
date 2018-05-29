/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SampleTestModule } from '../../../test.module';
import { EndpointComponent } from '../../../../../../main/webapp/app/entities/endpoint/endpoint.component';
import { EndpointService } from '../../../../../../main/webapp/app/entities/endpoint/endpoint.service';
import { Endpoint } from '../../../../../../main/webapp/app/entities/endpoint/endpoint.model';

describe('Component Tests', () => {

    describe('Endpoint Management Component', () => {
        let comp: EndpointComponent;
        let fixture: ComponentFixture<EndpointComponent>;
        let service: EndpointService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SampleTestModule],
                declarations: [EndpointComponent],
                providers: [
                    EndpointService
                ]
            })
            .overrideTemplate(EndpointComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EndpointComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EndpointService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Endpoint(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.endpoints[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
