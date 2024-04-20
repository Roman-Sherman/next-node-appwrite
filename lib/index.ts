"use server";

import { cookies } from "next/headers";
import { Client, Account, ID } from "node-appwrite";

export async function createEmailSession(email: string, password: string) {
  try {
    const response = await fetch(
      `${process.env.APPWRITE_ENDPOINT}/account/sessions/email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Appwrite-Response-Format": "1.4.0",
          "X-Appwrite-Project": process.env.APPWRITE_PROJECT!,
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const responseCookie = response.headers.get("set-cookie");
    cookies().set("appwrite-cookie", responseCookie!);

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error", error);
  }
}

export async function getAccount() {
  try {
    const appWriteCookie = cookies().get("appwrite-cookie");

    const response = await fetch(`${process.env.APPWRITE_ENDPOINT}/account`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Appwrite-Response-Format": "1.4.0",
        "X-Appwrite-Project": process.env.APPWRITE_PROJECT!,
        "X-Appwrite-Key": process.env.APPWRITE_KEY!,
        Cookie: appWriteCookie?.value!,
      },
    });

    const result = await response.json();
    console.log({ account: result });

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Error", error);
  }
}

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT!);

  const session = cookies().get("appwrite-cookie");

  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setJWT(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT!)
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

    const newAccount = await account.create(ID.unique(), email, password, name);
    await createEmailSession(email, password);

    return JSON.parse(JSON.stringify(newAccount));
  } catch (error) {
    return null;
  }
}

export async function signOut() {
  try {
    const { account } = await createSessionClient();

    cookies().delete("appwrite-cookie");
    await account.deleteSession("current");
  } catch (error) {
    return null;
  }
}
