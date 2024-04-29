import React, { useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import ActTaskDialog from "./ActTaskDialog";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function TaskCard({
  data,
  token,
  fetchTodaysTask,
  fetchTask,
}: {
  data: any;
  token: string;
  fetchTodaysTask: () => Promise<void>;
  fetchTask: () => Promise<void>;
}) {
  const tasks = data || [];
  const accessToken = token;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAddTaskOpen = (task: any) => {
    setSelectedTask(task);
    setDialogOpen(true);
  };

  const handleAddTaskClose = () => {
    setSelectedTask(null);
    setDialogOpen(false);
  };

  const handlefetchTask = async () => {
    fetchTask();
  };

  const handlefetchTodayTask = async () => {
    fetchTodaysTask();
  };

  return (
    <>
      {tasks.length === 0 ? (
        <Card sx={{ flex: 1, mb: 2, pt: 1.5, pl: 2, borderRadius: 3 }}>
          <div>
            <Typography variant="h6" color="#0b4d87">
              No task registered
            </Typography>
            <Typography variant="body2" color="#a5b1b5" sx={{ pl: 1, pb: 2 }}>
              Have a nice day!
            </Typography>
          </div>
        </Card>
      ) : (
        tasks.map((item: any, index: any) => (
          <Card
            key={index}
            sx={{
              flex: 1,
              mb: 2,
              pt: 1.5,
              pl: 2,
              borderRadius: 3,
            }}
          >
            <div>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography variant="h6" color="#0b4d87">
                    {item.task}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    color="#0b4d87"
                    textAlign="center"
                    sx={{ pr: 2 }}
                  >
                    {item.date}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="#699dc7"
                    textAlign="center"
                    sx={{ pr: 2 }}
                  >
                    {item.start_time} - {item.end_time}
                  </Typography>
                </Grid>
              </Grid>
            </div>
            <div>
              <Grid container justifyContent="space-between" sx={{ pl: 1 }}>
                <Grid item>
                  <Typography variant="body2" color="#a5b1b5">
                    {item.memo ? item.memo : "no memo"}
                  </Typography>
                </Grid>
                <Grid item>
                  <Box textAlign="right">
                    <Button
                      variant="text"
                      onClick={() => handleAddTaskOpen(item)}
                    >
                      Edit
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </div>
            {selectedTask === item && (
              <ActTaskDialog
                title={item.task}
                date={item.date}
                memo={item.memo}
                start_time={item.start_time}
                end_time={item.end_time}
                task_id={item.id}
                act="edit"
                open={dialogOpen}
                onClose={handleAddTaskClose}
                fetchTask={handlefetchTask}
                fetchTodaysTask={handlefetchTodayTask}
                token={accessToken}
              />
            )}
          </Card>
        ))
      )}
    </>
  );
}
