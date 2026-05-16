import { useState } from "react";

import pathways from "./data/pathways";
import questions from "./data/questions";
import subjects from "./data/subjects";
import pathwayChoices from "./data/pathwayChoices";
import subjectCombinations from "./data/subjectCombinations";

import PathwayCard from "./components/PathwayCard";
import QuestionCard from "./components/QuestionCard";
import PerformanceCard from "./components/PerformanceCard";
import PathwaySelector from "./components/PathwaySelector";
import CombinationSelector from "./components/CombinationSelector";

export default function App() {

  const [recommendedPathway, setRecommendedPathway] =
    useState("");
  
const [answers, setAnswers] = useState({});
  const [performances, setPerformances] =
  useState({});
  const handlePerformanceChange = (
  subject,
  band
) => {

  setPerformances((prev) => ({
    ...prev,
    [subject]: band,
  }));
};
const handleAnswer = (
  question,
  answer
) => {

  setAnswers((prev) => ({
    ...prev,
    [question]: answer,
  }));
};

const generateRecommendation = () => {

  if (
    answers[
      "Do you enjoy solving complex problems?"
    ] === "Yes"
  ) {
    setRecommendedPathway("STEM");
  }

  else if (
    answers[
      "Do you enjoy creative activities?"
    ] === "Yes"
  ) {
    setRecommendedPathway(
      "Arts & Sports Science"
    );
  }

  else {
    setRecommendedPathway(
      "Social Sciences"
    );
  }
};
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
          <button
            className="primary"
            onClick={generateRecommendation}
          >
            Generate Recommendation
          </button>

          <button className="secondary">
            Explore Pathways
          </button>
        </div>

        {recommendedPathway && (
          <div
            style={{
              background: "#0b63f6",
              padding: "25px",
              borderRadius: "18px",
              marginTop: "40px",
              width: "100%",
              maxWidth: "700px",
            }}
          >
            <h2>
              Recommended Pathway:
            </h2>

            <p
              style={{
                marginTop: "10px",
                fontSize: "1.3rem",
                fontWeight: "bold",
              }}
            >
              {recommendedPathway}
            </p>
          </div>
        )}

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
  onAnswer={(answer) =>
    handleAnswer(
      item.question,
      answer
    )
  }
/>        ))}
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
            Subject Combinations
          </h2>

          <CombinationSelector
            combinations={subjectCombinations}
          />
        </div>

      </section>

    </div>
  );
}
