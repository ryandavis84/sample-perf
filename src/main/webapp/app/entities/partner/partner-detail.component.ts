import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Partner } from './partner.model';
import { PartnerService } from './partner.service';

@Component({
    selector: 'jhi-partner-detail',
    templateUrl: './partner-detail.component.html'
})
export class PartnerDetailComponent implements OnInit, OnDestroy {

    partner: Partner;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private partnerService: PartnerService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPartners();
    }

    load(id) {
        this.partnerService.find(id)
            .subscribe((partnerResponse: HttpResponse<Partner>) => {
                this.partner = partnerResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPartners() {
        this.eventSubscriber = this.eventManager.subscribe(
            'partnerListModification',
            (response) => this.load(this.partner.id)
        );
    }
}
