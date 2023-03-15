import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [questionInput, setQuestionInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: questionInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setQuestionInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI My Chat</title>
        <link rel="icon" href="/chat.png" />
      </Head>

      <main className={styles.main}>
        <img src="/chat.png" className={styles.icon} />
        <h3>My Chat</h3>
        <form onSubmit={onSubmit}>
          <textarea
            type="text"
            name="question"
            placeholder="Enter an question"
            rows="5"
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
          />
          
          <input type="submit" value="Send Question" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
