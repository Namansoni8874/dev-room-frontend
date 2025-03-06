import { graphql } from "../../gql";



export const GetAllBlogs = graphql(`
  #graphql
  query GetAllBlogs {
    getAllTweets {
      id
      content
      imageURL
      author {
        id
        firstName
        lastName
        profileImageURL
      }
    }
  }
`);
