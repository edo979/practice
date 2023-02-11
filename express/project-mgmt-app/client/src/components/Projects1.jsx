import Spiner from './Spinner'
import ProjectCard from './ProjectCard'

export default function Projects({ projects }) {
  return (
    <div className="row mt-4">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
