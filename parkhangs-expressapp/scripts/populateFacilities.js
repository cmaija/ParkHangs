const axios = require("axios")
const Facility = require('../models/FacilityModel')
const Park = require('../models/ParkModel')

 // used to populate the park's facilities on the database.
 // Should not be called unless parks collection on database is removed

const populateFacilities = async function() {
    try {
        const parks = await Park.updateMany({}, {"$unset": {"facilities": ""}})
    } catch (error) {
        console.log('could not reset all park facilities')
    }
    try {
        let res = await axios.get("https://opendata.vancouver.ca/api/records/1.0/search/?dataset=parks-facilities&q=&rows=700&facet=facilitytype")
        res = res.data
        const facilitiesRecords = res.records
        const facilityTypes = res.facet_groups[0].facets

        for (let facilityType of facilityTypes) {
            const newFacilityType = new Facility({
                name: facilityType.name
            })

            const featureAlreadyExists = await Facility.find({name: facilityType.name})

            if (featureAlreadyExists.length < 1) {
                await newFacilityType.save()
            }
        }

        for (let record of facilitiesRecords) {
            let facilityFields = record.fields
            let facilityObject = {
                facilityUrl: facilityFields.facilityurl,
                facilityType: facilityFields.facilitytype,
                facilityCount: facilityFields.facilitycount,
            }

            try {
                let parkToAddFacilityTo = await Park.findOne({parkId: facilityFields.parkid})
                if (parkToAddFacilityTo.facilities === undefined || parkToAddFacilityTo.facilities === null) {
                    parkToAddFacilityTo.facilities = []
                }
                parkToAddFacilityTo.facilities.push(facilityObject)
                await parkToAddFacilityTo.save()
            } catch (error) {
                console.error(error)
                break
            }
        }

        console.log('facilities successfully populated!')
    } catch (error) {
        console.log('something went wrong with populating facilities')
        console.log(error)
    }
}

 module.exports = populateFacilities
