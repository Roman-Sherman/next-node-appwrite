import Create from "./create";
import { getTasks } from "@/lib";

export const revalidate = 0;

async function Home() {
  const tasks = await getTasks();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Next.js Node Appwrite</h1>
      <code>{JSON.stringify(tasks, null, 2)}</code>

      <Create />
    </main>
  );
}

export default Home;
