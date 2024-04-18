import * as sdk from "node-appwrite";
import { NextResponse } from "next/server";

export const revalidate = 0;
export const dynamic = "force-dynamic";

const client = new sdk.Client();

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT!)
  .setProject(process.env.APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_SECRET!);

export const databases = new sdk.Databases(client);

export const GET = async () => {
  try {
    const result = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_COLLECTION_ID!
    );

    return NextResponse.json({ result });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to create an account:",
      error
    );
  }
};

export const POST = async (request: Request) => {
  const { title, type } = await request.json();

  try {
    const result = await databases.createDocument(
      "6620b37b014799e3e155",
      "6620b3adcdc01d094ec9",
      sdk.ID.unique(),
      {
        title,
        type,
      }
    );

    return NextResponse.json({ result });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to create an account:"
    );
  }
};
