/* eslint-disable react/prop-types */
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const NoteCard = ({ note,onEdit,deleteNote }) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg mb-4">
      <h2 className="text-xl font-bold mb-2">{note.title}</h2>
      <p className="text-gray-700 mb-4">{note.description}</p>
      <div className="flex justify-end space-x-4">
        <button
          className="text-blue-500 hover:text-blue-700 transition"
          aria-label="Edit Note"
        >
          <FaEdit onClick={()=>onEdit(note)} />
        </button>
        <button
          className="text-red-500 hover:text-red-700 transition"
          aria-label="Delete Note"
          onClick={()=>deleteNote(note._id)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
