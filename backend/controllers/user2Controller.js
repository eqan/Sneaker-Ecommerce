
var errorCode = 500;

app.get("/users", (req, res) => {
    UserModel.find({}, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  });

app.get("/user", (req, res) => {
    const {id} = req.query;
    UserModel.find({_id: id}, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  });


app.post('/user', async(req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    try
    {
      await newUser.save();
      res.json(user);
    }
    catch(error)
    {
      res.send(errorCode, "User already added!")
    }
})
