/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SampleTestModule } from '../../../test.module';
import { PartnerDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/partner/partner-delete-dialog.component';
import { PartnerService } from '../../../../../../main/webapp/app/entities/partner/partner.service';

describe('Component Tests', () => {

    describe('Partner Management Delete Component', () => {
        let comp: PartnerDeleteDialogComponent;
        let fixture: ComponentFixture<PartnerDeleteDialogComponent>;
        let service: PartnerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SampleTestModule],
                declarations: [PartnerDeleteDialogComponent],
                providers: [
                    PartnerService
                ]
            })
            .overrideTemplate(PartnerDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PartnerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PartnerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
