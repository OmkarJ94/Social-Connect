const mongoose = require('mongoose')
mongoose.set("debug", true);
mongoose.set("strictQuery", false);
const options = {
    strict: "throw",
    strictQuery: false
};
mongoose.connect(process.env.URI).then(() => {
    console.log('connect')
})
    .catch((err) => {
        console.log("connection", err.message)
    })
