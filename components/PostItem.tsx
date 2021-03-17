import {
  Box, ListItem, ListItemText, IconButton, Divider, Typography, Input,
} from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';
import {
  Edit, Delete, Check, Clear,
} from '@material-ui/icons';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useMutation } from 'react-query';
import clsx from 'clsx';
import axios from 'axios';

import endpointsConfig from '../config/endpoints.config';
import queryClient from '../config/queryClient';
import { inputTemplate } from '../config/constants';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  inline: {
    display: 'inline',
  },
  button: {
    marginLeft: theme.spacing(2),
  },
}));

const PostItem = ({ post }: { post: { id: string, title: string, author:string } }) => {
  const [editing, setEditing] = useState(false);
  const [postData, setPostData] = useState(post || inputTemplate);
  const classes = useStyles();

  const editPost = async (editedPost: { id: string | undefined, author: string, title: string }): Promise<void> => {
    await axios.patch(`${endpointsConfig.ApiUrl}/posts/${editedPost.id}`, editedPost);
  };

  const deletePost = async (postToDelete: { id: string }): Promise<void> => {
    await axios.delete(`${endpointsConfig.ApiUrl}/posts/${postToDelete.id}`);
  };

  const edit = useMutation(editPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('postData');
    },
  });

  const deletion = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('postData');
    },
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    setPostData({ ...postData, [e.target.id]: e.target.value });
  };

  const handleEdit = () => {
    if (editing) {
      edit.mutate(postData);
      setEditing(false);
    } else {
      setEditing(true);
    }
  };

  const handleDelete = () => {
    if (editing) {
      setPostData(post);
      setEditing(false);
    } else {
      deletion.mutate(post);
    }
  };
  return (
    <>
      <ListItem alignItems="center">
        {editing
          ? (
            <Box className={classes.root}>
              <Input id="title" value={postData.title} onChange={handleChange} fullWidth />
              <Input id="author" value={postData.author} onChange={handleChange} fullWidth />
            </Box>
          )
          : (
            <ListItemText
              primary={post.title}
              secondary={(
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {post.author}
                  </Typography>
                  {' — Here is some example text…'}
                </>
          )}
            />
          )}
        <IconButton aria-label="edit" className={clsx(classes.root, classes.button)} onClick={handleEdit}>
          {editing
            ? <Check />
            : <Edit />}
        </IconButton>
        <IconButton aria-label="delete" className={classes.root} onClick={handleDelete}>
          {editing
            ? <Clear />
            : <Delete />}
        </IconButton>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default PostItem;
