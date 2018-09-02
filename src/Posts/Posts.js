import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import POSTS_QUERY from './posts.graphql';

export default class Posts extends Component {
  render() {
    return (
      <div>
        <Link className="button" to="/post/new">New Post</Link>
        <ul className="post-listing">
          <Query query={POSTS_QUERY}>
            {({loading, data, fetchMore}) => {
              if (loading) return "Loading..";

              const { posts } = data;
              return (
                <React.Fragment>
                  {posts.map((post) => (
                    <li>
                      <Link key={post.id} to={`/post/${post.id}`}>
                        {post.title}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <button className="button" onClick={() => fetchMore({
                      variables: {
                        skip: posts.length
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prev;

                        return {
                          ...prev,
                          posts: [...prev.posts, ...fetchMoreResult.posts]
                        };
                      }
                    })}>Load More</button>
                  </li>
                </React.Fragment>
              )
            }}
          </Query>
        </ul>
      </div>
    );
  }
}