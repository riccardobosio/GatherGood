import AbstractService from "./abstract";
import {AxiosResponse} from "axios";
import {api} from "../axios";
import {Event} from "../types"

class EventService extends AbstractService<Event> {

    async getCreatedEvents() {
        const response: AxiosResponse<Event[]> = await api.get(`${this.endpoint}/created/`);
        return response.data;
    }

    async getJoinedEvents() {
        const response: AxiosResponse<Event[]> = await api.get(`${this.endpoint}/joined/`);
        return response.data;
    }

    async joinEvent(id: string) {
        const response: AxiosResponse = await api.patch(`${this.endpoint}/${id}/`);
        return response.data;
    }
}

const eventService = new EventService("/events");
export default eventService;