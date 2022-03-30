import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getNotesQuery,deleteNoteMutation } from "../../queries/index";
import { useQuery, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function GetNotes(props) {
    const [deleteNote] = useMutation(deleteNoteMutation);
    const { error, loading, data }
        = useQuery(getNotesQuery)
    const { isAuthenticated } = useAuth0();
    if (!isAuthenticated) return <></>;
    if (loading) {
        return <p className="load">Loading...</p>;

    }
    if (error) {
        return toast.error("An error occured!");
    }
 // function deletNoteId created to handle id from var gotten from deleteNote state for deletion
 const deleteNoteId = (note_id,name) => {
    //   delete the todo
    deleteNote({
      variables: { note_id: note_id, name: name },
      //   refresh the list of todos when the todo is deleted
      refetchQueries: [{ query: getNotesQuery }],
    }).then(() => alert("Deleted"));
  };

  const markItemAsDone= (id) => {
    var whenClicked = document.getElementById(id);
    whenClicked.addEventListener('click', finished);
  }
  
  function finished() {
    this.className = "finished";
    this.removeEventListener('click',finished);
  }

  function init() {
    var undoneItems = document.getElementsByClassName('undone');
    for(var i = 0; i < undoneItems.length; i++){
      undoneItems[i].addEventListener('click', finished);  
    }
  }

    return (
      <>
    {isAuthenticated && (
    <div className="flex mb-4 items-center">
        <ul className="list-items">
        {data.notes.map((item) => (
        <li id={item.note_id}className="w-full text-grey-darkest" key={item.note_id}> {item.name}
        <button id="myFinished" onClick={() => markItemAsDone(item.note_id)}className="flex-no-shrink p-1 mr-9 ml-9 mb-2 border-2 rounded hover:text-white border-green hover:bg-green">mark as done ✅</button>
        <button onClick={() => deleteNoteId(item.note_id)} className="flex-no-shrink p-1 ml-2 mb-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">delete 🗑️</button>
        </li>
        ))}
        </ul>
    </div>
    )}
  </>
    );
        };


