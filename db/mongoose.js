const mongoose = require('mongoose')

mongoose.connect(process.env.MON_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})