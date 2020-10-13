import React from 'react';
import './App.css';

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Header: React.FC<{name: string}> = ({ name }) => {
  return <h1>{name}</h1>
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDesc extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartWithDesc {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDesc {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartWithDesc {
  name: "State handling";
  groupProjectCount: number;
  exerciseSubmissionLink: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

interface ContentProps {
  courseParts: CoursePart[];
}

const Part: React.FC<{part: CoursePart}> = ({ part }) => {

    switch (part.name){
        case "Fundamentals":
          return <tr>
            <td>{part.name}</td>
            <td>{part.exerciseCount}</td>
            <td>{part.description}</td>
            <td></td>
            <td></td>
          </tr>
        case "Using props to pass data":
          return <tr>
            <td>{part.name}</td>
            <td>{part.exerciseCount}</td>
            <td></td>
            <td>{part.groupProjectCount}</td>
            <td></td>
          </tr>
        case "Deeper type usage":
          return <tr>
            <td>{part.name}</td>
            <td>{part.exerciseCount}</td>
            <td>{part.description}</td>
            <td></td>
            <td>{part.exerciseSubmissionLink}</td>
          </tr>
        case "State handling":
          return <tr>
            <td>{part.name}</td>
            <td>{part.exerciseCount}</td>
            <td>{part.description}</td>
            <td>{part.groupProjectCount}</td>
            <td>{part.exerciseSubmissionLink}</td>
          </tr>
        default:
          return assertNever(part);
      }
}

const Content: React.FC<ContentProps> = ({ courseParts }) => {
return (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Exercise Count</th>
        <th>Description</th>
        <th>Group Project Count</th>
        <th>Exercise submission link</th>
      </tr>
    </thead>
    <tbody>
      {courseParts.map(part => <Part key={part.name} part={part} />)}
    </tbody>
  </table>)
}

const Total: React.FC<ContentProps> = ({ courseParts }) => {
  return <p>Number of exercises{" "}
  {courseParts.reduce((carry: number, part: CoursePart) => carry + part.exerciseCount, 0)}
  </p>
}

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "State handling",
      exerciseCount: 4,
      description: "This one is awesome too",
      groupProjectCount: 2,
      exerciseSubmissionLink: "https://fake-exercise-submit.another-made-up-url.dev"
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
