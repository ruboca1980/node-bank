const User = require('./../models/users.model');
const catchAsync = require('./../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;
  const user = await User.create({
    name,
    password,
  });

  res.status(201).json({
    status: 'success',
    message: 'The user has been created successfully',
  });
});
