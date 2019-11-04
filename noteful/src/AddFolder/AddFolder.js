import React, { Component } from 'react';
import config from '../config.js';
import ApiContext from '../ApiContext';

export default class AddFolder extends Component {

  static contextType = ApiContext;



  handleSubmit = (e) => {
    e.preventDefault();
    // const name = e.target.name.value;
    const name = this.refs.folderInput.value

    fetch(`${config.API_ENDPOINT}/folders/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({name})
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.addFolder({ name })
        console.log(name)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={(event) => {
          this.handleSubmit(event)
        }}>
          <input type="text"
            className="registration__control"
            name="name"
            required
            id="name"
            ref="folderInput"
            placeholder="Folder Name"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
