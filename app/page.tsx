import { getAccount, getLoggedInUser, signUpWithEmail } from "@/lib";

export default async function SignUpPage() {
  const user = await getLoggedInUser();
  console.log({ user });

  const userAccount = await getAccount();
  console.log({ userAccount });

  async function signUp(formData: any) {
    "use server";

    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");

    await signUpWithEmail(email, password, name);
  }

  return (
    <>
      <form action={signUp}>
        <input id="email" name="email" placeholder="Email" type="email" />
        <input
          id="password"
          name="password"
          placeholder="Password"
          minLength={8}
          type="password"
        />
        <input id="name" name="name" placeholder="Name" type="text" />
        <button type="submit">Sign up</button>
      </form>

      {/* <Create /> */}
    </>
  );
}
