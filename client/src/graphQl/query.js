import { gql } from "@apollo/client";

export const getAllPost = gql`
{
  getPosts {
    id
    title
    description
  }
}
`; 