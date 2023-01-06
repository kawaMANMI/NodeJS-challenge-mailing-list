// var express = require('express');
// var app = express.createServer(express.logger());

// app.post('/', function(request, response) {
//     response.write(request.body.user);
//     response.end();
// });

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

let data = [
  {
    name: "staff",
    members: ["talea@techtonica.org", "michelle@techtonica.org"],
  },
  {
    name: "students",
    members: ["chris@techtonica.org", "hamid@techtonica.org"],
  },
];

app.get("/lists", (req, res) => {
  if (req.path !== "/lists") {
    res.sendStatus(404);
    return;
  }
  let nameList = [];
  data.map((dataElm) => nameList.push(dataElm.name));
  // if (nameList){
  res.status(200).json(nameList);
  res.set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
});
  return;
  // }
  // else{
  //     res.status(200).send('')
  // }
});

//Bonus Extension
app.get("/lists/:name/member", (req, res) => {
  let nameList = [];
  data.map((dataElm) => nameList.push(dataElm.name));
  const pathSplit = req.path.split("/");
  const boo =
    pathSplit[1] === "lists" &&
    nameList.includes(pathSplit[2]) &&
    pathSplit[3] === "member" &&
    pathSplit.length === 4;
  if (!boo) {
    res.sendStatus(404);
    return;
  }
  let listFound = data.find((dataElm) => dataElm.name === req.params.name);
  res.status(200).json(listFound.members);
  return;
});

app.get("/lists/:name", (req, res) => {
  let listFound = data.find((dataElm) => dataElm.name === req.params.name);
  if (listFound) {
    res.status(200).json(listFound);
  } else {
    res.sendStatus(404);
  }
  return;
});

//Method 1
app.delete("/lists/:name", (req, res) => {
  let listFound = data.filter((dataElm) => dataElm.name !== req.params.name);
  if (listFound.length !== data.length) {
    data = [...listFound];
    // res.status(200).send('successfully deleted');
    res.sendStatus(200);
    return;
  } else {
    // res.status(404).send('not found to delete');
    res.sendStatus(404);
  }
  return;
});

app.put("/lists/:name", (req, res) => {
  let listToUpdate = data.find((dataElm) => dataElm.name === req.params.name);
  let index = data.indexOf(listToUpdate);
  let combinedList;
  if (listToUpdate) {
    data[index].members = data[index].members.concat(req.body.members);
    // console.log(data)
    res.sendStatus(200);
  } else {
    data.push(req.body);
    res.sendStatus(201);
  }
  return;
});

//Bonus Extension
app.put("/lists/:name/members/:email", (req, res) => {
  let nameList = [];
  data.map((dataElm) => nameList.push(dataElm.name));
  const pathSplit = req.path.split("/");
  const boo =
    pathSplit[1] === "lists" &&
    // nameList.includes(pathSplit[2]) &&
    pathSplit[3] === "members" &&
    pathSplit.length === 5;
  let listToUpdate = data.find((dataElm) => dataElm.name === req.params.name);
  let index = data.indexOf(listToUpdate);
  let combinedList;
  if (!boo) {
    res.sendStatus(404);
    return;
  }
  if (listToUpdate) {
    data[index].members = data[index].members.concat(req.params.email);
    res.sendStatus(200);
    return;
  } else {
    data.push({ name: req.params.name, members: req.params.email });
    res.sendStatus(201);
  }
});

//Bonus Extension
app.delete("/lists/:name/members/:email", (req, res) => {
  let nameList = [];
  data.map((dataElm) => nameList.push(dataElm.name));
  const pathSplit = req.path.split("/");
  const boo =
    pathSplit[1] === "lists" &&
    nameList.includes(pathSplit[2]) &&
    pathSplit[3] === "members" &&
    pathSplit.length === 5;
  let listToUpdate = data.find((dataElm) => dataElm.name === req.params.name);
  let index = data.indexOf(listToUpdate);
  let indexEmail=data[index].members.indexOf(req.params.email)
  let combinedList;
  if (!boo) {
    res.sendStatus(404);
    return;
  }

  data[index].members.splice(indexEmail,1);
//   res.sendStatus(200);
// console.log(data)
res.sendStatus(200)
  return;
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on port : ${port}`);
});
