import { graphql } from "../../gql";


export const FollowUser=graphql(`
    #graphql
    mutation FollowUser($to:ID!){
    followUser(to:$to)
    }
    `)

export const UnFollowUser=graphql(`
    #graphql
    mutation UnFollowUser($to:ID!){
    unfollowUser(to:$to)
    }
    `)