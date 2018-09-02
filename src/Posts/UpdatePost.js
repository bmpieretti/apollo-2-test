import React, { Component } from 'react';
import PostForm from './PostForm';
import { Mutation } from 'react-apollo';
import UPDATE_POST from './update-post.graphql';

export default class UpdatePost extends Component {
  render() {
    const { post } = this.props;

    return (
      <Mutation mutation={UPDATE_POST}>
        {(updatePost, result) => {
          const onSucess = () => result.client.writeData({ data: { isEditMode: false } });

          return (<PostForm post={post} onSucess={onSucess} onSubmit={updatePost} />);
        }}
      </Mutation>
    );
  }
}
