import Link from "next/link";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!);

async function Quizzes() {
  const quizzes = await sql`
SELECT * FROM quizzes
`;

  return (
    <ul>
      {quizzes.map((quiz) => {
        return (
          <li key={quiz.id}>
            <Link href={`./quiz/${quiz.id}`}>{quiz.name}</Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function Home() {
  return (
    <main>
      <h1> Quiz App</h1>
      <Quizzes />
    </main>
  );
}
