const User = require('./../models/users.model');
const catchAsync = require('./../utils/catchAsync');

exports.findAll = catchAsync(async (req, res) => {
  const users = await User.findAll({
    where: {
      status: 'active',
    },
  });
  return res.status(200).json({
    status: 'success',
    results: users.length,
    users,
  });
});

exports.findOne = catchAsync(async (req, res) => {
  const { user } = req;

  return res.status(200).json({
    status: 'success',
    user,
  });
});

exports.update = catchAsync(async (req, res) => {
  const { name, email } = req.body;
  const { user } = req;

  await user.update({ name, email });

  return res.status(200).json({
    status: 'succes',
    message: 'the user has been update',
  });
});

exports.delete = catchAsync(async (req, res) => {
  const { user } = req;

  await user.update({ status: 'disabled' });

  return res.status(200).json({
    status: 'success',
    message: 'the user has been deleted',
  });
});
