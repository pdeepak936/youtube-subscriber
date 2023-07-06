const mongoose = require('mongoose');
//creating the modal or the blueprint of the documents
const susbcriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subscribedChannel:{
        type: String,
        required: true,
    },
    subscribedDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})
//exporting the modal so we can easily import this modal any where in the app
module.exports = mongoose.model('Subscriber',susbcriberSchema);
// here Subscriber is the name of the collection that is created by monggose in which all the subscribrShcema is stored
