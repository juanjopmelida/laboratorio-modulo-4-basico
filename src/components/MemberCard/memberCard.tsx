import React from "react";
import { Link, useParams } from "react-router-dom";
import { MemberDetailEntity } from "../../model";
import {ImageAvatars} from "../MemberAvatar/memberAvatar"
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";


const StyledButton = styled(Button)({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 40,
  width: "200px",
  padding: "0 30px",
  marginTop: "15px",
  margin: "auto"
});

const useStyles = makeStyles({
  root: {
    width: 345,
    margin: "auto"
  }
});

const createDefaultMemberDetail = () => ({
    id: "",
    avatar_url: "",
    login: "",
    name: "",
    company: "",
    bio: "",
});

export const MemberCard: React.FC = () => {
  const classes = useStyles();
  const [member, setMember] = React.useState<MemberDetailEntity>(
    createDefaultMemberDetail()
  );
  const { id } = useParams();
  const history = useHistory();

  React.useEffect(() => {
    fetch(`https://api.github.com/users/${id}`)
      .then((response) => response.json())
      .then((json) => setMember(json));
  }, []);

  return (
    <>
      <Card className={classes.root}>
        <ImageAvatars login={member.login} avatar_url={member.avatar_url} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Name: {member.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Login: {member.login}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Company: {member.company}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Bio: {member.bio}
          </Typography>
        </CardContent>
      </Card>
      <StyledButton type="button" onClick={()=> history.goBack()} >back</StyledButton>
    </>
  );
};
