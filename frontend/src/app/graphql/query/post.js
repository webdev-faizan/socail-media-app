import { gql } from "@apollo/client";

export const GET_ALL_POST = gql`
  query GetAllPost($pageNo: Int!, $limit: Int, $query: String) {
    getAllPost(page: $pageNo, limit: $limit, query: $query) {
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
          profile
        }
      }
    }
  }
`;
export const GET_USER_POST = gql`
  query GetUserPost($pageNo: Int, $limit: Int) {
    getUserPost(page: $pageNo, limit: $limit) {
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
          profile

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
          profile

        }
      }
    }
  }
`;

export const GET_SHARE_POST = gql`
  query ($id: String) {
    getSharePost(id: $id) {
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
          profile

        }
      }
    }
  }
`;

export const GET_VIEW_USER_POST = gql`
  query ViewUserPost($pageNo: Int, $limit: Int, $id: ID) {
    getViewUserPost(page: $pageNo, limit: $limit, id: $id) {
      data {
        title
        description
        attachment
        createdAt
        likeCount
        commentCount
        likes
        _id
        postOwner {
          firstName
          lastName
          profile
          _id
        }
      }
    }
  }
`;
