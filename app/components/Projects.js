// app/components/Projects.js
import React from 'react';

const Projects = () => {
  return (
    <section id="projects" className="container my-5">
      <h2 className="text-center">Projects</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <img src="/project1.jpg" className="card-img-top" alt="Project 1" />
            <div className="card-body">
              <h5 className="card-title">Project 1</h5>
              <p className="card-text">A decentralized application for cross-chain messaging.</p>
              <a href="#" className="btn btn-primary">View Project</a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img src="/project2.jpg" className="card-img-top" alt="Project 2" />
            <div className="card-body">
              <h5 className="card-title">Project 2</h5>
              <p className="card-text">A decentralized reputation system using Soulbound NFTs.</p>
              <a href="#" className="btn btn-primary">View Project</a>
            </div>
          </div>
        </div>
        {/* Add more projects here */}
      </div>
    </section>
  );
};

export default Projects;
