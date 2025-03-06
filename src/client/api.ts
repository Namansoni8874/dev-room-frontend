import { GraphQLClient } from "graphql-request";

const  isClient=typeof window !== "undefined"

export const graphqlClient=new GraphQLClient("https://dev-room-two.vercel.app/graphql",{
    headers:()=>({
        Authorization:isClient ? `Bearer ${window.localStorage.getItem("token")}`
        :"undefined"
    })
})