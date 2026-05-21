import kieniWestSchools from "./data/kieniWestSchools";
import kieniEastSchools from "./data/kieniEastSchools";
import mathiraEastSchools from "./data/mathiraEastSchools";
import mathiraWestSchools from "./data/mathiraWestSchools";
import tetuSchools from "./data/tetuSchools";
import nyeriSouthSchools from "./data/nyeriSouthSchools";
import MukurweiniSchools from "./data/MukurweiniSchools";
import nyeriCentralSchools from "./data/nyeriCentralSchools";

import c1SchoolsKenya from "./data/c1SchoolsKenya";
import { useState } from "react";

import questions from "./data/questions";
import subjects from "./data/subjects";
import counties from "./data/counties";
import subcounties from "./data/subcounties";
import subjectCombinations from "./data/subjectCombinations";

import QuestionCard from "./components/QuestionCard";
import PerformanceCard from "./components/PerformanceCard";
import SchoolFilter from "./components/SchoolFilter";
import SchoolRecommendations from "./components/SchoolRecommendations";
import CombinationSelector from "./components/CombinationSelector";

const nyeriSubcountySchools = {
  "Kieni West": kieniWestSchools,
  "Kieni East": kieniEastSchools,
  "Mathira East": mathiraEastSchools,
  "Mathira West": mathiraWestSchools,
  Tetu: tetuSchools,
  "Nyeri South": nyeriSouthSchools,
  "Mukurwe-ini": MukurweiniSchools,
  "Nyeri Central": nyeriCentralSchools,
};

const getCountyScore = (schoolCounty, selectedCounties) => {
  const index = selectedCounties.indexOf(schoolCounty);
  if (index === 0) return 10;
  if (index === 1) return 6;
  if (index === 2) return 3;
  return 0;
};

const getGenderScore = (schoolGender, selectedGender) => {
  if (selectedGender === "") return 0;
  if (schoolGender === selectedGender) return 4;
  if (schoolGender === "Mixed") return 2;
  return 0;
};

const getPathwayScore = (schoolPathways, pathwayScores) => {
  if (!pathwayScores.length) return 0;
  let best = 0;
  pathwayScores.forEach((item, index) => {
    if (schoolPathways?.includes(item.pathway)) {
      const score = index === 0 ? 4 : index === 1 ? 2 : 1;
      if (score > best) best = score;
    }
  });
  return best;
};

const getAccommodationScore = (
  schoolAccommodation,
  selectedAccommodation
) => {
  if (selectedAccommodation === "") return 0;
  if (schoolAccommodation === selectedAccommodation) return 3;
  return 0;
};

const rankAndSlice = (
  schools,
  selectedCounties,
  selectedGender,
  pathwayScores,
  selectedAccommodation,
  max
) => {
  const scored = schools.map((school) => ({
    ...school,
    _score:
      getCountyScore(school.county, selectedCounties) +
      getGenderScore(school.gender, selectedGender) +
      getPathwayScore(school.pathways, pathwayScores) +
      getAccommodationScore(
        school.accommodation,
        selectedAccommodation
      ),
  }));
  scored.sort((a, b) => b._score - a._score);
  return scored.slice(0, max);
};

