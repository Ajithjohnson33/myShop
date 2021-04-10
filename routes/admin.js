var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let products=[
    {
      name:"samsung",
      category:"mobile",
      description:"this is a phone",
      image:"data:image/jpeg;base64,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"
    },
    {
      name:"iphone",
      category:"mobile",
      description:"this is a phone",
      image:"data:image/jpeg;base64,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"
    },
    {
      name:"oppo",
      category:"mobile",
      description:"this is a phone",
      image:"data:image/jpeg;base64,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"
    },
    {
      name:"vivo",
      category:"mobile",
      description:"this is a phone",
      image:"data:image/jpeg;base64,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"
    }

  ]

  res.render('admin/view-products',{admin:true,products});
});
router.get('/add-products', function(req,res){
  res.render('admin/add-product')
})

router.post('/add-products',(req,res)=>{
  console.log(req.body);
  console.log(req.files.Image);
})


module.exports = router;
