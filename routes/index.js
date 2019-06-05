var express = require('express');
var router = express.Router();
var db=require('./db');
const jwt = require('jsonwebtoken');
const SECRET = 'alskdhJNbjkbsdjkJBHj98JHBH$';
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/check', function(req, res, next) {
  const name = req.body.name;
  const pass = req.body.pass;
  const consulta = db.query('SELECT id FROM users WHERE ? AND ?',[{name},{pass}],function(error,filas){
    console.log(consulta.sql);
    if (error) {            
      console.log('error en el listado: ' + error);
      return;
    }
    if(filas.length){
      const token = jwt.sign(filas[0].id , SECRET);
      res.send({token});
    }else{
      res.send({msg: '403'});
    }
  });
});

router.post('/datos', function(req, res, next) {
  const id = jwt.verify(req.body.id, SECRET);
  
  const consulta = db.query('SELECT others FROM users WHERE ? ',[{id}],function(error,filas){
    console.log(consulta.sql);
    if (error) {            
      console.log('error en el listado: ' + error);
      return;
    }
    console.log(filas)
      res.send(filas[0])

  });
});


module.exports = router;
