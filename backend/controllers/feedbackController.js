const Feedback = require('../models/Feedback');

// Create feedback
const createFeedback = async (req,res) =>{
    try{
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully' });
    }catch (err) {
        res.status(400).json({ error: err.message });
    }
};
// Get All Feedback (Admin)
const getAllFeedback = async (req, res) => {
    try {
      const feedbackList = await Feedback.find().sort({ createdAt: -1 });
      res.json(feedbackList);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // Get Feedback By Id 
const getFeedbackById = async(req,res) =>{
    try{
        const feedback = await Feedback.findById(req.params.id);
        if(!feedback){
            return res.status(404).json({message:"Not Found"});
        }
        res.json(feedback);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};

//Update Feedback
const updateFeedback = async (req,res) =>{
    try{
        const updated= await Feedback.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new:true}
        );

        if(!updated) return res.status(404).json({message:'Not found'});
        res.json(updated);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};

//stats
const getFeedbackStats = async (req, res) => {
    try {
      const stats = await Feedback.aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
          },
        },
      ]);
      res.json(stats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

module.exports = {
    createFeedback,
    getAllFeedback,
    getFeedbackById,
    updateFeedback,
    getFeedbackStats
};