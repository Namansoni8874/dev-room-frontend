import { Client, Storage } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67c9df760008a58cfb70');

const storage = new Storage(client);

export { storage };