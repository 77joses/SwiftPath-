import kieniWestSchools from "./data/kieniWestSchools";
import kieniEastSchools from "./data/kieniEastSchools";
import mathiraEastSchools from "./data/mathiraEastSchools";
import mathiraWestSchools from "./data/mathiraWestSchools";
import tetuSchools from "./data/tetuSchools";
import nyeriSouthSchools from "./data/nyeriSouthSchools";
import MukurweiniSchools from "./data/MukurweiniSchools";
import nyeriCentralSchools from "./data/nyeriCentralSchools";
import kirinyagaCentralSchools from "./data/kirinyagaCentralSchools";
import kirinyagaEastSchools from "./data/kirinyagaEastSchools";
import kirinyagaWestSchools from "./data/kirinyagaWestSchools";
import mweaEastSchools from "./data/mweaEastSchools";
import mweaWestSchools from "./data/mweaWestSchools";
import gatangaSchools from "./data/gatangaSchools";
import ithangaKakuziSchools from "./data/ithangaKakuziSchools";
import kahuroSchools from "./data/kahuroSchools";
import kandaraSchools from "./data/kandaraSchools";
import kangemaSchools from "./data/kangemaSchools";
import kigumoSchools from "./data/kigumoSchools";
import kiharuSchools from "./data/kiharuSchools";
import mathioyaSchools from "./data/mathioyaSchools";
import murangaSouthSchools from "./data/murangaSouthSchools";
import manyattaSchools from "./data/manyattaSchools";
import runyenjesSchools from "./data/runyenjesSchools";
import mbeereNorthSchools from "./data/mbeereNorthSchools";
import mbeereSouthSchools from "./data/mbeereSouthSchools";
import imentiCentralSchools from "./data/imentiCentralSchools";
import imentiNorthSchools from "./data/imentiNorthSchools";
import imentiSouthSchools from "./data/imentiSouthSchools";
import tiganiaWestSchools from "./data/tiganiaWestSchools";
import tiganiaEastSchools from "./data/tiganiaEastSchools";
import igembesouthSchools from "./data/igembesouthSchools";
import igembecentralSchools from "./data/igembecentralSchools";
import igembeNorthSchools from "./data/igembeNorthSchools";
import buuriSchools from "./data/buuriSchools";
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
  "Tetu": tetuSchools,
  "Nyeri South": nyeriSouthSchools,
  "Mukurwe-ini": MukurweiniSchools,
  "Nyeri Central": nyeriCentralSchools,
};

const kirinyagaSubcountySchools = {
  "Kirinyaga Central": kirinyagaCentralSchools,
  "Kirinyaga East": kirinyagaEastSchools,
  "Kirinyaga West": kirinyagaWestSchools,
  "Mwea East": mweaEastSchools,
  "Mwea West": mweaWestSchools,
};

const murangaSubcountySchools = {
  "Gatanga": gatangaSchools,
  "Ithanga/Kakuzi": ithangaKakuziSchools,
  "Kahuro": kahuroSchools,
  "Kandara": kandaraSchools,
  "Kangema": kangemaSchools,
  "Kigumo": kigumoSchools,
  "Kiharu": kiharuSchools,
  "Mathioya": mathioyaSchools,
  "Murang'a South": murangaSouthSchools,
};

const embuSubcountySchools = {
  "Manyatta": manyattaSchools,
  "Runyenjes": runyenjesSchools,
  "Mbeere North": mbeereNorthSchools,
  "Mbeere South": mbeereSouthSchools,
};

const meruSubcountySchools = {
  "Imenti Central": imentiCentralSchools,
  "Imenti North": imentiNorthSchools,
  "Imenti South": imentiSouthSchools,
  "Tigania West": tiganiaWestSchools,
  "Tigania East": tiganiaEastSchools,
  "Igembe South": igemsouthSchools,
  "Igembe Central": igemsentralSchools,
  "Igembe North": igembeNorthSchools,
  "Buuri": buuriSchools,
};

