import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1> Quiz App</h1>
      <ul>
        <li>
          <Link href="/quiz/1"> Quiz 1</Link>
        </li>
        <li>
          <Link href="/quiz/2"> Quiz 2</Link>
        </li>
        <li>
          <Link href="/quiz/3"> Quiz 3</Link>
        </li>
      </ul>
    </main>
  );
}
