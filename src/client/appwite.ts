import { Account, Client, Storage } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67c9df760008a58cfb70');

const storage = new Storage(client);
const account = new Account(client);

const checkSession = async () => {
    try {
        const session = await account.get();
        console.log("✅ User Session:", session);
    } catch (error) {
        console.error("❌ Error fetching session:", error);
    }
};

checkSession();

export { storage };