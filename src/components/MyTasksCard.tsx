import React from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import TaskCard from "@/components/TaskCard";

const MyTasksCard = ({
  token,
  tasks,
  fetchTodaysTask,
  fetchTask,
}: {
  token: string;
  tasks: any;
  fetchTodaysTask: () => Promise<void>;
  fetchTask: () => Promise<void>;
}) => {
  const accessToken = token;

  const handlefetchTodayTask = async () => {
    fetchTodaysTask();
  };

  const handlefetchTask = async () => {
    fetchTask();
  };

  return (
    <>
      <Typography variant="h5" color="#0b4d87" sx={{ pl: 2, pb: 1 }}>
        My Tasks
      </Typography>
      <Divider variant="middle" sx={{ mb: 2 }} />
      <Box sx={{ maxHeight: "40vh", overflow: "auto" }}>
        <TaskCard
          token={accessToken}
          data={tasks}
          fetchTodaysTask={handlefetchTodayTask}
          fetchTask={handlefetchTask}
        />
      </Box>
    </>
  );
};

export default MyTasksCard;
