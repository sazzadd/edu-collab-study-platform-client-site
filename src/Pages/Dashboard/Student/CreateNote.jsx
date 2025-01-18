import {
  Button,
  Card,
  CardBody,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlinePlus,
} from "react-icons/ai";
import Swal from "sweetalert2";
import { AuthContext } from "../../../provider/AuthProvider";

export default function CreateNote() {
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentNote, setCurrentNote] = useState({});
  const [newNote, setNewNote] = useState({ title: "", description: "" });
  const { user } = useContext(AuthContext);
  const email = user?.email;

  const handleOpen = () => setOpen(!open);

  // Fetch notes for the logged-in user
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/notes/${email}`
        );
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    if (email) fetchNotes();
  }, [email]);

  const handleSubmit = async () => {
    const date = format(new Date(), "dd-MM-yyyy");

    if (isEdit) {
      // Update note
      try {
        const response = await axios.put(
          `http://localhost:5000/notes/${currentNote._id}`,
          {
            ...currentNote,
            title: newNote.title,
            description: newNote.description,
            date,
          }
        );

        if (response.status === 200) {
          setNotes((prevNotes) =>
            prevNotes.map((note) =>
              note._id === currentNote._id
                ? {
                    ...note,
                    title: newNote.title,
                    description: newNote.description,
                    date,
                  }
                : note
            )
          );
          Swal.fire({
            title: "Success!",
            text: "Note updated successfully.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      } catch (error) {
        console.error("Error updating note:", error);
        Swal.fire("Error!", "Failed to update the note.", "error");
      }
    } else {
      // Create new note
      try {
        const noteData = {
          title: newNote.title,
          description: newNote.description,
          date,
          email,
        };

        const response = await axios.post(
          "http://localhost:5000/notes",
          noteData
        );
        if (response.data.insertedId) {
          setNotes([{ ...noteData, _id: response.data.insertedId }, ...notes]);
          Swal.fire({
            title: "Success!",
            text: "Note added successfully.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      } catch (error) {
        console.error("Error adding note:", error);
        Swal.fire("Error!", "Failed to add the note.", "error");
      }
    }

    setNewNote({ title: "", description: "" });
    setOpen(false);
    setIsEdit(false);
  };

  const handleEdit = (note) => {
    setIsEdit(true);
    setCurrentNote(note);
    setNewNote({ title: note.title, description: note.description });
    setOpen(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/notes/${id}`
        );

        if (response.status === 200) {
          setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
          Swal.fire("Deleted!", "Your note has been deleted.", "success");
        }
      } catch (error) {
        console.error("Error deleting note:", error);
        Swal.fire("Error!", "There was a problem deleting the note.", "error");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h3" className="text-center mb-8">
        My Notes
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          className="border-2 border-dashed border-blue-gray-100 hover:border-blue-gray-200 transition-all cursor-pointer hover:shadow-lg"
          onClick={() => {
            setIsEdit(false);
            handleOpen();
          }}
        >
          <CardBody className="flex flex-col items-center justify-center h-[200px] text-blue-gray-500">
            <AiOutlinePlus className="w-12 h-12 mb-3" />
            <Typography variant="h5">Create a New Note</Typography>
          </CardBody>
        </Card>

        {notes.map((note) => (
          <Card key={note._id} className="hover:shadow-lg transition-shadow">
            <CardBody className="relative">
              <div className="absolute top-2 right-2 flex gap-2">
                <IconButton variant="text" size="sm" className="rounded-full">
                  <AiOutlineEye className="w-5 h-5" />
                </IconButton>
                <IconButton
                  variant="text"
                  size="sm"
                  className="rounded-full"
                  onClick={() => handleEdit(note)}
                >
                  <AiOutlineEdit className="w-5 h-5" />
                </IconButton>
                <IconButton
                  variant="text"
                  size="sm"
                  color="red"
                  className="rounded-full"
                  onClick={() => handleDelete(note._id)}
                >
                  <AiOutlineDelete className="w-5 h-5" />
                </IconButton>
              </div>
              <Typography variant="h5" className="mb-3">
                {note.title}
              </Typography>
              <Typography className="mb-4">{note.description}</Typography>
              <Typography variant="small" color="gray">
                {note.date}
              </Typography>
            </CardBody>
          </Card>
        ))}
      </div>

      <Dialog open={open} handler={handleOpen} size="sm">
        <DialogHeader>
          {isEdit ? "Edit Note" : "Create a New Note"}
        </DialogHeader>
        <DialogBody className="space-y-6">
          <Input
            label="Title"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            className="focus:ring-blue-500 focus:outline-none"
          />
          <Textarea
            label="Description"
            value={newNote.description}
            onChange={(e) =>
              setNewNote({ ...newNote, description: e.target.value })
            }
            rows={4}
            className="focus:ring-blue-500 focus:outline-none"
          />
        </DialogBody>
        <DialogFooter className="flex justify-end gap-4">
          <Button variant="outlined" onClick={handleOpen}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>{isEdit ? "Update" : "Save"}</Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
