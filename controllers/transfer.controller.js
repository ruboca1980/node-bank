const Transfer = require('../models/transfers.model');
const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');

exports.sendTransfer = catchAsync(async (req, res) => {
  const { amount, senderUserId, accountNumber } = req.body;

  const userRx = await User.findOne({
    where: {
      status: 'active',
      accountNumber,
    },
  });

  const userTx = await User.findOne({
    where: {
      status: 'active',
      id: senderUserId,
    },
  });

  if (!userRx || !userTx) {
    return res.status(404).json({
      message: 'Account number or sender not found',
    });
  }

  if (userTx.amount < amount) {
    return res.status(404).json({
      message: "You don't have enough balance",
    });
  }

  if (userTx.id === userRx.id) {
    return res.status(404).json({
      message: "You can't send money to your account",
    });
  }

  const newAmountUserTx = +userTx.amount - +amount;
  const newAmountUserRx = +userRx.amount + +amount;

  await userTx.update({ amount: newAmountUserTx });
  await userRx.update({ amount: newAmountUserRx });

  const transfer = await Transfer.create({
    amount,
    senderUserId,
    accountNumber,
  });

  res.status(200).json({
    status: 'succes',
    message: 'Successful transfer!',
    transfer,
  });
});
