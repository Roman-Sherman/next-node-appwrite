"use server";

import { cookies } from "next/headers";

export async function createEmailSession(email: string, password: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/account/sessions/email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Appwrite-Response-Format": "1.4.0",
          "X-Appwrite-Project": process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
        },
        body: JSON.stringify({ email, password }),
      }
    );

    // get cookies
    const responseCookie = response.headers.get("set-cookie");
    console.log({ responseCookie });

    // set cookie
    cookies().set("appwrite-session", responseCookie!);

    const result = await response.json();
    console.log({ session: result });

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Error", error);
  }
}

export async function getAccount() {
  try {
    const appWriteCookie = cookies().get("appwrite-session");
    console.log({ appWriteCookie });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/account`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Appwrite-Response-Format": "1.4.0",
          "X-Appwrite-Project": process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
          "X-Appwrite-Key": process.env.NEXT_PUBLIC_APPWRITE_KEY!,
          Cookie: appWriteCookie?.value!,
        },
      }
    );

    const result = await response.json();
    console.log({ account: result });

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Error", error);
  }
}
