import { useQuery } from "@tanstack/react-query"
import { graphqlClient } from "../client/api"
import { GetCurrentUser, GetUserById } from "../graphql/query/User"




export const useCurrentUser=()=>{
      const query=useQuery({
        queryKey:["current-user"],
        queryFn:()=>graphqlClient.request(GetCurrentUser)

      })
      return {...query,user:query.data?.getCurrentUser}
}

export const useGetUserById=(id:string)=>{
  const query=useQuery({
    queryKey:["getuser-byid"],
    queryFn:async()=>{
     return graphqlClient.request(GetUserById,{id})
    }
  })
  return {...query,userByID:query.data?.getUserById}
}