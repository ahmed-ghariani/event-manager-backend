const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [ true, "A title is missing"]
    },
    date: {
        type: Date,
        required: [ true, "A date is missing" ],
        min:[ new Date(), "Cannot add a past event"]
    },
    organizers: {
        type: [String],
        default: []
    },
    description: {
        type: String
    },
    place: {
        type: String,
        required: [ true, "A place is missing" ]
    },
    pic:{
        data: Buffer,
        name: String,
        contentType: String
    }
});

module.exports = mongoose.model('Event',eventSchema);