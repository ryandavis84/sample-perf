/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SampleTestModule } from '../../../test.module';
import { PartnerDetailComponent } from '../../../../../../main/webapp/app/entities/partner/partner-detail.component';
import { PartnerService } from '../../../../../../main/webapp/app/entities/partner/partner.service';
import { Partner } from '../../../../../../main/webapp/app/entities/partner/partner.model';

describe('Component Tests', () => {

    describe('Partner Management Detail Component', () => {
        let comp: PartnerDetailComponent;
        let fixture: ComponentFixture<PartnerDetailComponent>;
        let service: PartnerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SampleTestModule],
                declarations: [PartnerDetailComponent],
                providers: [
                    PartnerService
                ]
            })
            .overrideTemplate(PartnerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PartnerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PartnerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Partner(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.partner).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
