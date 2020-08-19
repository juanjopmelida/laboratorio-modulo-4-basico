import React, { useEffect } from "react";
import { Link, generatePath } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { ImageAvatars } from "./memberAvatar";
import { MemberEntity } from "./model";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { TablePagination } from "@material-ui/core";

const StyledTabelCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export const ListPage: React.FC = () => {
  const [organizationFilter, setorganizationFilter] = React.useState(
    "lemoncode",
  );
  const [debounceFilter] = useDebounce(organizationFilter, 1000);
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, members.length - page * rowsPerPage);

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
              <StyledTabelCell>Login</StyledTabelCell>
              <StyledTabelCell>Avatar</StyledTabelCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((member, index) => (
                <TableRow key={member.id}>
                  <StyledTabelCell>
                    <Link
                      to={generatePath("/detail/:id", { id: member.login })}
                    >
                      <ImageAvatars
                        login={member.login}
                        avatar_url={member.avatar_url}
                      ></ImageAvatars>
                    </Link>
                  </StyledTabelCell>
                  <StyledTabelCell component="th" scope="member">
                    {member.login}
                  </StyledTabelCell>
                </TableRow>
              ))}
          </TableBody>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={members.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Table>
      </TableContainer>
    </>
  );
};
