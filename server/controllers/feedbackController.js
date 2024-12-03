import Feedback from "../models/feedbackModel.js"

 const createFeedback = async (req, res) => {
//   const { userId,complaintId } = req.body;

  try {
        const { complaintId, userId, feedbackText } = req.body;

        // Validate input
        if (!complaintId || !userId || !feedbackText) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create new feedback document
        const feedback = new Feedback({
            complaintId,
            userId,
            feedbackText,
        });

        // Save feedback to database
        const savedFeedback = await feedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully', feedback: savedFeedback });
    } catch (err) {
        console.error('Error creating feedback:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

 const getFeedback= async (req,res)=>{
    try{
        const feedbacks= await Feedback.find().populate('userId').populate('complaintId');
        res.status(200).json(feedbacks);

    }catch(err){
        console.error("Error greating feedback:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}


const deleteFeedback = async (req, res) => {
  try {
    const { feedbackId } = req.params;

    // Find and delete the feedback
    const deletedFeedback = await Feedback.findByIdAndDelete(feedbackId);

    if (!deletedFeedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (err) {
    console.error("Error deleting feedback:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


const updateFeedback = async (req, res) => {
  try {
    const { feedbackId } = req.params;
    const { feedbackText } = req.body;

    // Validate input
    if (!feedbackText) {
      return res.status(400).json({ error: "Feedback text is required" });
    }

    // Find and update the feedback
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      feedbackId,
      { feedbackText },
      { new: true } // Return the updated document
    );

    if (!updatedFeedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    res
      .status(200)
      .json({
        message: "Feedback updated successfully",
        feedback: updatedFeedback,
      });
  } catch (err) {
    console.error("Error updating feedback:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};






export default {
    getFeedback,createFeedback,updateFeedback,deleteFeedback
}
