import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SampleSharedModule } from '../../shared';
import {
    EndpointService,
    EndpointPopupService,
    EndpointComponent,
    EndpointDetailComponent,
    EndpointDialogComponent,
    EndpointPopupComponent,
    EndpointDeletePopupComponent,
    EndpointDeleteDialogComponent,
    endpointRoute,
    endpointPopupRoute,
} from './';

const ENTITY_STATES = [
    ...endpointRoute,
    ...endpointPopupRoute,
];

@NgModule({
    imports: [
        SampleSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EndpointComponent,
        EndpointDetailComponent,
        EndpointDialogComponent,
        EndpointDeleteDialogComponent,
        EndpointPopupComponent,
        EndpointDeletePopupComponent,
    ],
    entryComponents: [
        EndpointComponent,
        EndpointDialogComponent,
        EndpointPopupComponent,
        EndpointDeleteDialogComponent,
        EndpointDeletePopupComponent,
    ],
    providers: [
        EndpointService,
        EndpointPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SampleEndpointModule {}
