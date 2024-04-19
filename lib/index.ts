"use server";

import { cookies } from "next/headers";
import { Client, Account, ID } from "node-appwrite";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  const session = cookies().get("my-custom-session");
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}

export async function signUpWithEmail(
  email: string,
  password: string,
  name: string
) {
  try {
    const { account } = await createAdminClient();

    const result = await account.create(ID.unique(), email, password, name);
    console.log({ account: result });

    // const session = await account.createEmailPasswordSession(email, password);

    // console.log({ result, session });

    // cookies().set("my-custom-session", session.secret, {
    //   path: "/",
    //   httpOnly: true,
    //   sameSite: "strict",
    //   secure: true,
    // });

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    return null;
  }
}

export async function signOut() {
  try {
    const { account } = await createSessionClient();

    cookies().delete("my-custom-session");
    await account.deleteSession("current");
  } catch (error) {
    return null;
  }
}
