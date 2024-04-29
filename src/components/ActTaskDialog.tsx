import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Grid from "@mui/material/Grid";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ActTaskDialog({
  act,
  open,
  onClose,
  token,
  title,
  date,
  memo,
  start_time,
  end_time,
  task_id,
  fetchTodaysTask,
  fetchTask,
}: {
  act: string;
  open: boolean;
  onClose: () => void;
  token: any;
  title: string;
  date: string;
  memo: string;
  start_time: string;
  end_time: string;
  task_id: number;
  fetchTodaysTask: () => Promise<void>;
  fetchTask: () => Promise<void>;
}) {
  const handleCloseDialog = () => {
    setSelectedDate(dayjs());
    setStartTime(dayjs());
    setEndTime(dayjs().add(1, "hour"));
    onClose();
  };

  const handlefetchTodayTask = async () => {
    fetchTodaysTask();
  };

  const handlefetchTask = async () => {
    fetchTask();
  };

  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs());
  const [startTime, setStartTime] = React.useState<Dayjs | null>(dayjs());
  const [endTime, setEndTime] = React.useState<Dayjs | null>(dayjs());

  const [message, setMessage] = React.useState("");

  const handleDeleteAction = async () => {
    if (window.confirm("Are you sure you want to delete this task?"))
      await handleDelete();
  };

  const [isEdit, setIsEdit] = React.useState(false);

  const accessToken = token;

  React.useEffect(() => {
    act === "edit" ? setIsEdit(true) : setIsEdit(false);
  }, [act]);

  React.useEffect(() => {
    setSelectedDate(date ? dayjs(date) : dayjs());
    setStartTime(start_time ? dayjs(start_time, "HH:mm") : dayjs());
    setEndTime(end_time ? dayjs(end_time, "HH:mm") : dayjs().add(1, "hour"));
  }, [date, start_time, end_time]);

  const handleDelete = async () => {
    const res = await fetch(
      "https://scheduling-endpoint-8e42d36f5cf9.herokuapp.com/task/" + task_id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await res.json();
    if (res.ok) {
      handlefetchTodayTask();
      handlefetchTask();
    } else {
      setMessage(data.error);
      console.log(message);
    }
    handleCloseDialog();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const _title = formJson.title.toString();
    const _date = selectedDate
      ? selectedDate.format("YYYY-MM-DD").toString()
      : "";
    const _startTime = startTime ? startTime.format("HH:mm").toString() : "";
    const _endTime = endTime ? endTime.format("HH:mm").toString() : "";
    const _memo = formJson.memo.toString();

    if (!startTime?.isBefore(endTime)) {
      window.confirm("Start time must be before end time.");
      console.log("Start time must be before end time.");
      return;
    }

    if (isEdit) {
      const res = await fetch(
        "https://scheduling-endpoint-8e42d36f5cf9.herokuapp.com/task/" +
          task_id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // アクセストークンをヘッダーに追加
          },
          body: JSON.stringify({
            task: _title,
            memo: _memo,
            date: _date,
            start_time: _startTime,
            end_time: _endTime,
          }),
        }
      );
      const data = await res.json();
      // 画面上にメッセージを表示
      if (res.ok) {
        handlefetchTodayTask();
        handlefetchTask();
      } else {
        setMessage(data.error);
        console.log(message);
      }
    } else {
      const res = await fetch(
        "https://scheduling-endpoint-8e42d36f5cf9.herokuapp.com/task/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // アクセストークンをヘッダーに追加
          },
          body: JSON.stringify({
            task: _title,
            memo: _memo,
            date: _date,
            start_time: _startTime,
            end_time: _endTime,
          }),
        }
      );
      const data = await res.json();
      // 画面上にメッセージを表示
      if (res.ok) {
        handlefetchTodayTask();
        handlefetchTask();
      } else {
        setMessage(data.error);
        console.log(message);
      }
    }

    handleCloseDialog();
  };

  return (
    <>
      <Dialog open={open} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>
          {act === "add"
            ? "Add new task"
            : act === "edit"
            ? "Edit this task"
            : ""}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              required
              label="title"
              name="title"
              fullWidth
              defaultValue={title}
              variant="standard"
            />
          </DialogContent>
          <DialogContent sx={{ display: "flex", flexDirection: "row" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid container justifyContent="space-between">
                <Grid item xs={4}>
                  <DatePicker
                    label="Select date"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    minDate={dayjs()}
                    slotProps={{
                      textField: {
                        required: true,
                      },
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={7}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <TimePicker
                    label="Start Time"
                    format="HH:mm"
                    value={startTime}
                    onChange={(newValue) => setStartTime(newValue)}
                    slotProps={{
                      textField: {
                        required: true,
                      },
                    }}
                  />
                  <Typography component="div" variant="h6">
                    <Box sx={{ px: 1 }}>{"~"}</Box>
                  </Typography>
                  <TimePicker
                    label="End Time"
                    format="HH:mm"
                    value={endTime}
                    onChange={(newValue) => setEndTime(newValue)}
                    slotProps={{
                      textField: {
                        required: true,
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </LocalizationProvider>
          </DialogContent>
          <DialogContent>
            <TextField
              label="memo"
              name="memo"
              fullWidth
              multiline
              rows={4}
              defaultValue={memo}
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Grid container justifyContent="space-between">
              <Grid item>
                {isEdit && (
                  <Button onClick={handleDeleteAction} color="error">
                    Delete
                  </Button>
                )}
              </Grid>
              <Grid item>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button type="submit">Done</Button>
              </Grid>
            </Grid>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
