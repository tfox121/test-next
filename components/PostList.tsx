import { List, Typography } from '@material-ui/core';
import { QueryObserverResult, useQuery } from 'react-query';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import endpointsConfig from '../config/endpoints.config';
import PostItem from './PostItem';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const PostList = () => {
  const classes = useStyles();
  const { isLoading, error, data } = useQuery<QueryObserverResult, Error, any[]>('postData', () => fetch(`${endpointsConfig.ApiUrl}/posts`).then((res) => res.json()));

  if (isLoading) {
    return (
      <Typography
        component="span"
        variant="body2"
        color="textPrimary"
      >
        Loading
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography
        component="span"
        variant="body2"
        color="textPrimary"
      >
        An error has occurred:
        {' '}
        {error.message}
      </Typography>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <List className={classes.list}>
      {data.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </List>
  );
};

export default PostList;
