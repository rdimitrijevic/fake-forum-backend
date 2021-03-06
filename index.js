const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');
const Router = require('./routes');
const cors = require('cors');

// const User = require('./models/Users');
const PORT = 8000;

app = express();
app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use('/', Router);
let DB_CONNECTION = "mongodb+srv://lale:lalelale@cluster0-lazue.gcp.mongodb.net/test?retryWrites=true&w=majority";

let p = mongoose.connect(DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("Connected to db") })
    .catch((err) => { console.log(err) });



/* usr = new User({
    username: "32123fsafa131",
    password: "password12",
    email: "radoslav23@raf.rs",
    gender: "male"
});

p.then( () => {
    usr.save()
    .then(() => { console.log('added') })
    .catch((err) => { console.log('error : ' + err) });
})
.catch((err) => console.log(err));
 */

app.listen(PORT, () => console.log(`connected ${PORT}`));
