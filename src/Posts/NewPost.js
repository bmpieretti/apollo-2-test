import React, { Component } from 'react';
import PostForm from './PostForm';
import { Mutation } from 'react-apollo';
import CREATE_POST from './create-post.graphql';

export default class NewPost extends Component {
  render() {
    return (
      <div>
        <h1>New Post</h1>
        <Mutation mutation={CREATE_POST}>
          {createPost => (
            <PostForm onSubmit={createPost} />
          )}
        </Mutation>
      </div>
    );
  }
}
