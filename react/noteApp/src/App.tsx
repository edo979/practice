import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

function App() {
  // const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
  // const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

  // const notesWithTags = useMemo(() => {
  //   return notes.map((note) => {
  //     return {
  //       ...note,
  //       tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
  //     }
  //   })
  // }, [notes, tags])

  // function oneCreateNote({ tags, ...data }: NoteData) {
  //   setNotes((prevNotes) => [
  //     ...prevNotes,
  //     { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
  //   ])
  // }

  // function addTag(tag: Tag) {
  //   setTags((prev) => [...prev, tag])
  // }

  return (
    <Container className="my-4">
      <Outlet />
    </Container>
  )
}

export default App
