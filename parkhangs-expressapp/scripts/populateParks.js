const Request = require("request");
const Park = require('../models/index');

// used to populate the parks on the database. Should not be called unless parks collection on database is removed

const populateParks = async function() {

    await Request.get("https://opendata.vancouver.ca/api/records/1.0/search/?dataset=parks&q=&rows=250", (error, response, body) => {

        if (error) {
            console.log("something went wrong!");

        } else {

            const parkData = JSON.parse(body);
            const parkRecordsData = parkData.records; // array of park objects

            for (let i = 0; i < parkRecordsData.length; i++) {

                let parkObjectFields = parkRecordsData[i].fields;

                const lat = parkObjectFields.googlemapdest[0];
                const lon = parkObjectFields.googlemapdest[1];

                let parkObject = {
                    parkId: parkObjectFields.parkid,
                    name: parkObjectFields.name,
                    neighbourhoodName: parkObjectFields.neighbourhoodname,
                    neighbourhoodURL: parkObjectFields.neighbourhoodurl,
                    streetNumber: parkObjectFields.streetnumber,
                    streetName: parkObjectFields.streetname,
                    hectares: parkObjectFields.hectare,

                    rating: 5, // initially it's a full score

                    hasWashrooms: parkObjectFields.washrooms === "Y",
                    hasFacilities: parkObjectFields.facilities === "Y",
                    hasAdvisories: parkObjectFields.advisories === "Y",
                    hasSpecialFeatures: parkObjectFields.specialfeatures === "Y",
                    googleMapsLatLon: [lat, lon]
                };

                let newPark = new Park(
                    parkObject
                );

                if (!newPark) {
                    console.log("something went wrong!");
                }

                newPark
                    .save()
                    .then(() => {
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        }
    });

};

module.exports = populateParks;