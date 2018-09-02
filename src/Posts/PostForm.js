import React, { Component } from 'react';

export default class PostForm extends Component {

  state = {
    id: this.props.post ? this.props.post.id : '',
    title: this.props.post ? this.props.post.title : '',
    body: this.props.post ? this.props.post.body : ''
  }

  handleInput = e => {
    const formData = {};
    formData[e.target.name] = e.target.value;

    this.setState({ ...formData });
  }

  render() {
    const {
      id,
      title,
      body
    } = this.state;

    const { onSubmit, onSucess } = this.props;

    return (
      <form onSubmit={(event) => {
        event.preventDefault();

        onSubmit({
          variables: {
            id,
            title,
            body
          }
        }).then(() => {
          if (onSucess) onSucess();

          this.setState({
            title: '',
            body: ''
          });
        }).catch((error) => {
          console.log(error);
        });
      }}>
        <input name="title" type="text" value={title} placeholder="title" onChange={this.handleInput} />
        <textarea name="body" type="text" value={body} placeholder="body" onChange={this.handleInput} />
        <button className="button">Submit</button>
      </form>
    );
  }
}
