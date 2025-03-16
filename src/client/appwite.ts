import { Account, Client, Storage } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67c9df760008a58cfb70');

const storage = new Storage(client);
const account = new Account(client);
const session = account.get();

session.then((session)=>console.log("User Session:", session))


export { storage };