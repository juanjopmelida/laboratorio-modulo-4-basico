import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

export { StyledButton, StyledTextField, StyledColumnBox, StyledRowBox};

const StyledButton = styled(Button)({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 40,
  padding: "0 30px",
  marginTop: "15px",
});

const StyledTextField = styled(TextField)({
  margin: "0 10px",
});

const StyledColumnBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
});

const StyledRowBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});
