const { Router } = require('express');
const boardsController = require('./boards.controller');
const pinsController = require('../pins/pins.controller');
const router = Router();

router.route('/').get(boardsController.getAll).post(boardsController.create);

router
  .route('/:id')
  .get(boardsController.getOne)
  .patch(boardsController.update)
  .delete(boardsController.remove);

router.route('/:boardId/pins').get(pinsController.getPinsOfBoard);

module.exports = router;
