import React from "react";
import notecontext from "./notecontext";
import { useState } from "react";

const Notestate = (props) => {
  const host = "http://localhost:5000"
  const notesinitial = []

  const [notes, setnotes] = useState(notesinitial)
  const getnotes = async () => {
    // we have to fetch the api to get notes from the database
    const response = await fetch(`${host}/api/notes/allnotes`, {
      method: 'GET',
      headers: {
        'Accept':'*/*',
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const res = await response.json();
    console.log(res);
    setnotes(res)
    // this will only work when the response from the server will be or array type
  }

  // Addnotes with the help of title,description,tag

  const addnotes = async (title, description, tag) => {
    // we have to fetch the api to get notes from the database
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Accept':'*/*',
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
      // in ES6 {title,description,tag} is a object to check value like {title:title,description:description,tag:tag}
    });
    const res = await response.json();
    const note=res;
    setnotes(notes.concat(note))
    console.log(res)
  }


  // Delete note with the help of id.
  const deletenotes = async(id) => {
    const response = await fetch(`${host}/api/notes/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept':'*/*',
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
     const res = await response.json(); // parses JSON response into native JavaScript objects
     setnotes(res)
    //  below is the logic to delete from the client side
    console.log("this note is deleted " + id)
    setnotes(notes.filter((note) => { return note._id !== id }))
  }






  const editnotes = async (id, title, description, tag) => {
    // Edit note 
    // fetch API for editing
    const response = await fetch(`${host}/api/notes/update/${id}`, {
      method: 'PUT',
      headers: {
        'Accept':'*/*',
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
      // in ES6 {title,description,tag} is a object to check value like {title:title,description:description,tag:tag}
    });
    const res = await response.json(); // parses JSON response into native JavaScript objects
    console.log(res)

    let newnotes=JSON.parse(JSON.stringify(notes))
    // Logic for client side
    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
        break;
      }
      setnotes(newnotes)
    }
  }
  return (
    <notecontext.Provider value={{ notes, setnotes, addnotes, deletenotes, editnotes ,getnotes}}>
      {props.children}
    </notecontext.Provider>
  )
}

export default Notestate;