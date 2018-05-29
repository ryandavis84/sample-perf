import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PartnerComponent } from './partner.component';
import { PartnerDetailComponent } from './partner-detail.component';
import { PartnerPopupComponent } from './partner-dialog.component';
import { PartnerDeletePopupComponent } from './partner-delete-dialog.component';

export const partnerRoute: Routes = [
    {
        path: 'partner',
        component: PartnerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Partners'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'partner/:id',
        component: PartnerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Partners'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const partnerPopupRoute: Routes = [
    {
        path: 'partner-new',
        component: PartnerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Partners'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'partner/:id/edit',
        component: PartnerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Partners'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'partner/:id/delete',
        component: PartnerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Partners'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
