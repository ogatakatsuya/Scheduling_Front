import { useState } from "react";

const Form = ({ accessToken, setTasks }) => {
  const [task, setTask] = useState("");
  const [memo, setMemo] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const add = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/task/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // アクセストークンをヘッダーに追加
      },
      body: JSON.stringify({ task: task, memo: memo, date: date }),
    });
    const data = await res.json();
    // 画面上にメッセージを表示
    if (res.ok) {
      setMessage(data.message);
      setTasks((prev) => [...prev, data.new_task]);
    } else {
      setMessage("error something wrong");
    }
    setTask("");
    setMemo("");
    setDate("");
  };

  return (
    <>
      <h1>Add</h1>
      <form onSubmit={add}>
        <div>
          <label>タイトル</label>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <div>
          <label>メモ</label>
          <input
            type="text"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>
        <div>
          <label>日付</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <button>追加</button>
        </div>
        <p>{message}</p>
      </form>
    </>
  );
};

export default Form;
