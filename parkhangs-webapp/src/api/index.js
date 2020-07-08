import axios from 'axios';
import {fetchParksSuccessful} from '../features/parks/parksSlice.js'


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

const apis = {
    fetchParks
};

export default apis;