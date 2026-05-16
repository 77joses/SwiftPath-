import pathwayChoices from "./data/pathwayChoices";
import PathwaySelector from "./components/PathwaySelector";
import subjects from "./data/subjects";
import PerformanceCard from "./components/PerformanceCard";
import pathways from "./data/pathways";
import questions from "./data/questions";

import PathwayCard from "./components/PathwayCard";
import QuestionCard from "./components/QuestionCard";

export default function App() {
  return (
    <div className="container">

      <section className="hero">

        <h1>SwiftPath</h1>

        <p>
          Discover the pathway built for your future.
          SwiftPath helps CBC learners explore pathways,
          subjects, schools, and careers through intelligent guidance.
        </p>

        <div className="buttons">
          <button className="primary">
            Start Analysis
          </button>

          <button className="secondary">
            Explore Pathways
          </button>
        </div>

        <div
          style={{
            marginTop: "60px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {pathways.map((pathway) => (
            <PathwayCard
              key={pathway.id}
              name={pathway.name}
              description={pathway.description}
            />
          ))}
        </div>

        <div
          style={{
            marginTop: "80px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {questions.map((item) => (
            
<QuestionCard
  key={item.id}
  question={item.question}
  type={item.type}
  options={item.options}
/>
    
          ))}
        </div>
<div
  style={{
    marginTop: "80px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }}
>
  <h2 style={{ marginBottom: "20px" }}>
    Subject Performance
  </h2>

  {subjects.map((subject, index) => (
    <PerformanceCard
      key={index}
      subject={subject}
    />
  ))}
</div>
    <div
  style={{
    marginTop: "80px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }}
>
  <h2 style={{ marginBottom: "20px" }}>
    Preferred Pathways
  </h2>

  <PathwaySelector
    pathways={pathwayChoices}
  />
</div>
      </section>

    </div>
  );
}
