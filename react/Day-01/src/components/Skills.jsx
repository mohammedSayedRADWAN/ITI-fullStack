import React from 'react';

const SkillItem = ({ name, percent }) => (
  <div className="mb-3">
    <div className="d-flex align-items-center" style={{ height: '35px', backgroundColor: '#e9ecef' }}>
      <div className="bg-secondary text-white h-100 d-flex align-items-center justify-content-center px-3" style={{ minWidth: '120px', fontSize: '14px', fontWeight: 'bold' }}>
        {name}
      </div>
      <div className="bg-muted flex-grow-1 h-100 position-relative">
        <div 
          className="h-100" 
          style={{ 
            width: `${percent}%`, 
            backgroundColor: '#bdc3c7',
            transition: 'width 1s ease-in-out'
          }}
        ></div>
      </div>
    </div>
  </div>
);

const Skills = () => {
  const skills = [
    { name: 'HTML', percent: 95 },
    { name: 'CSS', percent: 92 },
    { name: 'JavaScript', percent: 85 },
    { name: 'React', percent: 85 },
    { name: 'Photoshop', percent: 90 },
    { name: 'Adobe XD', percent: 80 },
    { name: 'Node.js', percent: 70 },
    { name: 'WordPress', percent: 60 }
  ];

  return (
    <section className="skills-section py-5 px-3 px-md-0" style={{ backgroundColor: '#444' }}>
      <div className="container text-center">
        <h2 className="section-title text-white mb-4">Skills</h2>
        <p className="text-white opacity-75 mb-5 mx-auto" style={{ maxWidth: '900px' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
        </p>

        <div className="row g-5 align-items-start mt-4">
          <div className="col-md-5 text-center">
            <h3 className="h4 text-white mb-2 text-uppercase tracking-widest border-bottom border-light pb-2 d-inline-block px-4">My Focus</h3>
            <div className="mt-4 text-white opacity-75">
              <p className="mb-2 h5 fw-light">UI/UX Design</p>
              <p className="mb-2 h5 fw-light">Responsive Design</p>
              <p className="mb-2 h5 fw-light">Web Design</p>
              <p className="mb-2 h5 fw-light">Mobile App Design</p>
            </div>
          </div>
          <div className="col-md-7">
            {skills.map((skill, index) => (
              <SkillItem key={index} name={skill.name} percent={skill.percent} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
