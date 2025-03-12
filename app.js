const dotenv=require("dotenv")
dotenv.config()
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const mongoose=require("mongoose")
const errorController = require('./controllers/error');

const User=require("./models/user")

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

 const adminRoutes = require('./routes/admin');
 const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('67d1ea0ea9ab7a7bd4c82ce3')
    .then(user => {
      req.user =user ;
      next();
    })
    .catch(err => console.log(err));
  
});

app.use('/admin', adminRoutes);
 app.use(shopRoutes);

app.use(errorController.get404);

// mo
mongoose.connect(process.env.MONGODB_URL)
.then(result =>{
  User.findOne().then(user => {
    if(!user)
    {
      const user = new User ({
        name : "faizan",
        email: "faizan@gmail.com",
        cart : {
          item: []
        }
      })
      user.save()
    }
  })
  console.log("Connected")
  app.listen(3000)
})
.catch(err =>{
  console.log(err)
})