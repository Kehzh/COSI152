var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/showDogpedia',
    async (req, res, next) => {
        const url = "https://api.thedogapi.com/v1/breeds"
        const header = { 'x-api-key': '7cd9b01f-0461-4dfc-9cc4-ba41fc4ab7dc' }
        const response = await axios.get(url, header)
        res.locals.list = response.data || []
        res.render('showDogpedia')
    })

router.get('/showDogpedia/:id',
    async (req, res, next) => {
        const id = req.params.id;
        const url1 = "https://api.thedogapi.com/v1/images/search?breed_id="+id
        const header = { 'x-api-key': '7cd9b01f-0461-4dfc-9cc4-ba41fc4ab7dc'}
        const response1 = await axios.get(url1, header)
        const url2 = "https://api.thedogapi.com/v1/breeds/"+id
        const response2 = await axios.get(url2, header)
        res.locals.img = response1.data[0]
        res.locals.detail = response2.data
        res.render('showdetail')
    })
module.exports = router;