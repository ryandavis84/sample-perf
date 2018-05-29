/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SampleTestModule } from '../../../test.module';
import { EndpointDetailComponent } from '../../../../../../main/webapp/app/entities/endpoint/endpoint-detail.component';
import { EndpointService } from '../../../../../../main/webapp/app/entities/endpoint/endpoint.service';
import { Endpoint } from '../../../../../../main/webapp/app/entities/endpoint/endpoint.model';

describe('Component Tests', () => {

    describe('Endpoint Management Detail Component', () => {
        let comp: EndpointDetailComponent;
        let fixture: ComponentFixture<EndpointDetailComponent>;
        let service: EndpointService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SampleTestModule],
                declarations: [EndpointDetailComponent],
                providers: [
                    EndpointService
                ]
            })
            .overrideTemplate(EndpointDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EndpointDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EndpointService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Endpoint(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.endpoint).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
