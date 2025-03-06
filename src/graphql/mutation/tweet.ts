import { graphql } from "../../gql";

export const createBlog=graphql(`
    #graphql
    mutation CreateBlog($payload:CreateTweetData!){
    createTweet(payload:$payload){
    id
    }
    }
    `)

