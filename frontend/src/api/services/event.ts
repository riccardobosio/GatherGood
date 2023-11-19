import AbstractService from "./abstract.js";
import {AxiosResponse} from "axios";
import {api} from "../axios";
import {Event} from "../types"
import {getCurrentISO8601DateTime} from "../../utils/date";

class EventService extends AbstractService<Event> {

    async getPassedJoinedEvents() {
        const params = {before: getCurrentISO8601DateTime()}
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