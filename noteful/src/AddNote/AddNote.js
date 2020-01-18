import React from 'react';
import config from '../config.js';
import ApiContext from '../ApiContext';
import { withRouter } from 'react-router-dom';

class AddNote extends React.Component {
    static contextType = ApiContext;

    formatDateTime() {
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date+' '+time;
      return dateTime
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const name = this.refs.nameInput.value;
      const content = this.refs.contentInput.value;
      const folderId = parseInt(this.refs.folderId.value);
      const modified = `${this.formatDateTime()}`

      fetch(`${config.API_ENDPOINT}/notes/`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({name, folderId, content, modified})
      })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then((data) => {
        this.context.addNote({ name, folderId, content, modified, id:data.id  })
        this.props.history.push('/')
      }).catch(error => {
        console.error({ error })
      })
    }


    render() {
        return (
            <div>
                <form onSubmit={(e) => {
                    this.handleSubmit(e)
                }}>
                    <label htmlFor="note-name-form">Note Name:</label>
                    <input type="text"
                        className="note-name-form"
                        id="nameInput"
                        required
                        ref='nameInput'
                        placeholder="Note Name"
                    />
                    <br></br>
                    <label>Folder:</label>
                    <select name="country" ref='folderId'>
                        {this.context.folders.map((folder) => {
                            return <option 
                                        key={folder.id} 
                                        value={folder.id}>
                                        {folder.name}
                                    </option>;
                        })}
                    </select>
                <br></br>
                <label htmlFor="note-content-form">
                        Content: 
                </label>
                <input  type="text"
                        className="note-content-form"
                        placeholder="content"
                        id="content"
                        ref='contentInput'
                />
                <br></br>
                <button type="submit">Submit</button>
                </form>
            </div >
        )
    }
}

export default withRouter(AddNote);