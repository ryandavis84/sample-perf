import { BaseEntity } from './../../shared';

export class Partner implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public customers?: BaseEntity[],
    ) {
    }
}
