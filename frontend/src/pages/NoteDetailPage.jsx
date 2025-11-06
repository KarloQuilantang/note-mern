import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast"
import { ArrowLeftCircleIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import api from "../lib/axios";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.error("Failed to fetch the note");
        console.log("Error in fetching note", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if(!window.confirm("Are you sure you want to dete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };


  const handleSave = async () => {
    if(!note.title.trim() || !note.content.trim()){
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true)

    try{
      await api.put(`/notes/${id}`, note)
      toast.success("Note update successfully");
      navigate("/")
    } catch (error) {
      console.log("Error in saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false)
    }
  };

  console.log({ note });

  if (loading) {
    return (
      <div className = "min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className = "min-h-screen bg-base-200">
      <div className = "container mx-auto px-4 py-8 ">
        <div className="max-w-2xl mx-auto">
          <div className = "flex items-center justify-between mb-2 ">
            <Link to ="/" className = "btn btn-ghost rounded-3xl">
              <ArrowLeftCircleIcon className = "h-5 w-5"/>
              Back to Notes
            </Link>
            
          </div>
          
          <div className="card bg-base-100 rounded-3xl">
            <div className="card-body">
              <div className = "form-control mb-1">
                <label className = "label">
                  <span className = "label-text">Title</span>
                </label>
                <input
                  type = "text"
                  placeholder = "Note title"
                  className = "input input-bordered rounded-3xl"
                  value={note.title}
                  onChange ={(e) => setNote({...note,title: e.target.value})}
                  />
              </div>

              <div className="form-control mb-1">
                <label className ="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder ="Write your note here..."
                  className = "textarea textarea-bordered h-32 rounded-3xl"
                  value = {note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              <div className = "card-actions justify-between ">
                <button onClick ={handleDelete} className = "btn btn-outline btn-error rounded-3xl">
                  <Trash2Icon className = "h-5 w-5"/>
                  Delete Note
                </button>
                <button className ="btn btn-soft rounded-3xl" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving...": "Save Changes"}
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default NoteDetailPage;
