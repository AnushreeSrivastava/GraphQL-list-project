const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

//allow cross origin requests
app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


//connection to the database
mongoose.connect("mongodb://anu:test123@ds259089.mlab.com:59089/graphql-project");
mongoose.connection.once('open', () => {
    console.log("connection is open...")
})
app.listen(4000, () => {
    console.log('Now listening to the request at 3000...');
})