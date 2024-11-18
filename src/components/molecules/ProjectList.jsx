import React from 'react';
import ProjectCard from '../atoms/ProjectCard';
import './css/ProjectList.css';

const ProjectList = ({ projects, onClickProject }) => {
  return (
    <div className="project-list">
      {projects.length === 0 ? (
        <p>No projects assigned.</p>
      ) : (
        projects.map(project => (
          <ProjectCard
            key={project._id} // Usa _id si es necesario, o project.id
            project={project}
            onClick={() => onClickProject(project._id)} // Asegúrate de usar el ID correcto
          />
        ))
      )}
    </div>
  );
};

export default ProjectList;
