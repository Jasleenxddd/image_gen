import axios from 'axios';
import FormData from 'form-data';
import userModel from '../models/userModel.js';

export const generateImage = async (req, res) => {
  try {
    const userId = req.user?.id; 
    const { prompt } = req.body;

    // Validate userId and prompt
    if (!userId || typeof prompt !== 'string' || prompt.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Missing or invalid prompt or user ID',
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    
    // Check credit balance
    if (user.creditBalance <= 0) {
      return res.status(403).json({
        success: false,
        message: 'No Credit Balance',
        creditBalance: user.creditBalance,
      });
    }

    // Prepare FormData for Clipdrop
    const formdata = new FormData();
    formdata.append('prompt', prompt.trim());

    // External API call
    const clipdropResponse = await axios.post(
      'https://clipdrop-api.co/text-to-image/v1',
      formdata,
      {
        headers: {
          'x-api-key': process.env.CLIPDROP_API,
          ...formdata.getHeaders(),
        },
        responseType: 'arraybuffer',
      }
    );

    // Convert image to base64
    const base64Image = Buffer.from(clipdropResponse.data, 'binary').toString('base64');
    const resultImage = `data:image/png;base64,${base64Image}`;

    // Deduct 1 credit
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $inc: { creditBalance: -1 } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Image generated successfully',
      resultImage,
      creditBalance: updatedUser.creditBalance,
    });
  } catch (error) {
    console.error('Generate Image Error:', error?.response?.data || error.message);

    const statusCode = error.response?.status || 500;
    const message =
      error.response?.data?.message || error.message || 'Unexpected error occurred';

    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
};
