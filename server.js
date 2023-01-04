const express=require('express')
const app=express();
const data=[
    {
      "name": "staff",
      "members": ["talea@techtonica.org", "michelle@techtonica.org"]
    },
    {
      "name": "students",
      "members": ["chris@techtonica.org", "hamid@techtonica.org"]
    }
  ]

app.get('/lists', (req,res)=> {
    nameList=[];
    data.map(dataElm => nameList.push(dataElm.name))
    // if (nameList){
    res.status(200).json(nameList)
    return
    // }
    // else{
    //     res.status(200).send('')
    // }
})



app.get('/lists/:name', (req,res)=> {
    listFound=data.find(dataElm => (dataElm.name ===req.params.name));
     if (listFound){
    res.status(200).json(listFound);
    }
    else{
        res.sendStatus(404);
    }
    return;
})
  const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`listening on port : ${port}`);
});