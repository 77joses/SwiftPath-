import { useState } from "react";

import questions from "./data/questions";
import subjects from "./data/subjects";
import counties from "./data/counties";
import subcounties from "./data/subcounties";
import schools from "./data/schools";

import QuestionCard from "./components/QuestionCard";
import PerformanceCard from "./components/PerformanceCard";
import SchoolFilter from "./components/SchoolFilter";
import SchoolRecommendations from "./components/SchoolRecommendations";

export default function App() {

  const [recommendedPathway, setRecommendedPathway] =
    useState("");

  const [recommendationReason, setRecommendationReason] =
    useState("");

  const [answers, setAnswers] =
    useState({});

  const [performances, setPerformances] =
    useState({});

  const [selectedCounty, setSelectedCounty] =
    useState("");

  const [selectedSubcounty, setSelectedSubcounty] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("");

  const [selectedDisability, setSelectedDisability] =
    useState("");

  const [pathwayScores, setPathwayScores] =
    useState([]);

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

    let reasons = [];

    if (
      answers[
        "Do you enjoy solving complex problems?"
      ] === "Yes"
    ) {
      stemScore += 3;

      reasons.push(
        "You enjoy analytical problem solving."
      );
    }

    if (
      answers[
        "Do you enjoy creative activities?"
      ] === "Yes"
    ) {
      artsScore += 3;

      reasons.push(
        "You show strong creative interests."
      );
    }

    if (
      performances["Mathematics"] === "EE1" ||
      performances["Mathematics"] === "EE2"
    ) {

      stemScore += 4;

      reasons.push(
        "You performed strongly in Mathematics."
      );
    }

    else if (
      performances["Mathematics"] === "AE" ||
      performances["Mathematics"] === "BE"
    ) {

      stemScore -= 2;

      reasons.push(
        "Your Mathematics performance may make advanced STEM pathways more challenging."
      );
    }

    const rankedScores = [
      {
        pathway: "STEM",
        score: stemScore,
      },

      {
        pathway:
          "Arts & Sports Science",
        score: artsScore,
      },

      {
        pathway:
          "Social Sciences",
        score: socialScore,
      },
    ];

    rankedScores.sort(
      (a, b) => b.score - a.score
    );

    setPathwayScores(rankedScores);

    const topPathway =
      rankedScores[0].pathway;

    setRecommendedPathway(
      topPathway
    );

    setRecommendationReason(
      reasons.join(" ")
    );
  };

  const filteredSchools = schools.filter(
    (school) =>
      school.pathway === recommendedPathway &&

      (
        selectedCounty === "" ||
        school.county === selectedCounty
      ) &&

      (
        selectedSubcounty === "" ||
        school.subcounty ===
          selectedSubcounty
      ) &&

      (
        selectedCategory === "" ||
        school.category ===
          selectedCategory
      ) &&

      (
        selectedDisability === "" ||
        selectedDisability ===
          "None" ||

        school.disabilitySupport ===
          selectedDisability
      )
  );

  return (
    <div className="container">

      <section className="hero">

        <h1>SwiftPath</h1>

        <p>
          Pathways to Success
        </p>

        <button
          className="primary"
          onClick={generateRecommendation}
        >
          Generate Recommendation
        </button>

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
              Recommended Pathway
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

            <p
              style={{
                marginTop: "15px",
                lineHeight: "1.7",
              }}
            >
              {recommendationReason}
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

          <h2>
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

          <SchoolFilter
            counties={counties}
            subcounties={subcounties}
            onCountyChange={
              setSelectedCounty
            }
            onSubcountyChange={
              setSelectedSubcounty
            }
            onCategoryChange={
              setSelectedCategory
            }
            onDisabilityChange={
              setSelectedDisability
            }
          />

        </div>

        {recommendedPathway && (
          <div
            style={{
              marginTop: "80px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >

            <h2>
              Recommended Schools
            </h2>

            <SchoolRecommendations
              schools={filteredSchools}
            />

          </div>
        )}

      </section>

    </div>
  );
}
