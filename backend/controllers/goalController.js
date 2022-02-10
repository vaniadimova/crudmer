const asyncHandler = require('express-async-handler')


// GET GOALS
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
   res.status(200).json({message: 'GET GOALS'});
  });

// SET GOAL
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler (async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Text is Required');
  }
res.status(200).json({message: 'SET GOALS'});
  })

// UPDATE GOAL
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({message: `UPDATE GOAL ${req.params.id}`})

  })

// DELETE GOAL
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal =  asyncHandler (async (req, res) => {
  res.status(200).json({message: `DELETE GOAL ${req.params.id}`});
  })


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}