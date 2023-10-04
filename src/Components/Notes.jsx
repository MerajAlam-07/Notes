import React, {useState, useEffect } from 'react'
import CreateNotes from './CreateNotes'
import './notes.css';
import {v4 as uuid} from 'uuid'
import Note from './Note';


const Notes = () => {

const [inputText, setInputText] = useState("");
const [notes, setNotes] = useState([]);
const [editToggle, setEditToggle] = useState(null)


// For Edit the text
const editHandler = (id,text) =>{
       setEditToggle(id)
       setInputText(text)
}

const saveHandler = ()=>{

    // if edit then what happen to update (if we click note to edit that this is happen)

    if(editToggle){
        setNotes(notes.map((note)=>(
            note.id === editToggle?
            {...note,text:inputText}
            :note
        )))
    }else{

        // when save button click text store localstorage
     setNotes((prevNotes)=>[
        ...prevNotes,{
            id:uuid(),
            text:inputText
        }
     ])
    }

    //  clear our input text area
    setInputText('')
    setEditToggle(null)
}

// For delete the notes when we clicking delete button

const deleteHandler=(id)=>{
    // use filter function to filter our data
    const newNotes = notes.filter(n =>n.id !==id)
    setNotes(newNotes)

}


// first time load it call useEffect
useEffect(() => {
    const notes = JSON.parse(localStorage.getItem("notes"));
    if (notes && notes.length > 0) {
      setNotes(notes);
    }
  }, []);

useEffect(() => {
localStorage.setItem("notes", JSON.stringify(notes));
}, [notes]);

  return (
    <div className='notes'>
        {/* data display into screen */}

        {
            notes.map((note)=>(

                // take the condition if we click edit button
                editToggle === note.id ?
                <CreateNotes
                inputText={inputText}
                setInputText={setInputText}
                saveHandler={saveHandler}
                />
                :
               <Note
                   key={note.id}
                   id={note.id}
                   text={note.text}
                   editHandler={editHandler}
                   deleteHandler={deleteHandler}
               >
               </Note>
            ))
        }

        {
            // if sum thing inside edit toggle
            editToggle === null ?
            <CreateNotes
          inputText={inputText}
          setInputText={setInputText}
          saveHandler={saveHandler}
         />
         : <></>
        }
    </div>
  )
}

export default Notes