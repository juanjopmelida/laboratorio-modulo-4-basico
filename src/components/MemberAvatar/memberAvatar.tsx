import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    large: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
  }),
);

interface Props {
    login: string,
    avatar_url: string
}

export const ImageAvatars: React.FC<Props> = ({login, avatar_url}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar alt={login} src={avatar_url} className={classes.large} />
    </div>
  );
}
