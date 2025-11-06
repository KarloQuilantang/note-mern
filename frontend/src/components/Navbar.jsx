import {Link} from "react-router";
import {PlusIcon} from "lucide-react"

const Navbar = () => {
  return (
    <header className="bg-blue-950 ">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-thin text-white tracking-tighter">
            the note app
          </h1>
          
          <div className="flex items-center">
            <Link to="/create" className="btn btn-soft rounded-2xl">
              <PlusIcon className="size-5"/>
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar