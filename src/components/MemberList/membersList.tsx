import React, { useEffect } from "react";
import { Link, generatePath } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { ImageAvatars } from "../MemberAvatar/memberAvatar";
import { MemberEntity } from "../../model";
import {
  makeStyles,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
} from "@material-ui/core";

import { StyledTabelCell, StyledTableRow } from "./membersList.styles";

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
      <Box mx="auto">
        <input
          value={organizationFilter}
          onChange={(e) => setorganizationFilter(e.target.value)}
        />
      </Box>
      <Box width="40%" mx="auto">
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
                  <StyledTableRow key={member.id}>
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
                  </StyledTableRow>
                ))}
            </TableBody>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={members.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
