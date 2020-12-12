const { Router } = require('express');
const pinsController = require('./pins.controller');
const router = Router();

router.route('/').get(pinsController.getAll).post(pinsController.create);

router
  .route('/:id')
  .get(pinsController.getOne)
  .put(pinsController.update)
  .delete(pinsController.remove);

module.exports = router;
