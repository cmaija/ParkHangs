import axios from "axios";
import {fetchParksSuccessful, fetchEventsSuccessful, addEventSuccessful} from '../features/parks/parksSlice.js'

const api = axios.create({
    baseURL: 'http://localhost:9000',
});

export const fetchParks = () => {

    return (dispatch) => {
        api.get('/parks')
            .then((res) => {
                if (!res.data.success) {
                    console.log("not successful in fetching parks");
                    console.log(res.data.success);
                } else {
                    dispatch(fetchParksSuccessful(res.data.data));
                }
            })
            .catch((error) => {
                //TODO: error handle
                console.log("fetchpark error: " + error);
                return error.data.message;
            })
    }
};

export const fetchEvents = () => {

    return (dispatch) => {
        api.get('/events')
            .then((res) => {
                if (!res.data.success) {
                  console.log("Could not fetch events");
                  console.log(res.data.success);
                } else {
                  dispatch(fetchEventsSuccessful(res.data.data));
                }
            })
            .catch((error) => {
              console.log("fetchEvents error: " + error);
              return error.data.message;
            })
    }
};

export const addEvent = (parkId, details, eventDateTime) => {

    return (dispatch) => {
        api.post('/events', {
          parkId: parkId,
          details: details,
          eventDateTime: eventDateTime
 			 }).then((res) => {
                if (!res.data.success) {
                  console.log("Could not add event");
                  console.log(res.data.success);
                } else {
                  console.log(res.data.event);
                  dispatch(addEventSuccessful(res.data.data));
                }
            })
            .catch((error) => {
              console.log("fetchEvents error: " + error);
              return error.data.message;
            })
    }
};

const apis = {
    fetchParks,
    fetchEvents,
    addEvent
};

export default apis;
