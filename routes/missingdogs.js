var express = require('express');
var router = express.Router();

const MissingDog = require('../models/missingdog');

const isLoggedIn = (req,res,next) => {
  if (res.locals.loggedIn) {
    next()
  }
  else res.redirect('/login')
}


/* GET users listing. */
router.get('/showMissingDogs', 
//   isLoggedIn,
  async (req, res, next)  => {
    res.locals.missingdogs= 
        await MissingDog.find({})
    res.render('showMissingDogs');
});

router.post('/showMissingDogs',
//   isLoggedIn,
  async (req,res,next) => {
    try{
        const {name,address,breed,time,image} = req.body;
        const missingdog = 
          new MissingDog(
            {name,address,breed,time,image});
        await missingdog.save();
        res.redirect('/showMissingDogs')

    } catch(e){
        next(e)
    }
  })

  router.get('/showMissingDogs/clear',
  async (req, res, next)  => {
      await MissingDog.deleteMany({})
      res.redirect('/showMissingDogs')
  }
)
module.exports = router;