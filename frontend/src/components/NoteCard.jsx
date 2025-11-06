import {PenSquareIcon, Trash2Icon} from "lucide-react";
import {Link} from "react-router";
import {formatDate} from "../lib/utils";
import api from"../lib/axios"
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); // get rid of the navigation behavior

    if(!window.confirm("Are you sure you want to delete this note?")) return;

    try{
      await api.delete(`/notes/${id}`);
      setNotes((prev)=> prev.filter(note =>note._id !== id)); // get rid of the delted one without refreshing
      toast.success("Note deleted successfuly")
    } catch(error) {
      console.log("error in deleting")
      toast. error("Failed to delte note");
    }
  };

  return (
    <Link to={`/notes/${note._id}`}
    className="card hover:shadow-lg border-solid rounded-3xl bg-white ">
      <div className="card-body">
        <h3 className="card-title  font-sans">{note.title}</h3>
        <p className=" line-clamp-3  ">{note.content}</p>
        <div className="card-actions justify-between items-center">
          <span className="text-sm ">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <button className="btn btn-ghost btn-sm text-primary">
              <PenSquareIcon className="size-4" />
            </button>
            <button className="btn btn-ghost btn-sm text-error" onClick ={(e) => handleDelete(e,note._id)}>
              <Trash2Icon className="size-4"/>
            </button>
          </div>
        </div>
      </div>
   </Link>
  );
};

export default NoteCard;