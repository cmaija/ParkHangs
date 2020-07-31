const axios = require("axios")
const ParkSpecialFeature = require('../models/ParkSpecialFeatureModel')
const Park = require('../models/ParkModel')

 // used to populate the park's facilities on the database.
 // Should not be called unless parks collection on database is removed

const populateParkSpecialFeatures = async function() {
    try {
        const parks = await Park.update({}, {"unset": {"specialFeatures": ""}},  {"multi": true})
    } catch (error) {
        console.log('could not reset all park special features')
    }
    try {
        let res = await axios.get("https://opendata.vancouver.ca/api/records/1.0/search/?dataset=parks-special-features&q=&rows=300&facet=specialfeature&facet=name")
        res = res.data
        const specialFeatureRecords = res.records
        const specialFeatureTypes = res.facet_groups[0].facets

        for (let specialFeatureType of specialFeatureTypes) {
            const newSpecialFeatureType = new ParkSpecialFeature({
                name: specialFeatureType.name
            })

            const featureAlreadyExists = await ParkSpecialFeature.find({name: specialFeatureType.name})

            if (featureAlreadyExists.length < 1) {
                await newSpecialFeatureType.save()
            }
        }

        for (let record of specialFeatureRecords) {
            let specialFeatureFields = record.fields
            let specialFeatureObject = {
                feature: specialFeatureFields.specialfeature,
            }

            try {
                let parkToAddFeatureTo = await Park.findOne({parkId: specialFeatureFields.parkid})
                if (parkToAddFeatureTo.specialFeatures === undefined || parkToAddFeatureTo.specialFeatures === null) {
                    parkToAddFeatureTo.specialFeatures = []
                }
                parkToAddFeatureTo.specialFeatures.push(specialFeatureObject)
                await parkToAddFeatureTo.save()
            } catch (error) {
                console.error(error)
                break
            }
        }

        console.log('features successfully populated!')
    } catch (error) {
        console.log('something went wrong with populating features')
        console.log(error)
    }
}

 module.exports = populateParkSpecialFeatures
