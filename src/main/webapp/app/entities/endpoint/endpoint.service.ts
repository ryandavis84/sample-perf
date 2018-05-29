import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Endpoint } from './endpoint.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Endpoint>;

@Injectable()
export class EndpointService {

    private resourceUrl =  SERVER_API_URL + 'api/endpoints';

    constructor(private http: HttpClient) { }

    create(endpoint: Endpoint): Observable<EntityResponseType> {
        const copy = this.convert(endpoint);
        return this.http.post<Endpoint>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(endpoint: Endpoint): Observable<EntityResponseType> {
        const copy = this.convert(endpoint);
        return this.http.put<Endpoint>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Endpoint>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Endpoint[]>> {
        const options = createRequestOption(req);
        return this.http.get<Endpoint[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Endpoint[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Endpoint = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Endpoint[]>): HttpResponse<Endpoint[]> {
        const jsonResponse: Endpoint[] = res.body;
        const body: Endpoint[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Endpoint.
     */
    private convertItemFromServer(endpoint: Endpoint): Endpoint {
        const copy: Endpoint = Object.assign({}, endpoint);
        return copy;
    }

    /**
     * Convert a Endpoint to a JSON which can be sent to the server.
     */
    private convert(endpoint: Endpoint): Endpoint {
        const copy: Endpoint = Object.assign({}, endpoint);
        return copy;
    }
}
