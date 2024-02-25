import { gql } from "@apollo/client";
export const CREATE_POST = gql`
  mutation ($data: PostInput) {
    createPost(postInfo: $data) {
      message
    }
  }
`;
export const CREATE_COMMENT = gql`
  mutation ($data: CommentInput) {
    createComment(createComment: $data) {
      message
    }
  }
`;
