const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    sequence_value: {
        type: Number,
        required: true,
    }
})

const CounterModel = mongoose.model("counters", CounterSchema);
module.exports = CounterModel;