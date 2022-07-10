var express = require('express');
var router = express.Router();

const MissingDog = require('../models/missingdog');

const isLoggedIn = (req, res, next) => {
  if (res.locals.loggedIn) {
    console.log(res.locals.loggedIn)
    next()
  }
  else res.redirect('/login')
}


/* GET users listing. */
router.get('/showMissingDogs',
  isLoggedIn,
  async (req, res, next) => {
    res.locals.missingdogs =
      await MissingDog.find({})
    res.render('showMissingDogs');
  });

router.post('/showMissingDogs',
  isLoggedIn,
  async (req, res, next) => {
    try {
      const { name, address, breed, time, image } = req.body;
      const missingdog =
        new MissingDog(
          { name, address, breed, time, image });
      await missingdog.save();
      res.redirect('/showMissingDogs')

    } catch (e) {
      next(e)
    }
  })

var toModify;
router.get('/showMissingDogs/modify/:name',
  isLoggedIn,
  async (req, res, next) => {
    try {
      const change = req.params.name;
      toModify = await MissingDog.find({ name: change });
      await MissingDog.deleteOne({ name: change });
      console.log(toModify);
      res.redirect('/modify');
    } catch (e) {
      next(e);
    }
  })

router.get('/modify',
  isLoggedIn,
  (req, res, next) => {
     res.locals.dog = toModify[0];
     console.log(res.locals.dog);
     res.render('modify');
  });

router.post('/modify',
  isLoggedIn,
  async (req, res, next) => {
    try {
      const { name, address, breed, time, image } = req.body;
      const missingdog =
        new MissingDog(
          { name, address, breed, time, image });
      await missingdog.save();
      res.redirect('/showMissingDogs')

    } catch (e) {
      next(e)
    }
  });

router.get('/showMissingDogs/clear/:name',
  isLoggedIn,
  async (req, res, next) => {
    try {
      const deletename = req.params.name;
      await MissingDog.deleteOne({ name: deletename });
      res.redirect('/showMissingDogs');
    } catch (e) {
      next(e);
    }
  })

router.get('/showMissingDogs/clear',
  isLoggedIn,
  async (req, res, next) => {
    await MissingDog.deleteMany({})
    res.redirect('/showMissingDogs')
  }
)
module.exports = router;