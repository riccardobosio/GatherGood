import {AxiosResponse} from "axios";
import {api} from "../axios";
import {ListParams} from "../types";

/**
 * Abstract class based on a generic object type that implements the CRUD functions to make the corresponding
 * api calls to the backend
 */
abstract class AbstractService<T> {
    endpoint: string;

    public constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    async getList(params?: ListParams) {
        const {sort, page, per_page, search} = params || {};
        const queryParams: ListParams = {
            ...(page && {page}),
            ...(per_page && {per_page}),
            ...(sort && {sort}),
            ...search,
        };

        const response: AxiosResponse<T[]> = await api.get(`${this.endpoint}/`, { params:  queryParams });
        return response.data;
    }

    async get(id: string) {
        const response: AxiosResponse<T> = await api.get(`${this.endpoint}/${id}/`);
        return response.data;
    }

    async create(item: Partial<T>) {
        const response: AxiosResponse = await api.post(`${this.endpoint}/`, item);
        return response;
    }

    async update(item: Partial<T>, id: string) {
        const response: AxiosResponse = await api.patch(`${this.endpoint}/${id}/`, item);
        return response;
    }

    async delete(id: string) {
        const response: AxiosResponse = await api.delete(`${this.endpoint}/${id}/`);
        return response;
    }
}

export default AbstractService;