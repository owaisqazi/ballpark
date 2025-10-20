import React from 'react'
import Intro from './Intro/Intro';
import Welcome from './Welcome/Welcome';
import Feature from './Feature/Feature';
import Project from './Project/Projects';
import Counter from './Counter/Counter';
// import Blog from './Blog/Blog';
import Quote from './Quote/Quote';
const Home = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    const yOffset = -50; // Adjust this value according to your layout
    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  }
  return (
    <>
    <Intro id={"Intro"}/>
     <Welcome />
     <Feature id={"Feature"}/>
     <Project />
     <Counter />
     <Quote />
    </>
  )
}

export default Home