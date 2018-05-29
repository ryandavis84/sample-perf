import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Endpoint } from './endpoint.model';
import { EndpointService } from './endpoint.service';

@Component({
    selector: 'jhi-endpoint-detail',
    templateUrl: './endpoint-detail.component.html'
})
export class EndpointDetailComponent implements OnInit, OnDestroy {

    endpoint: Endpoint;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private endpointService: EndpointService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEndpoints();
    }

    load(id) {
        this.endpointService.find(id)
            .subscribe((endpointResponse: HttpResponse<Endpoint>) => {
                this.endpoint = endpointResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEndpoints() {
        this.eventSubscriber = this.eventManager.subscribe(
            'endpointListModification',
            (response) => this.load(this.endpoint.id)
        );
    }
}
