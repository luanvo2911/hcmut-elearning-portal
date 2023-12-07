import { User } from "@/types/user"

const LecturerRoute = ({user}: {user: User | undefined}) => {
  return (
    <div>
      Lecturer page for user {user?.user_id}
    </div>
  )
}

export default LecturerRoute;