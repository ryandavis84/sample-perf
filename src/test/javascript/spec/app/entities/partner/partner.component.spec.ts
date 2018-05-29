/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SampleTestModule } from '../../../test.module';
import { PartnerComponent } from '../../../../../../main/webapp/app/entities/partner/partner.component';
import { PartnerService } from '../../../../../../main/webapp/app/entities/partner/partner.service';
import { Partner } from '../../../../../../main/webapp/app/entities/partner/partner.model';

describe('Component Tests', () => {

    describe('Partner Management Component', () => {
        let comp: PartnerComponent;
        let fixture: ComponentFixture<PartnerComponent>;
        let service: PartnerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SampleTestModule],
                declarations: [PartnerComponent],
                providers: [
                    PartnerService
                ]
            })
            .overrideTemplate(PartnerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PartnerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PartnerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Partner(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.partners[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
