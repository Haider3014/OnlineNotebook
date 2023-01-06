import React ,{useContext}from 'react'
import notecontext from '../contexts/notes/notecontext'

const Notesitem = (props) => {
    const { title, description,note,update ,alertt} = props
    const context=useContext(notecontext);
    const {deletenotes}=context;

    
    const handledelete=()=>{

        deletenotes(note._id)
        alertt('Note deleted sucessfully','success')
    }
    return (
        <div className="col-md-4 my-3">
            <div className="card" >
                <div className="card-body">
                    <div className="d-flex align-items-center">
                    <h5 className="card-title ">{title}</h5>
                    <i className="fa-solid fa-trash mx-2" onClick={handledelete}></i>
                    <i className="fa-regular fa-pen-to-square mx-1" onClick={()=>{update(note)}} ></i>
                    </div>
                    <p className="card-text"> {description}</p>
                </div>
            </div>
        </div>
    )
}
export default Notesitem;
