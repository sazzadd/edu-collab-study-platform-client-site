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
  const [newNote, setNewNote] = useState({ title: "", description: "" });
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const name = user?.displayName;
  const handleOpen = () => setOpen(!open);

  // Fetch the notes for the logged-in user
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
  }, [email,notes]);

  const handleSubmit = async () => {
    const date = format(new Date(), "dd-MM-yyyy");

    const noteData = {
      title: newNote.title,
      description: newNote.description,
      date,
      email: email || "anonymous@example.com",
      name: name || "Anonymous",
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/notes",
        noteData
      );

      if (response.data.insertedId) {
        setNotes([
          {
            id: notes.length + 1,
            ...noteData,
          },
          ...notes,
        ]);
        setNewNote({ title: "", description: "" });
        handleOpen();

        Swal.fire({
          title: "Success!",
          text: "Your note has been successfully added.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error adding note:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add the note. Please try again later.",
        icon: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    // SweetAlert2 confirmation for deleting
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
        // Sending delete request to backend using the MongoDB _id
        const response = await axios.delete(
          `http://localhost:5000/notes/${id}`
        );

        if (response.status === 200) {
          // After successful deletion, remove the note from state
          setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));

          Swal.fire("Deleted!", "Your note has been deleted.", "success");
        } else {
          Swal.fire(
            "Error!",
            "There was a problem deleting the note.",
            "error"
          );
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
        {/* Create Note Card */}
        <Card
          className="border-2 border-dashed border-blue-gray-100 hover:border-blue-gray-200 transition-all cursor-pointer hover:shadow-lg"
          onClick={handleOpen}
        >
          <CardBody className="flex flex-col items-center justify-center h-[200px] text-blue-gray-500">
            <AiOutlinePlus className="w-12 h-12 mb-3" />
            <Typography variant="h5">Create a New Note</Typography>
          </CardBody>
        </Card>

        {/* Notes Cards */}
        {notes.map((note) => (
          <Card key={note._id} className="hover:shadow-lg transition-shadow">
            <CardBody className="relative">
              <div className="absolute top-2 right-2 flex gap-2">
                <IconButton variant="text" size="sm" className="rounded-full">
                  <AiOutlineEye className="w-5 h-5" />
                </IconButton>
                <IconButton variant="text" size="sm" className="rounded-full">
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
              <div className="mt-8">
                <Typography variant="h5" color="blue-gray" className="mb-3">
                  {note.title}
                </Typography>
                <Typography className="mb-4 font-normal">
                  {note.description}
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal"
                >
                  {note.date}
                </Typography>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Create Note Modal */}
      <Dialog open={open} handler={handleOpen} size="sm" className="rounded-lg">
        <DialogHeader className="text-lg font-semibold text-gray-800">
          Create a New Note
        </DialogHeader>
        <DialogBody divider className="space-y-4">
          <Input
            label="Title"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            placeholder="Enter the title here"
            className="focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          />
          <Textarea
            label="Description"
            value={newNote.description}
            onChange={(e) =>
              setNewNote({ ...newNote, description: e.target.value })
            }
            placeholder="Enter a detailed description"
            rows={4}
            className="focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          />
        </DialogBody>
        <DialogFooter className="flex justify-end gap-3">
          <Button
            variant="outlined"
            color="gray"
            onClick={handleOpen}
            className="border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-blue-500 text-white hover:shadow-lg"
          >
            Save Note
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

