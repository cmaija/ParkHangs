const Request = require("request")
const ParkFacility = require('../models/ParkModel')

 // used to populate the park's facilities on the database.
 // Should not be called unless parks collection on database is removed

const populateFacilities = async function() {
    try {
        let res = await Request.get("https://opendata.vancouver.ca/api/records/1.0/search/?dataset=parks-facilities&q=&facet=facilitytype&q=&rows=250")
        res = JSON.parse(res)

        const facilitiesRecords = res.records

        for (let record of facilitiesRecords) {
            let facilityFields = record.fields
            let facilityObject = {
                parkId: facilityFields.parkid,
                facilityUrl: facilityFields.facilityurl,
                facilityType: facilityFields.facilitytype,
                facilityCount: facilityFields.facilitycount,
            }

            let newFacility = new ParkFacility(facilityObject)
            if (!newFacility) {
                console.log(`could not create a facility with data: ${facilityObject}`)
                break
            }
            try {
                await newFacility.save()
            } catch (error) {
                console.log(`could not save new facility to database with data: ${newFacility}`)
            }
        }
    } catch (error) {
        console.log('something went wrong with populating facilities')
    }
}

 module.exports = populateFacilities
