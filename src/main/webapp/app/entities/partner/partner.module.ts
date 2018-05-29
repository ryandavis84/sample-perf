import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SampleSharedModule } from '../../shared';
import {
    PartnerService,
    PartnerPopupService,
    PartnerComponent,
    PartnerDetailComponent,
    PartnerDialogComponent,
    PartnerPopupComponent,
    PartnerDeletePopupComponent,
    PartnerDeleteDialogComponent,
    partnerRoute,
    partnerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...partnerRoute,
    ...partnerPopupRoute,
];

@NgModule({
    imports: [
        SampleSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PartnerComponent,
        PartnerDetailComponent,
        PartnerDialogComponent,
        PartnerDeleteDialogComponent,
        PartnerPopupComponent,
        PartnerDeletePopupComponent,
    ],
    entryComponents: [
        PartnerComponent,
        PartnerDialogComponent,
        PartnerPopupComponent,
        PartnerDeleteDialogComponent,
        PartnerDeletePopupComponent,
    ],
    providers: [
        PartnerService,
        PartnerPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SamplePartnerModule {}
