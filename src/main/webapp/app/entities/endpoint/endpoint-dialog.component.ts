import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Endpoint } from './endpoint.model';
import { EndpointPopupService } from './endpoint-popup.service';
import { EndpointService } from './endpoint.service';
import { Customer, CustomerService } from '../customer';

@Component({
    selector: 'jhi-endpoint-dialog',
    templateUrl: './endpoint-dialog.component.html'
})
export class EndpointDialogComponent implements OnInit {

    endpoint: Endpoint;
    isSaving: boolean;

    customers: Customer[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private endpointService: EndpointService,
        private customerService: CustomerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.customerService.query()
            .subscribe((res: HttpResponse<Customer[]>) => { this.customers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.endpoint.id !== undefined) {
            this.subscribeToSaveResponse(
                this.endpointService.update(this.endpoint));
        } else {
            this.subscribeToSaveResponse(
                this.endpointService.create(this.endpoint));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Endpoint>>) {
        result.subscribe((res: HttpResponse<Endpoint>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Endpoint) {
        this.eventManager.broadcast({ name: 'endpointListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCustomerById(index: number, item: Customer) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-endpoint-popup',
    template: ''
})
export class EndpointPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private endpointPopupService: EndpointPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.endpointPopupService
                    .open(EndpointDialogComponent as Component, params['id']);
            } else {
                this.endpointPopupService
                    .open(EndpointDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
