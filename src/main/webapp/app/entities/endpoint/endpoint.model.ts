import { BaseEntity } from './../../shared';

export class Endpoint implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public customerId?: number,
        public events?: BaseEntity[],
    ) {
    }
}
