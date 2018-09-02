import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Posts from './Posts/Posts';
import Post from './Posts/Post';
import NewPost from './Posts/NewPost';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Link to="/">
              <h1 className="App-title">Welcome to React</h1>
            </Link>
          </header>

          <main>
            <Switch>
              <Route exact path="/" component={Posts} />
              <Route exact path="/post/new" component={NewPost} />
              <Route path="/post/:id" component={Post} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
