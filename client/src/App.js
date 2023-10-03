import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import axios from "axios";
import JobsTable from "./components/Table";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

function App() {
  const [numEmails, setNumEmails] = useState(0);
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    jobTracking();
    setInterval(() => {
      jobTracking();
    }, 2000);
  }, []);

  const jobTracking = async () => {
    try {
      const response = await axios({
        url: "http://localhost:8080/job",
        method: "GET",
      });
      setJobs(response.data);
    } catch (error) {}
  };

  const handleSend = async () => {
    try {
      setLoading(true);
      const response = await axios({
        url: "http://localhost:8080/job",
        method: "POST",
        data: {
          emailCount: numEmails,
        },
      });
      setNumEmails(0);
      setJobs((prev) => [...prev, response.data.job]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "row",
            margin: "3em",
            justifyContent: "center",
            gap: "2rem",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            variant="outlined"
            type="number"
            value={numEmails}
            onChange={(e) => setNumEmails(e.target.value)}
          />
          <Button variant="outlined" onClick={handleSend} disabled={loading}>
            Send
          </Button>
        </Box>

        <JobsTable loading={loading} jobs={jobs} />
      </Container>
    </div>
  );
}

export default App;
