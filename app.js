const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
const ejs = require("ejs");
const port = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home");
});

let res1, res2, limit, userName , pageNo;


app.post("/", async (req, res) => {
  userName = req.body.userName;
  limit = req.body.limit;

//   console.log(limit);
  try {
    const data = await fetch("https://api.github.com/users/" + userName);
    res1 = await data.json();

    const data2 = await fetch(
      "https://api.github.com/users/" + userName + "/repos?per_page=" + limit
    );
    res2 = await data2.json();

    // console.log(res1);
    // console.log(res2)
  } catch (error) {
    console.log(error);
  }
  res.redirect("/response");
});

app.post("/response", async (req, res)=>{
    
    try {
        const option = req.body.option;
        
        
        const Limit = parseInt(limit);
        const PageNo = parseInt(pageNo);
        const Option = parseInt(option);
        if(!Option){
            Option = 1;
        }
        
        const data2 = await fetch(
          "https://api.github.com/users/" + userName + "/repos?per_page=" + Limit + "&page=" + Option
        );
        res2 = await data2.json();
    
        // console.log(res2)
      } catch (error) {
        console.log(error);
      }
      res.redirect("/response");
});

app.get("/response", async (req, res) => {

  res.render("response", {
    imageUrl: res1.avatar_url,
    githubLink: res1.html_url,
    name: res1.name,
    description: res1.company,
    location: res1.location,
    posts: res2,
  });
});
app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});
