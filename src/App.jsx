import { useState } from "react";

import kieniWestSchools from "./data/kieniWestSchools";
import kieniEastSchools from "./data/kieniEastSchools";
import mathiraSchools from "./data/mathiraSchools";
import tetuSchools from "./data/tetuSchools";
import othayaSchools from "./data/othayaSchools";
import mukurweiniSchools from "./data/mukurweiniSchools";
import nyeriCentralSchools from "./data/nyeriCentralSchools";

import mountKenyaC2Schools from "./data/mountKenyaC2Schools";
import c1SchoolsKenya from "./data/c1SchoolsKenya";

function App() {
  const [selectedPathway, setSelectedPathway] =
    useState("");

  const [selectedSubcounty, setSelectedSubcounty] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("");

  const nyeriSubcountySchools = {
    "Kieni West": kieniWestSchools,

    "Kieni East": kieniEastSchools,

    Mathira: mathiraSchools,

    Tetu: tetuSchools,

    Othaya: othayaSchools,

    "Mukurwe-ini": mukurweiniSchools,

    "Nyeri Central": nyeriCentralSchools,
  };

  let recommendedSchools = [];

  const selectedSubcountySchools =
    nyeriSubcountySchools[
      selectedSubcounty
    ] || [];

  const pathwayMatchedSchools =
    selectedSubcountySchools.filter(
      (school) =>
        school.pathways.includes(
          selectedPathway
        )
    );

  recommendedSchools = [
    ...pathwayMatchedSchools,
  ];

  if (selectedCategory === "C1") {
    recommendedSchools = [
      ...c1SchoolsKenya,
    ];
  }

  if (selectedCategory === "C2") {
    recommendedSchools = [
      ...pathwayMatchedSchools,
      ...mountKenyaC2Schools,
    ];
  }

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
        backgroundColor: "#f4f7fb",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          color: "#1e3a8a",
          marginBottom: "30px",
        }}
      >
        SwiftPath — Pathways to Success
      </h1>

      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "25px",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2>Select Pathway</h2>

        <select
          value={selectedPathway}
          onChange={(e) =>
            setSelectedPathway(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        >
          <option value="">
            Choose pathway
          </option>

          <option value="STEM">
            STEM
          </option>

          <option value="Social Sciences">
            Social Sciences
          </option>

          <option value="Arts & Sports Science">
            Arts & Sports Science
          </option>
        </select>

        <h2>Select Subcounty</h2>

        <select
          value={selectedSubcounty}
          onChange={(e) =>
            setSelectedSubcounty(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        >
          <option value="">
            Choose subcounty
          </option>

          <option value="Kieni West">
            Kieni West
          </option>

          <option value="Kieni East">
            Kieni East
          </option>

          <option value="Mathira">
            Mathira
          </option>

          <option value="Tetu">
            Tetu
          </option>

          <option value="Othaya">
            Othaya
          </option>

          <option value="Mukurwe-ini">
            Mukurwe-ini
          </option>

          <option value="Nyeri Central">
            Nyeri Central
          </option>
        </select>

        <h2>Select School Category</h2>

        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
          }}
        >
          <option value="">
            Choose category
          </option>

          <option value="C1">
            C1 National Schools
          </option>

          <option value="C2">
            C2 Extra County Schools
          </option>

          <option value="C3">
            C3 County Schools
          </option>

          <option value="C4">
            C4 Subcounty Schools
          </option>
        </select>
      </div>

      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          Recommended Schools
        </h2>

        {recommendedSchools.length ===
        0 ? (
          <p>
            Select pathway, subcounty,
            and category to see school
            recommendations.
          </p>
        ) : (
          recommendedSchools.map(
            (school, index) => (
              <div
                key={index}
                style={{
                  border:
                    "1px solid #ccc",
                  borderRadius: "10px",
                  padding: "15px",
                  marginBottom: "15px",
                  backgroundColor:
                    "#f9f9f9",
                }}
              >
                <h3>{school.name}</h3>

                <p>
                  <strong>
                    County:
                  </strong>{" "}
                  {school.county}
                </p>

                <p>
                  <strong>
                    Category:
                  </strong>{" "}
                  {school.category}
                </p>

                <p>
                  <strong>
                    Gender:
                  </strong>{" "}
                  {school.gender}
                </p>

                <p>
                  <strong>
                    Accommodation:
                  </strong>{" "}
                  {
                    school.accommodation
                  }
                </p>

                <p>
                  <strong>
                    Pathways:
                  </strong>{" "}
                  {school.pathways?.join(
                    ", "
                  )}
                </p>

                {school.tracks && (
                  <p>
                    <strong>
                      Tracks:
                    </strong>{" "}
                    {school.tracks.join(
                      ", "
                    )}
                  </p>
                )}
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}

export default App;
