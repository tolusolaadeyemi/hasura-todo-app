import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { insertNoteMutation, getNotesQuery} from "../../queries";
import "react-toastify/dist/ReactToastify.css";


// hooks allow us to define states without writing a class.

export default function CreateNote() {
    const [insertNote, {loading, error }] = useMutation(insertNoteMutation);
    const [name, setName] = useState("");
    const { user, isAuthenticated } = useAuth0();

    if (!isAuthenticated) return <></>;

    const handleSubmit = (e) => {
        e.preventDefault();
        insertNote({
          //   auth0 stores userId in sub
          variables: { name: name, user_id: user.sub },
          //   refresh the list of todos when the todo is inserted
          refetchQueries: [{ query: getNotesQuery }],
        }).then(() => {
          //  clear the input field
          setName("");
        });
      };

    if (loading) return <p className="load">Loading ...</p>;

    return (
        <>
        <div className="mb-4">
            <h1 className="text-grey-darkest">add a sticky node 🌟 </h1>
            <form onSubmit={handleSubmit}>
            <div className="flex mt-4">
                <input className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="example: clean my room today 🛁" type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required/>
                {error && <pre>{JSON.stringify(error)}</pre>}
                <button className="flex-no-shrink p-1 border mb-2 ml-2 rounded text-teal border-teal hover:text-white hover:bg-teal" type="submit" value="Add"> {loading ? "Creating" : "Create"}</button>
            </div>
            </form>
        </div>
        </>
    );
};
