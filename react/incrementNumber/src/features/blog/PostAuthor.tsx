import { useAppSelector } from '../../store/hooks'
import { selectUser } from '../users/usersSlice'

export const PostAuthor = ({ userId }: { userId: string }) => {
  const author = useAppSelector(selectUser(userId))

  return <span>by {author ? author.name : 'Unknown author'}</span>
}
