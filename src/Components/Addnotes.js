import React ,{useState,useContext}from 'react'
import notecontext from '../contexts/notes/notecontext'

const Addnotes = (props) => {
    const {alertt}=props
    const context=useContext(notecontext);
    const {addnotes}=context;
    const [note, setnote] = useState({title:"",description:"",tag:""})

    const handleclick=(e)=>{
        e.preventDefault()
        addnotes(note.title,note.description,note.tag)
        setnote({title:"",description:"",tag:""})
        alertt('Note added sucessfully','success')
    }
    const onchange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
        // (...) this is spread operator it adds new array with the pervious one 
    }
    return (
        <div className="container my-3">
            <h2>Add your notes</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" minLength={5} value={note.title} required className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" minLength={5} value={note.description} required className="form-control" id="description" name="description" onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" value={note.tag} id="tag" name="tag" onChange={onchange} />
                </div>
               
                <button type="submit" disabled={note.title.length<5||note.description.length<5} className="btn btn-primary" onClick={handleclick}>Add note</button>
            </form>
        </div>
    )
}

export default Addnotes