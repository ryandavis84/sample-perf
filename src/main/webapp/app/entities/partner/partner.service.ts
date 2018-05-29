import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Partner } from './partner.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Partner>;

@Injectable()
export class PartnerService {

    private resourceUrl =  SERVER_API_URL + 'api/partners';

    constructor(private http: HttpClient) { }

    create(partner: Partner): Observable<EntityResponseType> {
        const copy = this.convert(partner);
        return this.http.post<Partner>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(partner: Partner): Observable<EntityResponseType> {
        const copy = this.convert(partner);
        return this.http.put<Partner>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Partner>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Partner[]>> {
        const options = createRequestOption(req);
        return this.http.get<Partner[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Partner[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Partner = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Partner[]>): HttpResponse<Partner[]> {
        const jsonResponse: Partner[] = res.body;
        const body: Partner[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Partner.
     */
    private convertItemFromServer(partner: Partner): Partner {
        const copy: Partner = Object.assign({}, partner);
        return copy;
    }

    /**
     * Convert a Partner to a JSON which can be sent to the server.
     */
    private convert(partner: Partner): Partner {
        const copy: Partner = Object.assign({}, partner);
        return copy;
    }
}
