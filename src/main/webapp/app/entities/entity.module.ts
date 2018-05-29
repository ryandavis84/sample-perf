import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SamplePartnerModule } from './partner/partner.module';
import { SampleCustomerModule } from './customer/customer.module';
import { SampleEndpointModule } from './endpoint/endpoint.module';
import { SampleEventModule } from './event/event.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        SamplePartnerModule,
        SampleCustomerModule,
        SampleEndpointModule,
        SampleEventModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SampleEntityModule {}
