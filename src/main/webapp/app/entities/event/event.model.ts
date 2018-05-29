import { BaseEntity } from './../../shared';

export class Event implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public endpointId?: number,
    ) {
    }
}
