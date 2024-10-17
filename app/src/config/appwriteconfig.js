import { Client, Account, Databases, ID } from 'appwrite'; // Correct import for Databases

// Constants
const cms_db_id = "670d75b40033c6241232";
const blog_collection_id = "670e9fbb00038f8c7dd3";
const project_id = "670ce70e003423027b9f";

// Initialize the Appwrite client
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Set Appwrite endpoint
    .setProject(project_id); // Set your project ID

// Export account and database instances
export const account = new Account(client);

const db = new Databases(client); // Initialize Databases correctly

// Export constants
export { cms_db_id, blog_collection_id, project_id, client, db, ID };
