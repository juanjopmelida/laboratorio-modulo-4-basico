import React, { useEffect } from "react";
import { Link, generatePath } from "react-router-dom";
import { useDebounce } from "use-debounce";
import {ImageAvatars} from "./memberAvatar";
import {MemberEntity} from "./model"
import {withStyles, makeStyles} from '@material-ui/core/styles'
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { TablePagination } from "@material-ui/core";

const StyledTabelCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14,
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  }
})

export const ListPage: React.FC = () => {
  const [organizationFilter, setorganizationFilter] = React.useState(
    "lemoncode",
  );
  const [debounceFilter] = useDebounce(organizationFilter, 800);
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const classes = useStyles();

  React.useEffect(() => {
    fetch(`https://api.github.com/orgs/${organizationFilter}/members`)
      .then((response) => response.json())
      .then((json) => setMembers(json))
      .catch((err) => console.error(err));
  }, [debounceFilter]);

  return (
    <>
      <input
        value={organizationFilter}
        onChange={(e) => setorganizationFilter(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTabelCell>Id</StyledTabelCell>
              <StyledTabelCell>Login</StyledTabelCell>
              <StyledTabelCell>Avatar</StyledTabelCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <StyledTableRow key={member.id}>
                <StyledTabelCell component="th" scope="member">
                  {member.id}
                </StyledTabelCell>
                <StyledTabelCell>{member.login}</StyledTabelCell>
                <StyledTabelCell><ImageAvatars login={member.login} avatar_url={member.avatar_url}></ImageAvatars></StyledTabelCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
