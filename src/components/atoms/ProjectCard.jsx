import React from 'react';
import './css/ProjectCard.css';

const ProjectCard = ({ project, onClick }) => {
  return (
    <div className="project-card" onClick={onClick}>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
    </div>
  );
};

export default ProjectCard;
