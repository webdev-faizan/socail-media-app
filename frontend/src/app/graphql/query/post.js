import { gql } from "@apollo/client";

export const GET_ALL_POST = gql`
  query GetAllPost($pageNo: Int, $limit: Int) {
    getAllPost(page: $pageNo, limit: $limit) {
      data {
        id
        title
        description
        attachment
        createdAt
        likeCount
        commentCount
        likes
        postOwner {
          firstName
          lastName
          id
          email
        }
      }
    }
  }
`;

export const GET_COMMENTS = gql`
  query ($postId: ID!) {
    getComments(postId: $postId) {
      data {
        comment
        createdAt
        user {
          firstName
          lastName
        }
      }
    }
  }
`;
