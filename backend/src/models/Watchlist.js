const mongoose = require('mongoose');

const watchListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    symbols: [{
        type: String
    }]
});

module.exports = mongoose.model('WatchList', watchListSchema);