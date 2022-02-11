const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// GET GOALS
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })

   res.status(200).json(goals);
  });

// SET GOAL
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler (async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Text is Required');
  }
const goal = await Goal.create({
  text: req.body.text,
  user: req.user.id
})

res.status(200).json(goal);
  })

// UPDATE GOAL
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }
// Check for user
if (!req.user) {
  res.status(401)
  throw new Error('User not found')
}

// logged in user matches the goal user
if (goal.user.toString() !== req.user.id) {
  res.status(401)
  throw new Error('User not authorized')
}

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(200).json(updatedGoal)

  })

// DELETE GOAL
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal =  asyncHandler (async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }
// Check for user
if (!req.user) {
  res.status(401)
  throw new Error('User not found')
}

// Make sure the logged in user matches the goal user
if (goal.user.toString() !== req.user.id) {
  res.status(401)
  throw new Error('User not authorized')
}

  await goal.remove()

  res.status(200).json({ id: req.params.id });
  })


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}