export default function App() {

  const [recommendedPathway, setRecommendedPathway] =
    useState("");
  const [recommendationReason, setRecommendationReason] =
    useState("");
  const [answers, setAnswers] = useState({});
  const [performances, setPerformances] = useState({});
  const [selectedCounties, setSelectedCounties] = useState([]);
  const [selectedSubcounty, setSelectedSubcounty] = useState("");
  const [selectedDisability, setSelectedDisability] = useState("");
  const [selectedCombination, setSelectedCombination] = useState("");
  const [combinationFeedback, setCombinationFeedback] = useState("");
  const [pathwayScores, setPathwayScores] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedAccommodation, setSelectedAccommodation] = useState("");

  // Payment states
  const [phone, setPhone] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [generationsLeft, setGenerationsLeft] = useState(0);
  const [paymentError, setPaymentError] = useState("");
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [showSchools, setShowSchools] = useState(false);

  const handlePerformanceChange = (subject, band) => {
    setPerformances((prev) => ({ ...prev, [subject]: band }));
  };

  const handleAnswer = (question, answer) => {
    setAnswers((prev) => ({ ...prev, [question]: answer }));
  };

  const handleAddCounty = (county) => {
    if (county === "") return;
    if (selectedCounties.includes(county)) return;
    if (selectedCounties.length >= 3) return;
    setSelectedCounties((prev) => [...prev, county]);
  };

  const handleRemoveCounty = (county) => {
    setSelectedCounties((prev) =>
      prev.filter((c) => c !== county)
    );
  };

  const analyzeCombination = (pathway) => {
    if (selectedCombination === "") {
      setCombinationFeedback("");
      return;
    }
    const combination = selectedCombination.toLowerCase();
    if (
      pathway === "STEM" &&
      (combination.includes("physics") ||
        combination.includes("chemistry") ||
        combination.includes("biology"))
    ) {
      setCombinationFeedback(
        "Excellent combination alignment for STEM pathways."
      );
    } else if (
      pathway === "Arts & Sports Science" &&
      (combination.includes("art") ||
        combination.includes("music"))
    ) {
      setCombinationFeedback(
        "This combination aligns strongly with creative and arts pathways."
      );
    } else if (
      pathway === "Social Sciences" &&
      (combination.includes("history") ||
        combination.includes("business"))
    ) {
      setCombinationFeedback(
        "This combination supports Social Sciences progression."
      );
    } else {
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
      answers["Do you enjoy solving complex problems?"] === "Yes"
    ) {
      stemScore += 3;
      reasons.push("You enjoy analytical problem solving.");
    } else if (
      answers["Do you enjoy solving complex problems?"] === "No"
    ) {
      stemScore -= 1;
    }

    if (
      answers["Do you enjoy creative activities?"] === "Yes"
    ) {
      artsScore += 3;
      reasons.push("You show strong creative interests.");
    } else if (
      answers["Do you enjoy creative activities?"] === "No"
    ) {
      artsScore -= 1;
    }

    if (
      performances["Mathematics"] === "EE1" ||
      performances["Mathematics"] === "EE2"
    ) {
      stemScore += 4;
      reasons.push("You performed strongly in Mathematics.");
    } else if (
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
      reasons.push("You demonstrated strength in Integrated Science.");
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
      reasons.push("You performed strongly in Social Studies.");
    }

    const ranked = [
      { pathway: "STEM", score: stemScore },
      { pathway: "Arts & Sports Science", score: artsScore },
      { pathway: "Social Sciences", score: socialScore },
    ];

    ranked.sort((a, b) => b.score - a.score);
    setPathwayScores(ranked);
    const topPathway = ranked[0].pathway;
    setRecommendedPathway(topPathway);
    setRecommendationReason(reasons.join(" "));
    analyzeCombination(topPathway);
    setShowSchools(false);
  };

  const handleUnlock = async () => {
    if (!phone || phone.length < 9) {
      setPaymentError("Please enter a valid Safaricom number.");
      return;
    }
    setCheckingPayment(true);
    setPaymentError("");
    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (data.unlocked) {
        setUnlocked(true);
        setGenerationsLeft(data.generations_remaining);
        setShowSchools(true);
      } else {
        setPaymentError(
          "No active unlock found for this number. Please pay KSH 20 to unlock."
        );
      }
    } catch (err) {
      setPaymentError("Something went wrong. Please try again.");
    }
    setCheckingPayment(false);
  };

  // Build school groups
  const subcountySchools =
    nyeriSubcountySchools[selectedSubcounty] || [];

  const baseFilter = (school) =>
    school.pathways?.includes(recommendedPathway) &&
    (selectedGender === "" ||
      school.gender === selectedGender ||
      school.gender === "Mixed");

  const c1Candidates = recommendedPathway
    ? c1SchoolsKenya.filter(
        (school) =>
          baseFilter(school) &&
          selectedCounties.includes(school.county)
      )
    : [];

  const c2Candidates = recommendedPathway
    ? subcountySchools.filter(
        (school) => baseFilter(school) && school.category === "C2"
      )
    : [];

  const c3Candidates = recommendedPathway
    ? subcountySchools.filter(
        (school) => baseFilter(school) && school.category === "C3"
      )
    : [];

  const c4Candidates = recommendedPathway
    ? subcountySchools.filter(
        (school) => baseFilter(school) && school.category === "C4"
      )
    : [];

  const c1Schools = rankAndSlice(
    c1Candidates, selectedCounties, selectedGender,
    pathwayScores, selectedAccommodation, 3
  );
  const c2Schools = rankAndSlice(
    c2Candidates, selectedCounties, selectedGender,
    pathwayScores, selectedAccommodation, 3
  );
  const c3Schools = rankAndSlice(
    c3Candidates, selectedCounties, selectedGender,
    pathwayScores, selectedAccommodation, 3
  );
  const c4Schools = rankAndSlice(
    c4Candidates, selectedCounties, selectedGender,
    pathwayScores, selectedAccommodation, 3
  );

  return (
    <div className="container">
      <section className="hero">

        {/* LOGO */}
        <img
          src="/file_00000000d5d071fb9329dd2c6c6ce7fe.png"
          alt="SwiftPath Logo"
          style={{
            width: "220px",
            marginTop: "30px",
            borderRadius: "20px",
          }}
        />

        {/* WELCOME */}
        <div
          style={{
            marginTop: "30px",
            width: "100%",
            maxWidth: "700px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "1.1rem",
              fontStyle: "italic",
              opacity: 0.85,
              lineHeight: "1.7",
            }}
          >
            Your future starts with one decision.
          </p>
          <h1 style={{ marginTop: "10px" }}>
            Welcome to SwiftPath
          </h1>
          <p
            style={{
              marginTop: "6px",
              opacity: 0.7,
              fontSize: "0.95rem",
            }}
          >
            Kenya's smartest CBC pathway guide, built for the
            student who refuses to leave their future to chance.
          </p>
        </div>

        {/* DESCRIPTION */}
        <div
          style={{
            marginTop: "30px",
            width: "100%",
            maxWidth: "700px",
            background: "#10213d",
            padding: "25px",
            borderRadius: "18px",
            lineHeight: "1.8",
          }}
        >
          <p>
            The CBC system opens three powerful doors:{" "}
            <strong>STEM</strong>,{" "}
            <strong>Social Sciences</strong>, and{" "}
            <strong>Arts & Sports Science</strong>. But which
            one is truly yours?
          </p>
          <p style={{ marginTop: "15px" }}>
            SwiftPath analyses your strengths, your grades, and
            your ambitions — then points you to the exact
            pathway, subject combination, and schools where you
            will thrive.
          </p>
          <p
            style={{
              marginTop: "15px",
              fontStyle: "italic",
              opacity: 0.8,
            }}
          >
            Answer honestly. The results might surprise you.
          </p>
        </div>

        {/* QUESTIONS */}
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
                handleAnswer(item.question, answer)
              }
            />
          ))}
        </div>

        {/* SUBJECT PERFORMANCE */}
        <div
          style={{
            marginTop: "80px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>Subject Performance</h2>
          {subjects.map((subject, index) => (
            <PerformanceCard
              key={index}
              subject={subject}
              onPerformanceChange={handlePerformanceChange}
            />
          ))}
        </div>

        {/* SUBJECT COMBINATION */}
        <div
          style={{
            marginTop: "80px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>Subject Combination</h2>
          <CombinationSelector
            combinations={subjectCombinations}
            onCombinationChange={setSelectedCombination}
          />
        </div>

        {/* SCHOOL FILTERS */}
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
            selectedCounties={selectedCounties}
            onAddCounty={handleAddCounty}
            onRemoveCounty={handleRemoveCounty}
            onSubcountyChange={setSelectedSubcounty}
            onDisabilityChange={setSelectedDisability}
            onGenderChange={setSelectedGender}
            onAccommodationChange={setSelectedAccommodation}
          />
        </div>

        {/* GENERATE BUTTON */}
        <button
          className="primary"
          onClick={generateRecommendation}
          style={{ marginTop: "40px" }}
        >
          Generate My Pathway
        </button>

        {/* PATHWAY RECOMMENDATION */}
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
            <h2>Your Recommended Pathway</h2>
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
            <div style={{ marginTop: "30px" }}>
              <h3>Alternative Pathways</h3>
              {pathwayScores.map((item, index) => (
                <p key={index} style={{ marginTop: "10px" }}>
                  {index + 1}. {item.pathway} ({item.score} points)
                </p>
              ))}
            </div>
            <div style={{ marginTop: "30px" }}>
              <h3>Subject Combination Analysis</h3>
              <p style={{ marginTop: "12px", lineHeight: "1.7" }}>
                {combinationFeedback}
              </p>
            </div>
          </div>
        )}

        {/* PAYMENT PROMPT */}
        {recommendedPathway && !showSchools && (
          <div
            style={{
              marginTop: "40px",
              width: "100%",
              maxWidth: "700px",
              background: "#10213d",
              padding: "25px",
              borderRadius: "18px",
              textAlign: "center",
            }}
          >
            <h2>Your pathway is ready.</h2>
            <h2>Your schools are waiting.</h2>

            <p
              style={{
                marginTop: "15px",
                lineHeight: "1.7",
                opacity: 0.9,
              }}
            >
              Unlock your personalised school recommendations
              for just <strong>KSH 20</strong>.
            </p>
            <p
              style={{
                marginTop: "8px",
                fontStyle: "italic",
                opacity: 0.7,
              }}
            >
              Pay once. Use five times.
            </p>

            <p
              style={{
                marginTop: "20px",
                fontWeight: "bold",
                fontSize: "1.1rem",
              }}
            >
              Pay KSH 20 to Till: <strong>YOUR 5425894</strong>
            </p>

            <p style={{ marginTop: "20px", opacity: 0.8 }}>
              Then enter your M-Pesa number below:
            </p>

            <input
              type="tel"
              placeholder="e.g. 0712345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{
                marginTop: "15px",
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                border: "none",
                fontSize: "1rem",
                background: "#1a2f55",
                color: "white",
              }}
            />

            {paymentError && (
              <p
                style={{
                  marginTop: "10px",
                  color: "#ff6b6b",
                  fontSize: "0.9rem",
                }}
              >
                {paymentError}
              </p>
            )}

            <button
              className="primary"
              onClick={handleUnlock}
              style={{ marginTop: "20px", width: "100%" }}
              disabled={checkingPayment}
            >
              {checkingPayment
                ? "Checking..."
                : "Unlock My Schools"}
            </button>
          </div>
        )}

        {/* GENERATIONS COUNTER */}
        {unlocked && (
          <p
            style={{
              marginTop: "15px",
              opacity: 0.7,
              fontSize: "0.9rem",
            }}
          >
            Generations remaining: {generationsLeft}
          </p>
        )}

        {/* SCHOOL RECOMMENDATIONS */}
        {showSchools && (
          <div
            style={{
              marginTop: "40px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2>Recommended Schools</h2>
            <SchoolRecommendations
              c1Schools={c1Schools}
              c2Schools={c2Schools}
              c3Schools={c3Schools}
              c4Schools={c4Schools}
            />
          </div>
        )}

      </section>
    </div>
  );
}
