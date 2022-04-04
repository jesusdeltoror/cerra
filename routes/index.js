
var express = require('express');
var router = express.Router();
var {client, dbName} = require('../db/mongo');
var mercadopago = require('mercadopago');
mercadopago.configurations.setAccessToken("TEST-2176975002769825-032800-2b7ef10b4a32bdf28352742c138c71e2-1096924092");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/process_payment', function(req, res, next) {
  var payment_data = {
    transaction_amount: Number(req.body.transactionAmount),
    token: req.body.token,
    description: req.body.description,
    installments: Number(req.body.installments),
    payment_method_id: req.body.paymentMethodId,
    issuer_id: req.body.issuer,
    payer: {
      email: req.body.cardholderEmail,
      identification: {
        number: req.body.identificationNumber
      }
    }
  };
  
  console.log("PAYMENT_DATA");
  console.log(payment_data);
  mercadopago.payment.save(payment_data)
    .then(function(response) {
      res.status(response.status).json({
        status: response.body.status,
        status_detail: response.body.status_detail,
        id: response.body.id
      });
    })
    .catch(function(error) {
      console.error(error)
    });
});


router.post('/webhooks', function(req, res, next){
  console.log("REQ WEBHOOk");
  console.log(req);
  var payment_data = {
    transaction_amount: Number(req.body.transactionAmount),
    token: req.body.token,
    description: req.body.description,
    installments: Number(req.body.installments),
    payment_method_id: req.body.paymentMethodId,
    issuer_id: req.body.issuer,
    /* notification_url: "https://cerrapp.herokuapp.com/webhooks", */
    payer: {
      email: req.body.email,
      identification: {
        number: req.body.docNumber
      }
    }
  };

  console.log("TODO WEBHOOK");
  console.log(payment_data);
  
/*   mercadopago.payment.save(payment_data)
    .then(function(response) { 
      res.status(response.status).json({
        status: response.body.status,
        status_detail: response.body.status_detail,
        id: response.body.id
      });
    })
    .catch(function(error) {
      res.status(400).send(error);
    }); */
    

    mercadopago.payment.findById(req.body.id)
    .then(function(response) { 
      res.status(response.status).json({
        status: response.body.status,
        status_detail: response.body.status_detail,
        id: response.body.id
      });
    })
      .catch(function(error) {
        res.status(400).send(error);
      });
});


module.exports = router;
