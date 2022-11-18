import Spiner from './Spinner'
import ProjectCard from './ProjectCard'

export default function Projects({ projects }) {
  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  )
}
