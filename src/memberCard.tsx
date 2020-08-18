import React from "react";
import { Link, useParams } from "react-router-dom";
import { MemberDetailEntity } from "./model";
import {ImageAvatars} from "./memberAvatar"
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
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

  React.useEffect(() => {
    fetch(`https://api.github.com/users/${id}`)
      .then((response) => response.json())
      .then((json) => setMember(json));
  }, []);

  return (
    <Card className={classes.root}>
      <ImageAvatars login={member.login} avatar_url={member.avatar_url} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {member.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {member.login}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {member.company}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {member.bio}
        </Typography>
      </CardContent>
    </Card>
  );
};
