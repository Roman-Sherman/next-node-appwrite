"use server";

import * as sdk from "node-appwrite";
import { revalidatePath } from "next/cache";

const client = new sdk.Client();
client
  .setEndpoint(process.env.APPWRITE_ENDPOINT!)
  .setProject(process.env.APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_SECRET!);

const databases = new sdk.Databases(client);

// CREATE: A new task in database
export async function createTask(title: string, type: string) {
  const result = await databases.createDocument(
    "6620b37b014799e3e155",
    "6620b3adcdc01d094ec9",
    sdk.ID.unique(),
    {
      title,
      type,
    }
  );

  revalidatePath("/");

  return JSON.parse(JSON.stringify(result));
}

// GET: All tasks from database
export async function getTasks() {
  try {
    const result = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_COLLECTION_ID!
    );

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Error", error);
  }
}
