import { useState, useEffect } from "react";
import Form from "./Form";

const Index = ({ accessToken }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:5000/task/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setTasks(data);
          console.log(tasks);
        } else {
          console.error("Error fetching tasks:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [accessToken]);

  const deleteTask = async (task_id) => {
    const url = "http://localhost:5000/task/" + task_id;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (res.ok) {
      console.log(res.message);
      setTasks((prev) => prev.filter((task) => task.id != task_id));
    } else {
      console.log("error");
    }
  };

  return (
    <>
      {tasks.map((task) => (
        <div key={task.id}>
          <p>タイトル：{task.task}</p>
          <p>メモ：{task.memo}</p>
          <p>日付：{task.date}</p>
          <button>編集</button>
          <button onClick={() => deleteTask(task.id)}>削除</button>
        </div>
      ))}
      <Form accessToken={accessToken} setTasks={setTasks} />
    </>
  );
};

export default Index;
