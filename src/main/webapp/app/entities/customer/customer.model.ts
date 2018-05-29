import { BaseEntity } from './../../shared';

export class Customer implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public partnerId?: number,
        public endpoints?: BaseEntity[],
    ) {
    }
}
