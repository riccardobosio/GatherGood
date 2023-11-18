import AbstractService from "./abstract.js";
import {AxiosResponse} from "axios";
import {api} from "../axios";
import {Event} from "../types"

class EventService extends AbstractService<Event> {

    async getCreatedEvents(id: string) {
        const response: AxiosResponse<Event[]> = await api.get(`${this.endpoint}/created/`);
        return response.data;
    }

    async getJoinedEvents(id: string) {
        const response: AxiosResponse<Event[]> = await api.get(`${this.endpoint}/joined/`);
        return response.data;
    }
}

const eventService = new EventService("/events");
export default eventService;