const allSubcountySchools = {
  "Nyeri": nyeriSubcountySchools,
  "Kirinyaga": kirinyagaSubcountySchools,
  "Murang'a": murangaSubcountySchools,
  "Embu": embuSubcountySchools,
  "Meru": meruSubcountySchools,
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

const rankSchools = (
  schools,
  selectedCounties,
  selectedGender,
  pathwayScores,
  selectedAccommodation
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
  return scored;
};

const subjectPathwayMap = {
  "Mathematics": { stem: 4 },
  "Integrated Science": { stem: 4 },
  "Pre-Technical Studies": { stem: 3 },
  "Agriculture & Nutrition": { stem: 2 },
  "English": { social: 2 },
  "Kiswahili": { social: 2 },
  "Social Studies": { social: 4 },
  "CRE": { social: 3 },
  "French": { social: 2 },
  "German": { social: 2 },
  "Arabic": { social: 2 },
  "Creative Arts and Sports": { arts: 4 },
};

const careerPathwayMap = {
  "Doctor": { stem: 4 },
  "Engineer": { stem: 4 },
  "Software Developer": { stem: 4 },
  "Scientist": { stem: 4 },
  "Pilot": { stem: 3 },
  "Architect": { stem: 3 },
  "Nurse": { stem: 2 },
  "Lawyer": { social: 4 },
  "Journalist": { social: 3 },
  "Teacher": { social: 3 },
  "Entrepreneur": { social: 2 },
  "Accountant": { social: 3 },
  "Graphic Designer": { arts: 4 },
  "Musician": { arts: 4 },
  "Athlete": { arts: 4 },
};

const bandScore = (band) => {
  if (band.startsWith("EE1")) return 8;
  if (band.startsWith("EE2")) return 7;
  if (band.startsWith("ME1")) return 6;
  if (band.startsWith("ME2")) return 5;
  if (band.startsWith("AE1")) return 4;
  if (band.startsWith("AE2")) return 3;
  if (band.startsWith("BE1")) return 2;
  if (band.startsWith("BE2")) return 1;
  return 0;
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
  const [selectedSubcountyCounty, setSelectedSubcountyCounty] =
    useState("");
  const [selectedDisability, setSelectedDisability] =
    useState("");
  const [selectedCombination, setSelectedCombination] =
    useState("");
  const [combinationFeedback, setCombinationFeedback] =
    useState("");
  const [pathwayScores, setPathwayScores] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedAccommodation, setSelectedAccommodation] =
    useState("");

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
    if (selectedSubcountyCounty === county) {
      setSelectedSubcounty("");
      setSelectedSubcountyCounty("");
    }
  };

  const handleSubcountyChange = (value) => {
    if (!value) {
      setSelectedSubcounty("");
      setSelectedSubcountyCounty("");
      return;
    }
    const [county, subcounty] = value.split("::");
    setSelectedSubcounty(subcounty);
    setSelectedSubcountyCounty(county);
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
        combination.includes("music") ||
        combination.includes("sport"))
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

    const likedSubjects =
      answers["Which subjects do you enjoy most? (Select all that apply)"] || [];

    if (Array.isArray(likedSubjects)) {
      likedSubjects.forEach((subject) => {
        const mapping = subjectPathwayMap[subject];
        if (mapping) {
          if (mapping.stem) stemScore += mapping.stem;
          if (mapping.arts) artsScore += mapping.arts;
          if (mapping.social) socialScore += mapping.social;
        }
      });
      if (likedSubjects.length > 0) {
        reasons.push(
          `Your subject interests include: ${likedSubjects.join(", ")}.`
        );
      }
    }

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
      answers["Do you prefer practical or theoretical learning?"] === "Practical"
    ) {
      stemScore += 2;
      artsScore += 2;
    } else if (
      answers["Do you prefer practical or theoretical learning?"] === "Theoretical"
    ) {
      socialScore += 2;
    }

    const career =
      answers["Which careers interest you most?"];
    if (career && careerPathwayMap[career]) {
      const mapping = careerPathwayMap[career];
      if (mapping.stem) stemScore += mapping.stem;
      if (mapping.arts) artsScore += mapping.arts;
      if (mapping.social) socialScore += mapping.social;
      reasons.push(
        `Your interest in ${career} aligns with your recommended pathway.`
      );
    }

    Object.entries(performances).forEach(([subject, band]) => {
      const score = bandScore(band);
      const mapping = subjectPathwayMap[subject];
      if (mapping && score >= 6) {
        if (mapping.stem) {
          stemScore += score;
          reasons.push(
            `Strong performance in ${subject} supports STEM.`
          );
        }
        if (mapping.arts) {
          artsScore += score;
          reasons.push(
            `Strong performance in ${subject} supports Arts & Sports Science.`
          );
        }
        if (mapping.social) {
          socialScore += score;
          reasons.push(
            `Strong performance in ${subject} supports Social Sciences.`
          );
        }
      } else if (mapping && score <= 3) {
        if (mapping.stem) stemScore -= 2;
        if (mapping.arts) artsScore -= 1;
        if (mapping.social) socialScore -= 1;
      }
    });

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
  };

  const getSubcountySchools = () => {
    if (!selectedSubcounty || !selectedSubcountyCounty)
      return [];
    const countyMap =
      allSubcountySchools[selectedSubcountyCounty] || {};
    return countyMap[selectedSubcounty] || [];
  };

  const subcountySchools = getSubcountySchools();

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
    ? selectedCounties.flatMap((county) => {
        const countyMap = allSubcountySchools[county] || {};
        return Object.values(countyMap)
          .flat()
          .filter(
            (school) =>
              school.category === "C2" && baseFilter(school)
          );
      })
    : [];

  const c3Candidates = recommendedPathway
    ? subcountySchools.filter(
        (school) =>
          school.category === "C3" && baseFilter(school)
      )
    : [];

  const c4Candidates = recommendedPathway
    ? subcountySchools.filter(
        (school) =>
          school.category === "C4" && baseFilter(school)
      )
    : [];

  const c1Schools = rankSchools(
    c1Candidates, selectedCounties, selectedGender,
    pathwayScores, selectedAccommodation
  );
  const c2Schools = rankSchools(
    c2Candidates, selectedCounties, selectedGender,
    pathwayScores, selectedAccommodation
  );
  const c3Schools = rankSchools(
    c3Candidates, selectedCounties, selectedGender,
    pathwayScores, selectedAccommodation
  );
  const c4Schools = rankSchools(
    c4Candidates, selectedCounties, selectedGender,
    pathwayScores, selectedAccommodation
  );

  return (
    <div className="container">
      <section className="hero">

        {/* LOGO */}
        <img
          src="https://raw.githubusercontent.com/77joses/SwiftPath-/main/file_00000000d5d071fb9329dd2c6c6ce7fe.png"
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
          <h2 style={{ marginTop: "10px" }}>
            Welcome to SwiftPath
          </h2>
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
            selectedSubcounty={selectedSubcounty}
            onAddCounty={handleAddCounty}
            onRemoveCounty={handleRemoveCounty}
            onSubcountyChange={handleSubcountyChange}
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
                <p
                  key={index}
                  style={{ marginTop: "10px" }}
                >
                  {index + 1}. {item.pathway} (
                  {item.score} points)
                </p>
              ))}
            </div>
            <div style={{ marginTop: "30px" }}>
              <h3>Subject Combination Analysis</h3>
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

        {/* SCHOOL RECOMMENDATIONS */}
        {recommendedPathway && (
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
