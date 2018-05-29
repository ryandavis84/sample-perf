import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EventComponent } from './event.component';
import { EventDetailComponent } from './event-detail.component';
import { EventPopupComponent } from './event-dialog.component';
import { EventDeletePopupComponent } from './event-delete-dialog.component';

export const eventRoute: Routes = [
    {
        path: 'event',
        component: EventComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Events'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'event/:id',
        component: EventDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Events'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const eventPopupRoute: Routes = [
    {
        path: 'event-new',
        component: EventPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Events'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'event/:id/edit',
        component: EventPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Events'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'event/:id/delete',
        component: EventDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Events'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
