import { gql } from "@apollo/client";
export const CREATE_POST = gql`
  mutation ($data: PostInput) {
    createPost(postInfo: $data) {
      message
    }
  }
`;

// export const CREATE_POST = gql`
//   mutation ($data: PostInput) {
//     createPost(postInfo: $data) {
//       message
//     }
//   }
// `;
// export const CREATE_POST = gql`
//   mutation CreatePost($file: Upload!) {
//     createPost(file: $file) {
//       message
//     }
//   }
// `;
// export const CREATE_POST = gql`
//   mutation ($data: PostInput) {
//     createPost(postInfo: $data) {
//       message
//     }
//   }
// `;
