var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

const morgan = require("morgan");
const { default: fetch } = require("node-fetch");
const jwt = require("jsonwebtoken");

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.get('/', (req, res) => {
    res.send('<h1>Chào tất cả các bạn đến với api jobIt!</h1>');
});


//
app.get("/get-token", (req, res) => {
    const API_KEY = process.env.VIDEOSDK_API_KEY;
    const SECRET_KEY = process.env.VIDEOSDK_SECRET_KEY;
  
    const options = { expiresIn: "10m", algorithm: "HS256" };
  
    const payload = {
      apikey: API_KEY,
      permissions: ["allow_join", "allow_mod"], // also accepts "ask_join"
    };
  
    const token = jwt.sign(payload, SECRET_KEY, options);
    res.json({ token });
  });
  
  //
  app.post("/create-meeting/", (req, res) => {
    const { token, region } = req.body;
    const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings`;
    const options = {
      method: "POST",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify({ region }),
    };
  
    fetch(url, options)
      .then((response) => response.json())
      .then((result) => res.json(result)) // result will contain meetingId
      .catch((error) => console.error("error", error));
  });
  
  //
  app.post("/validate-meeting/:meetingId", (req, res) => {
    const token = req.body.token;
    const meetingId = req.params.meetingId;
  
    const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings/${meetingId}`;
  
    const options = {
      method: "POST",
      headers: { Authorization: token },
    };
  
    fetch(url, options)
      .then((response) => response.json())
      .then((result) => res.json(result)) // result will contain meetingId
      .catch((error) => console.error("error", error));
  });

require('./routes/loginCompany')(app);
require('./routes/loginUser')(app);
require('./routes/LoginAdmin')(app);
require('./routes/Tag')(app);
require('./routes/Statistical')(app);
require('./routes/SendMail')(app);
require('./routes/Company')(app);
require('./routes/CheckCompany')(app);
require('./routes/Work')(app);
require('./routes/User')(app);
require('./routes/Contact')(app);
require('./routes/TypeOfWork')(app);
require('./routes/SocialNetwork')(app);
require('./routes/Candidate')(app);
require('./routes/Recruiment')(app);
require('./routes/TagWork')(app);
require('./routes/worktypeofwork')(app);
require('./routes/UserTag')(app);
require('./routes/SaveWork')(app);
require('./routes/WordId')(app);
require('./routes/CheckLogin')(app);
require('./routes/DeleteSaveWork')(app);
require('./routes/UserTypeOfWork')(app);
require('./routes/GetUserSaveWork')(app);
require('./routes/GetCompanySaveUser')(app);
require('./routes/WorkApply')(app);
require('./routes/CheckWorkApply')(app);
require('./routes/CheckUserApply')(app);
require('./routes/FormCV')(app);
require('./routes/TagFormCV')(app);
require('./routes/GetCategoriHome')(app);
require('./routes/SearchWork')(app);
require('./routes/ChangePassword')(app);

require('./routes/LivesearchResult')(app)

app.use(function (err, req, res, next) {
    res.status(500).send(err);
});

app.listen(process.env.PORT || 777, () => {
    console.log('Chào mừng bạn đến với Backend');
});
