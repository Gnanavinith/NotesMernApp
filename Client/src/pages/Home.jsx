import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import NoteModel from "../Components/NoteModel";
import axios from "axios";
import NoteCard from "../Components/NoteCard";
import { toast } from "react-toastify";

const Home = () => {
  const [isModelOpen, setModelOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentNote, setCurrentNote] = useState(null);
  const [query, setQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(false);


  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/note",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      setNotes(data.notes); // Store fetched notes
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  useEffect(() => {
    fetchNotes(); // Call it on component mount
  }, []);

  const closeModel = () => {
    setModelOpen(false);
    setCurrentNote(null); // Clear the current note when the modal closes
  };

  useEffect(() => {
    setFilteredNotes(
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, notes]);

  const addNote = async (title, description) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/note/add",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        fetchNotes(); // Fetch updated notes after adding
        closeModel();
        toast.success("Note Is Added")
      } else {
        console.error("Failed to add note:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding note:", error.message);
    }
  };

  const onEdit = (note) => {
    setCurrentNote(note); // Set the note to be edited
    setModelOpen(true);
  };

  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/note/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        fetchNotes();
        closeModel();
        toast.success("Note Is Updated")
      }
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/note/${id}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        fetchNotes();
        toast.success("Note Is Deleted")
      }
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar setQuery={setQuery} />
      <div className="p-7 gap-4 grid grid-cols-1 md:grid-cols-2">
        {
          filteredNotes.length > 0 ? 
            filteredNotes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={onEdit}
                deleteNote={deleteNote}
              />
            )): <p>No notes available!</p>}
          
        

         
         
      </div>

      <button
        onClick={() => setModelOpen(true)}
        className="fixed right-4 bottom-4 text-2xl bg-blue-400 text-white font-bold p-4 rounded-full"
      >
        +
      </button>

      {isModelOpen && (
        <NoteModel
          closeModel={closeModel}
          addNote={addNote}
          currentNote={currentNote} // Pass current note for editing
          editNote={editNote}
        />
      )}
    </div>
  );
};

export default Home;
