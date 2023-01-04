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
    res.send(data)
})
  const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`listening on port : ${port}`);
});