import React, { ChangeEvent, MouseEvent, useState } from 'react';
import {
  Box, Button, FormControl, Input, InputLabel,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import axios from 'axios';
import { useMutation } from 'react-query';

import { inputTemplate } from '../config/constants';
import endpointsConfig from '../config/endpoints.config';
import queryClient from '../config/queryClient';
import PostList from '../components/PostList';

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
}));

const Crud = () => {
  const [inputData, setInputData] = useState(inputTemplate);
  const classes = useStyles();

  const createPost = async (newPost: { author: string, title: string }):Promise<void> => {
    await axios.post(`${endpointsConfig.ApiUrl}/posts`, newPost);
  };

  const mutation = useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('postData');
      setInputData(inputTemplate);
    },
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    setInputData({ ...inputData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: MouseEvent<HTMLElement>):void => {
    e.preventDefault();
    mutation.mutate(inputData);
  };

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
      <PostList />
    </Box>
  );
};

export default Crud;
