import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EndpointComponent } from './endpoint.component';
import { EndpointDetailComponent } from './endpoint-detail.component';
import { EndpointPopupComponent } from './endpoint-dialog.component';
import { EndpointDeletePopupComponent } from './endpoint-delete-dialog.component';

export const endpointRoute: Routes = [
    {
        path: 'endpoint',
        component: EndpointComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Endpoints'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'endpoint/:id',
        component: EndpointDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Endpoints'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const endpointPopupRoute: Routes = [
    {
        path: 'endpoint-new',
        component: EndpointPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Endpoints'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'endpoint/:id/edit',
        component: EndpointPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Endpoints'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'endpoint/:id/delete',
        component: EndpointDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Endpoints'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
