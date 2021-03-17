import React, { ChangeEvent, MouseEvent, useState } from 'react';
import {
  Box, Button, FormControl, Input, InputLabel, List,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import axios from 'axios';
import { QueryObserverResult, useMutation, useQuery } from 'react-query';

import { inputTemplate } from '../config/constants';
import endpointsConfig from '../config/endpoints.config';
import queryClient from '../config/queryClient';
import PostItem from '../components/PostItem';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  buttonCenter: {
    justifyContent: 'center',
    width: 'unset',
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const Crud = () => {
  const [inputData, setInputData] = useState(inputTemplate);
  const classes = useStyles();
  const { isLoading, error, data } = useQuery<QueryObserverResult, Error, any[]>('postData', () => fetch(`${endpointsConfig.ApiUrl}/posts`).then((res) => res.json()));

  console.log('render...');

  const createPost = async (newPost: { author: string, title: string }):Promise<void> => {
    console.log('POST');
    await axios.post(`${endpointsConfig.ApiUrl}/posts`, newPost);
  };

  const mutation = useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('postData');
      setInputData(inputTemplate);
    },
  });

  if (isLoading) return 'Loading...';

  if (error) return `An error has occurred: ${error.message}`;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    setInputData({ ...inputData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: MouseEvent<HTMLElement>):void => {
    e.preventDefault();
    mutation.mutate(inputData);
  };

  if (!data) {
    return null;
  }

  return (
    <Box my={4}>
      <form className={classes.root} noValidate autoComplete="off">
        <FormControl>
          <InputLabel htmlFor="author">Author</InputLabel>
          <Input id="author" onChange={handleChange} value={inputData.author} />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="title">Title</InputLabel>
          <Input id="title" onChange={handleChange} value={inputData.title} />
        </FormControl>
        <Box className={classes.buttonCenter}>
          <Button variant="contained" color="secondary" disableElevation type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </form>
      <List className={classes.list}>
        {data.map((post) => (
          <PostItem post={post} key={post.id} />
        ))}
      </List>
    </Box>
  );
};

export default Crud;
