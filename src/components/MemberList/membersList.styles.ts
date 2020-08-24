import { withStyles } from "@material-ui/core/styles";
import {TableCell, TableRow}  from "@material-ui/core";

export { StyledTabelCell, StyledTableRow };

const StyledTabelCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    padding: 2,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.focus,
    },
  },
}))(TableRow);
