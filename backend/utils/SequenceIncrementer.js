const CounterModel = require('../models/Counter');

module.exports = async (sequenceName) => {
    try {
        var result = await CounterModel.findOneAndUpdate({ _id: sequenceName }, { $inc: { sequence_value: 1 } }, { upsert: true, new: true }).exec();
        return result.sequence_value;
    } catch (err) {
        return err;
    }
};