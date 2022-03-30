import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Header } from './components/Header';
import AddNote from "./components/add-notes/addNote";
import GetNotes from "./components/get-notes/getNotes.jsx";

function App () {
  const { isAuthenticated } = useAuth0();
  return (
    <>
    <header>
      <Header />
    </header>
    <main>
    {isAuthenticated && (
    <div className="h-100 w-full flex items-center justify-center font-sans">
	  <div className="bg-white rounded shadow p-6 m-4 w-full md:w-3/4 lg:max-w-lg">
      <AddNote />
      <GetNotes/>
      </div>
      </div>
       )}
    </main>
    </>
  )
}

export default App;