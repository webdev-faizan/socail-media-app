import { PostModel } from '../../../model/postModel';

const getUserPosts = async (userId) => {
  try {
    const userPosts = await PostModel.find({
      user: userId,
    }).lean();

    return {
      success: true,
      data: userPosts,
    };
  } catch (error) {
    console.error('Error fetching user posts:', error);

    return {
      success: false,
      error: 'Failed to fetch user posts. Please try again later.',
    };
  }
};

export default getUserPosts;
