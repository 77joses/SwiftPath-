import kieniWestSchools from "./data/kieniWestSchools";
import kieniEastSchools from "./data/kieniEastSchools";
import mathiraSchools from "./data/mathiraSchools";
import tetuSchools from "./data/tetuSchools";
import othayaSchools from "./data/othayaSchools";
import mukurweiniSchools from "./data/mukurweiniSchools";
import nyeriCentralSchools from "./data/nyeriCentralSchools";

import mountKenyaC2Schools from "./data/mountKenyaC2Schools";
import c1SchoolsKenya from "./data/c1SchoolsKenya";
import { useState } from "react";

import questions from "./data/questions";
import subjects from "./data/subjects";
import counties from "./data/counties";
import subcounties from "./data/subcounties";
import schools from "./data/schools";
import subjectCombinations from "./data/subjectCombinations";

import QuestionCard from "./components/QuestionCard";
import PerformanceCard from "./components/PerformanceCard";
import SchoolFilter from "./components/SchoolFilter";
import SchoolRecommendations from "./components/SchoolRecommendations";
import CombinationSelector from "./components/CombinationSelector";

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

  const [selectedCombination, setSelectedCombination] =
    useState("");

  const [combinationFeedback, setCombinationFeedback] =
    useState("");

  const [pathwayScores, setPathwayScores] =
    useState([]);
const nyeriSubcountySchools = {
  "Kieni West": kieniWestSchools,
  "Kieni East": kieniEastSchools,
  Mathira: mathiraSchools,
  Tetu: tetuSchools,
  Othaya: othayaSchools,
  "Mukurwe-ini": mukurweiniSchools,
  "Nyeri Central": nyeriCentralSchools,
};
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

  const analyzeCombination = (
    pathway
  ) => {

    if (
      selectedCombination === ""
    ) {

      setCombinationFeedback(
        "Please select a subject combination."
      );

      return;
    }

    const combination =
      selectedCombination.toLowerCase();

    if (
      pathway === "STEM" &&
      (
        combination.includes("physics") ||
        combination.includes("chemistry") ||
        combination.includes("biology")
      )
    ) {

      setCombinationFeedback(
        "Excellent combination alignment for STEM pathways."
      );
    }

    else if (
      pathway ===
        "Arts & Sports Science" &&
      (
        combination.includes("art") ||
        combination.includes("music")
      )
    ) {

      setCombinationFeedback(
        "This combination aligns strongly with creative and arts pathways."
      );
    }

    else if (
      pathway ===
        "Social Sciences" &&
      (
        combination.includes("history") ||
        combination.includes("business")
      )
    ) {

      setCombinationFeedback(
        "This combination supports Social Sciences progression."
      );
    }

    else {

      setCombinationFeedback(
        "Your chosen combination may not strongly support your recommended pathway. Consider exploring alternative combinations or pathways."
      );
    }
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

    if (
      performances["Integrated Science"] === "EE1" ||
      performances["Integrated Science"] === "EE2"
    ) {

      stemScore += 4;

      reasons.push(
        "You demonstrated strength in Integrated Science."
      );
    }

    if (
      performances["Visual Arts"] === "EE1" ||
      performances["Performing Arts"] === "EE1"
    ) {

      artsScore += 4;

      reasons.push(
        "Your artistic performance supports creative pathways."
      );
    }

    if (
      performances["Social Studies"] === "EE1" ||
      performances["Social Studies"] === "EE2"
    ) {

      socialScore += 4;

      reasons.push(
        "You performed strongly in Social Studies."
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

    setPathwayScores(
      rankedScores
    );

    const topPathway =
      rankedScores[0].pathway;

    setRecommendedPathway(
      topPathway
    );

    setRecommendationReason(
      reasons.join(" ")
    );

    analyzeCombination(
      topPathway
    );
  };

  
let filteredSchools = [];

if (selectedCounty === "Nyeri") {

  const selectedSubcountySchools =
    nyeriSubcountySchools[
      selectedSubcounty
    ] || [];

  filteredSchools =
    selectedSubcountySchools.filter(
      (school) =>

        school.pathways.includes(
          recommendedPathway
        ) &&

        (
          selectedCategory === "" ||

          school.category ===
            selectedCategory
        )
    );
}

if (selectedCategory === "C1") {

  filteredSchools =
    c1SchoolsKenya.filter(
      (school) =>
        school.pathways.includes(
          recommendedPathway
        )
    );
}

if (selectedCategory === "C2") {

  filteredSchools = [

    ...filteredSchools,

    ...mountKenyaC2Schools.filter(
      (school) =>
        school.pathways.includes(
          recommendedPathway
        )
    ),
  ];
}
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

            <div
              style={{
                marginTop: "30px",
              }}
            >

              <h3>
                Alternative Pathways
              </h3>

              {pathwayScores.map(
                (item, index) => (
                  <p
                    key={index}
                    style={{
                      marginTop: "10px",
                    }}
                  >
                    {index + 1}.
                    {" "}
                    {item.pathway}
                    {" "}
                    ({item.score} points)
                  </p>
                )
              )}

            </div>

            <div
              style={{
                marginTop: "30px",
              }}
            >

              <h3>
                Subject Combination Analysis
              </h3>

              <p
                style={{
                  marginTop: "12px",
                  lineHeight: "1.7",
                }}
              >
                {combinationFeedback}
              </p>

            </div>

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

          <h2>
            Subject Combination
          </h2>

          <CombinationSelector
            combinations={
              subjectCombinations
            }
            onCombinationChange={
              setSelectedCombination
            }
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
