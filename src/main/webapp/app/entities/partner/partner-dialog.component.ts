import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Partner } from './partner.model';
import { PartnerPopupService } from './partner-popup.service';
import { PartnerService } from './partner.service';

@Component({
    selector: 'jhi-partner-dialog',
    templateUrl: './partner-dialog.component.html'
})
export class PartnerDialogComponent implements OnInit {

    partner: Partner;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private partnerService: PartnerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.partner.id !== undefined) {
            this.subscribeToSaveResponse(
                this.partnerService.update(this.partner));
        } else {
            this.subscribeToSaveResponse(
                this.partnerService.create(this.partner));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Partner>>) {
        result.subscribe((res: HttpResponse<Partner>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Partner) {
        this.eventManager.broadcast({ name: 'partnerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-partner-popup',
    template: ''
})
export class PartnerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private partnerPopupService: PartnerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.partnerPopupService
                    .open(PartnerDialogComponent as Component, params['id']);
            } else {
                this.partnerPopupService
                    .open(PartnerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
