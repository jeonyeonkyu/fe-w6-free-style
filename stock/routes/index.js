import express from 'express';
const router = express.Router();
import path from 'path';

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('main');
});

export default router;