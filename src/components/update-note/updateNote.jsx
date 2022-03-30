import React, { useState } from "react";
import { updateNoteMutation } from "../../queries";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateNote(props) {
    const [loading, setLoading] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("");
    const [updateNote] = useMutation(updateNoteMutation);

    const {
        match: {
            params: { note_id },
        },
    } = props;


    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            setLoading(true);
            await updateNote({
                variables: { note_id, name, description, tag }
            });
            props.navigate("/notes");
            if (true) toast.success("Successful")
            window.location.reload();
        } catch (error) {
            setLoading(false);
            if (error) toast.error("Something went wrong. Please try again later.");
        }
    }

    if (loading) {
        return <p className="load">Loading...</p>
    }

    return (
        <>
            <p className="title">Update your note.</p>
            <div className="container">
                <form onSubmit={handleSubmit} align="center">
                    <input
                        type="text"
                        value={name}
                        placeholder="Name"
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <textarea
                        type="text"
                        value={description}
                        placeholder="Description"
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        value={tag}
                        placeholder="Tag"
                        onChange={e => setTag(e.target.value)}
                        required
                    />
                    <br />
                    <input type="submit" value="update" className="button" />
                </form>
            </div>
        </>
    );
};

// const deleteNoteId = (note_id) => {
//     //   delete the todo
//     deleteNote({
//       variables: { note_id: note_id },
//       //   refresh the list of todos when the todo is deleted
//       refetchQueries: [{ query: getNotesQuery }],
//     }).then(() => alert("Deleted"));
//   };

//     return (
//         <div >
//             <ToastContainer position="top-center" />
//             <p className="title">All notes.</p>
//                 <h1>Todos</h1>
//                 <ul className="list-items">
//                   {data.notes.map((item) => (
//                     <li className="item-name" key={item.note_id}>
//                       {item.name}
//                       <button onClick={() => deleteNoteId(item.note_id)}>Delete</button>
//                     </li>
//                   ))}
//                 </ul>
//         </div>
//     );
// }