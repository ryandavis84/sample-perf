import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Endpoint } from './endpoint.model';
import { EndpointPopupService } from './endpoint-popup.service';
import { EndpointService } from './endpoint.service';

@Component({
    selector: 'jhi-endpoint-delete-dialog',
    templateUrl: './endpoint-delete-dialog.component.html'
})
export class EndpointDeleteDialogComponent {

    endpoint: Endpoint;

    constructor(
        private endpointService: EndpointService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.endpointService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'endpointListModification',
                content: 'Deleted an endpoint'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-endpoint-delete-popup',
    template: ''
})
export class EndpointDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private endpointPopupService: EndpointPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.endpointPopupService
                .open(EndpointDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
