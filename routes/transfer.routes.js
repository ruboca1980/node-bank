const express = require('express');

const transfersRouter = express.Router();

const transferController = require('./../controllers/transfer.controller');

transfersRouter.post('/', transferController.sendTransfer);

module.exports = transfersRouter;
