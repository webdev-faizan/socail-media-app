import { PostModel } from '../../../model/postModel';

const getAllPostsResolver = async () => {
  try {
    const allPosts = await PostModel.find({}).lean();

    return {
      success: true,
      data: allPosts,
    };
  } catch (error) {
    console.error('Error fetching posts:', error);

    return {
      success: false,
      error: 'Internal server error',
    };
  }
};

export default getAllPostsResolver;
