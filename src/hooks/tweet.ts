import { useMutation, useQuery, useQueryClient,  } from "@tanstack/react-query"
import { CreateTweetData } from "../gql/graphql"
import { graphqlClient } from "../client/api"
import { createBlog } from "../graphql/mutation/tweet"
import { GetAllBlogs } from "../graphql/query/tweet"
import toast from "react-hot-toast"




export const useCreateBlog=()=>{
    const queryClient=useQueryClient()
    const mutation=useMutation({
        mutationFn:async(payload:CreateTweetData)=>{
            const response=await graphqlClient.request(createBlog,{payload}) 
            return response
        },
        onMutate:(payload) => toast.loading("Creating Tweet", { id: "1" }),
        onSuccess:async()=>{
            toast.dismiss("1")
            queryClient.invalidateQueries(["get-blogs"])}

    })
    return mutation
}

export const useGetAllBlogs=()=>{
    const query=useQuery({
        queryKey:["get-blogs"],
        queryFn:()=>{
            
            return graphqlClient.request(GetAllBlogs)}
            
    })
    
    return {...query,blogs:query.data?.getAllTweets}
}