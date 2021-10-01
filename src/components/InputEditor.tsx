import { Parameter as Input } from "../types/mat";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useParams, useHistory } from "react-router-dom";
import {
  CircularProgress,
  Container,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { MAT_API } from "./environment";

interface Props {
  inputId: string;
}

const types = [
  {
    value: "int",
    label: "Integer",
  },
  {
    value: "string",
    label: "String",
  },
];

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function replacer(key: string, value: any) {
  console.log(value);
  if (value === null) {
    return undefined;
  }
  return value;
}

const InputEditor = () => {
  const { inputId: inputId } = useParams<Props>();
  const history = useHistory();
  const [input, setInput] = useState<Input>();
  const [loading, setLoading] = useState(true);
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setInput((prevParameter) => ({ ...prevParameter, [name]: value }));
  }

  function handleSubmit(event: React.FormEvent<EventTarget>) {
    event.preventDefault();
    const url = `${MAT_API}/inputs/${inputId}`;
    const temp = JSON.stringify(input, replacer);
    console.log(temp);
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: temp,
    }).then((response) => {
      if (response.ok){
        console.log(response.ok)
        history.goBack()
      }
    });
  }

  useEffect(() => {
    fetch(`${MAT_API}/inputs/${inputId}`)
      .then((response) => response.json())
      .then((data) => {
        setInput(data);
        setLoading(false);
        console.log(input?.type);
      });
  }, [inputId]);

  return loading ? (
    <Box sx={{ display: "flex" }}>
      {" "}
      <CircularProgress />{" "}
    </Box>
  ) : (
    <Container maxWidth="sm">
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography variant="h6" color="inherit" gutterBottom>
          Tell us about your Input {input?.name}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            value={input?.display_name}
            name="display_name"
            id="display_name"
            label="Display name"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            value={input?.description}
            name="description"
            id="description"
            label="description"
            variant="outlined"
            onChange={handleChange}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button type="submit" variant="contained">Save</Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default InputEditor;