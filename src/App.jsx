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

const [recommendationReason, setRecommendationReason] =
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

  let stemScore = 0;
  let artsScore = 0;
  let socialScore = 0;

  if (
    answers[
      "Do you enjoy solving complex problems?"
    ] === "Yes"
  ) {
    stemScore += 3;
  }

  if (
    answers[
      "Do you enjoy creative activities?"
    ] === "Yes"
  ) {
    artsScore += 3;
  }

  if (
    performances["Mathematics"] === "EE1" ||
    performances["Mathematics"] === "EE2"
  ) {
    stemScore += 4;
  }

  if (
    performances["Integrated Science"] === "EE1" ||
    performances["Integrated Science"] === "EE2"
  ) {
    stemScore += 4;
  }

  if (
    performances["Visual Arts"] === "EE1" ||
    performances["Performing Arts"] === "EE1"
  ) {
    artsScore += 4;
  }

  if (
    performances["Social Studies"] === "EE1" ||
    performances["Social Studies"] === "EE2"
  ) {
    socialScore += 4;
  }

  if (
  stemScore >= artsScore &&
  stemScore >= socialScore
) {

  setRecommendedPathway("STEM");

  setRecommendationReason(
    "Your strengths in Mathematics, Science and analytical thinking align strongly with STEM pathways."
  );
}
  }

  else if (
    artsScore >= stemScore &&
    artsScore >= socialScore
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

  console.log({
    stemScore,
    artsScore,
    socialScore,
  });
};
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
  onPerformanceChange={
    handlePerformanceChange
  }
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
