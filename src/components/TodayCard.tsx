import { Card, CardContent, Grid } from "@mui/material";
import React from "react";
import TaskCard from "@/components/TaskCard";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ActTaskDialog from "@/components/ActTaskDialog";

const TodayCard = ({
  data,
  token,
  fetchTodaysTask,
  fetchTask,
}: {
  data: any;
  token: string;
  fetchTodaysTask: () => Promise<void>;
  fetchTask: () => Promise<void>;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const accessToken = token;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAddTaskOpen = () => {
    handleMenuClose();
    setDialogOpen(true);
  };

  const handleAddTaskClose = () => {
    setDialogOpen(false);
  };

  const handlefetchTodayTask = async () => {
    fetchTodaysTask();
  };

  const handlefetchTask = async () => {
    fetchTask();
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        color: "#ffffff",
        backgroundColor: "#1281e3",
        maxHeight: "35vh",
      }}
    >
      <CardContent sx={{ px: 3, pt: 2 }}>
        <Grid container direction="column">
          <Grid item>
            <Grid container justifyContent="space-between">
              <Grid item sx={{ pl: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: "medium" }}>
                  Today's Task
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                  color="inherit"
                  sx={{
                    backgroundColor: "#0b4d87",
                  }}
                >
                  <AddIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleAddTaskOpen}>Add new task</MenuItem>
                </Menu>
                <ActTaskDialog
                  act="add"
                  open={dialogOpen}
                  onClose={handleAddTaskClose}
                  token={accessToken}
                  title=""
                  date=""
                  memo=""
                  start_time=""
                  end_time=""
                  task_id={0}
                  fetchTodaysTask={handlefetchTodayTask}
                  fetchTask={handlefetchTask}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sx={{ maxHeight: "25vh", overflow: "auto", mt: 1 }}>
            <TaskCard
              token={accessToken}
              data={data}
              fetchTodaysTask={handlefetchTodayTask}
              fetchTask={handlefetchTask}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TodayCard;
