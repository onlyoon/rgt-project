import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"

interface BookCardProps {
  id: number
  title: string
  author: string
  desc: string
  publisher: string
  price: string
  updatedAt: string
}

const BookCard: React.FC<BookCardProps> = ({ id, title, author, desc, publisher, price, updatedAt }) => {

  return (
    <MaxWidthWrapper>
      <Card className="w-full">
        <div className="flex flex-row justify-between">
          <CardHeader>
            <CardTitle className="text-lg">{title}</CardTitle>
            <div className="flex flex-row gap-4">
              <CardDescription>{author}</CardDescription>
              <CardDescription>{publisher}</CardDescription>
            </div>
          </CardHeader>
          <CardHeader>  {new Date(updatedAt).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          })}</CardHeader>
        </div>
        <CardContent>
          <p>{desc}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <span className="font-semibold text-xl">${(+price).toFixed(2)}</span>
          <Link to={`/books/${id}`}>
            <Button>View Details</Button>
          </Link>
        </CardFooter>
      </Card>
    </MaxWidthWrapper>
  )
}

export default BookCard