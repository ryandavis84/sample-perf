import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SampleSharedModule } from '../../shared';
import {
    EventService,
    EventPopupService,
    EventComponent,
    EventDetailComponent,
    EventDialogComponent,
    EventPopupComponent,
    EventDeletePopupComponent,
    EventDeleteDialogComponent,
    eventRoute,
    eventPopupRoute,
} from './';

const ENTITY_STATES = [
    ...eventRoute,
    ...eventPopupRoute,
];

@NgModule({
    imports: [
        SampleSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EventComponent,
        EventDetailComponent,
        EventDialogComponent,
        EventDeleteDialogComponent,
        EventPopupComponent,
        EventDeletePopupComponent,
    ],
    entryComponents: [
        EventComponent,
        EventDialogComponent,
        EventPopupComponent,
        EventDeleteDialogComponent,
        EventDeletePopupComponent,
    ],
    providers: [
        EventService,
        EventPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SampleEventModule {}
