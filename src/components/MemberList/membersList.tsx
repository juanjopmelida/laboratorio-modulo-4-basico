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
  FormHelperText,
} from "@material-ui/core";
import { StyledTabelCell, StyledTableRow } from "./membersList.styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  table: {
    minWidth: 700,
  },
  apiInfo: {
    color: "white",
  },
  inputText: {
    width: "30rem",
    height: "2rem",
    borderRadius: 5,
    color: "#c0c0c0",
  },
});

export const ListPage: React.FC = () => {
  const [organizationFilter, setorganizationFilter] = React.useState(
    "lemoncode",
  );
  const [debounceFilter] = useDebounce(organizationFilter, 800);
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [showApiInfo, setShowApiInfo] = React.useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleShowApiInfo = (handle: boolean) => {
    setShowApiInfo(handle);
  };

  const apiInfo = (
    <div>
      <div className={classes.apiInfo}>
        There's no members or company doesn't exist
      </div>
    </div>
  );

  const membersTable = (
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
  );

  const tableOrInfo = () => (showApiInfo ? apiInfo : membersTable);

  React.useEffect(() => {
    fetch(`https://api.github.com/orgs/${organizationFilter}/members`)
      .then((response) => response.json())
      .then((json) => {
        if (json.length > 0) {
          setMembers(json);
          handleShowApiInfo(false);
        } else {
          handleShowApiInfo(true);
        }
      })
      .catch((err) => console.error(err));
  }, [debounceFilter]);

  return (
    <div className={classes.root}>
      <Box mx="auto" marginBottom="20px">
        <input
          className={classes.inputText}
          value={organizationFilter}
          onChange={(e) => setorganizationFilter(e.target.value)}
        />
      </Box>
      {tableOrInfo()}
    </div>
  );
};
