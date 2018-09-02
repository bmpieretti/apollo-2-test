import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import UpdatePost from './UpdatePost';
import EditMode from './EditMode';
import POST_QUERY from './post.graphql';
import UPDATE_POST_CHECK from './update-post-check.graphql';

export default class Post extends Component {
  render() {
    const { match } = this.props;

    return (
      <Query query={POST_QUERY} variables={{ id: match.params.id }} >
        {({ data, loading }) => {
          if (loading) return "Loading...";

          const { post, isEditMode } = data;

          return (
            <div>
              <EditMode isEditMode={isEditMode} />
              {isEditMode ? (
                <section>
                  <h1>Edit Post</h1>
                  <UpdatePost post={post} />
                </section>
              ) : (
                <section>
                  <h1>{post.title}</h1>
                  <Mutation
                    mutation={UPDATE_POST_CHECK}
                    variables={{
                      id: post.id,
                      check: !post.check
                    }}
                    optimisticResponse={{
                      updatePost: {
                        __typename: 'Post',
                        check: !post.check
                      }
                    }}
                    update={(cache, { data: { updatePost } }) => {
                      const data = cache.readQuery({
                        query: POST_QUERY,
                        variables: {
                          id: post.id
                        }
                      });

                      data.post.check = updatePost.check;
                      cache.writeQuery({
                        query: POST_QUERY,
                        data: {
                          ...data,
                          post: data.post
                        }
                      });
                    }}
                  >
                    {updatePost => (
                      <input
                        type="checkbox"
                        checked={post.check}
                        onChange={updatePost}
                      />
                    )}
                  </Mutation>
                </section>
              )}
            </div>
          );
        }}
      </Query>
    );
  }
}
