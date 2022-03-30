import React from "react";
// import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import { Header } from './components/Header';
import AddNote from "./components/add-notes/addNote";
import GetNotes from "./components/get-notes/getNotes.jsx";

function App () {
  return (
    <>
    <header>
      <Header />
    </header>
    <main>
    <div className="h-100 w-full flex items-center justify-center font-sans">
	  <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
      <AddNote />
      <GetNotes/>
      </div>
      </div>
    </main>
    </>
  )
}

export default App;