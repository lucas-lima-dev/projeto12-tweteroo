import express from "express";
import cors from "cors";

const PORT = 5000;
const app = express();
app.use(express.json());
app.use(cors());

const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
  const userData = req.body;

  const id = users.length + 1;
  userData.id = id;

  users.push(userData);

  res.send("OK");
  
});


app.post("/tweets", (req, res) => {

  const tweetData = req.body;

  const isAuthorized = users.find(
    (item) => item.username === tweetData.username
  );


  if (isAuthorized) {
    const id = tweets.length + 1;
    tweetData.id = id;
    tweetData.avatar = isAuthorized.avatar
    tweets.push(tweetData);
    console.log(tweets)

    res.send("OK");
  } else {
    res.send("UNAUTHORIZED");
  }
});

app.get("/tweets", (req, res) => {

  const lastTenTweets = tweets.slice(-10)
  
  res.send(lastTenTweets)
});

app.listen(PORT, () => {
  console.log(`Servidor funfou na porta: ${PORT}!`);
});
