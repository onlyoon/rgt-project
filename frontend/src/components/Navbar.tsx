import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { SquarePen } from "lucide-react"
import MaxWidthWrapper from "./MaxWidthWrapper"

export default function Navbar() {


  return (
    <nav className="sticky z-[10] h-14 inset-x-0 top-0 w-full border-b border-gray-200 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          {/* LOGO */}
          <Link to="/" className="flex z-40 font-semibold">
            project&nbsp;<span className="text-blue-600">RGT&nbsp;</span>
          </Link>
          <div className="flex flex-row gap-4">
            <Link to={'/books/create'}>
              <Button>
                <p>Add Book</p>
                <SquarePen />
              </Button>
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}
