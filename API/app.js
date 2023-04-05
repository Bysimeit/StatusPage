const express = require('express');
const Router = require('./routes');
const bp = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3050;

const InternalIp = require("internal-ip");
const internalIp = InternalIp.v4.sync();

app.use(cors());
app.use(express.json());
app.use(bp.json());
app.use(bp.urlencoded({extended: true}));

app.use(Router);

app.listen(port, internalIp, () => {
    console.log(`API listening at http://${internalIp}:${port}`);
});