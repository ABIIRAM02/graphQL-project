import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation createMutation($title: String!, $description: String!) {
    createPost(post: { title: $title, description: $description }) {
      title
      description
    }
  }
`;

export const DELETE_POST = gql`
  mutation deleteMutation($id: ID!) {
    deletePost(id: $id)
  }
`;

export const UPDATE_POST = gql`
  mutation updateMutation($id: ID!, $title: String, $description: String) {
    updatePost(id: $id, post: { title: $title, description: $description }) {
      title
      description
    }
  }
`;
