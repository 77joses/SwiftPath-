import { useState } from "react";

export default function QuestionCard({
  question,
  type,
  options,
  onAnswer,
}) {
  const [selected, setSelected] = useState(null);
  const [multiSelected, setMultiSelected] = useState([]);

  const handleYesNo = (answer) => {
    setSelected(answer);
    onAnswer(answer);
  };

  const handleMultiSelect = (option) => {
    const updated = multiSelected.includes(option)
      ? multiSelected.filter((o) => o !== option)
      : [...multiSelected, option];
    setMultiSelected(updated);
    onAnswer(updated);
  };

  return (
    <div
      style={{
        background: "#10213d",
        padding: "25px",
        borderRadius: "18px",
        marginTop: "20px",
        width: "100%",
        maxWidth: "700px",
      }}
    >
      <h3>{question}</h3>

      {/* YES/NO — white by default, blue when tapped */}
      {type === "yesno" && (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "12px",
          }}
        >
          <button
            onClick={() => handleYesNo("Yes")}
            style={{
              padding: "12px 28px",
              borderRadius: "12px",
              border: "2px solid white",
              background: selected === "Yes"
                ? "#0b63f6"
                : "white",
              color: selected === "Yes"
                ? "white"
                : "#10213d",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Yes
          </button>

          <button
            onClick={() => handleYesNo("No")}
            style={{
              padding: "12px 28px",
              borderRadius: "12px",
              border: "2px solid white",
              background: selected === "No"
                ? "#0b63f6"
                : "white",
              color: selected === "No"
                ? "white"
                : "#10213d",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            No
          </button>
        </div>
      )}

      {/* MULTI-SELECT — tap to toggle, blue when selected */}
      {type === "multiselect" && (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleMultiSelect(option)}
              style={{
                padding: "10px 18px",
                borderRadius: "12px",
                border: "2px solid white",
                background: multiSelected.includes(option)
                  ? "#0b63f6"
                  : "white",
                color: multiSelected.includes(option)
                  ? "white"
                  : "#10213d",
                fontWeight: "bold",
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {/* SINGLE SELECT dropdown */}
      {type === "select" && (
        <select
          onChange={(e) => onAnswer(e.target.value)}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "none",
            fontSize: "1rem",
          }}
        >
          <option>Select option</option>
          {options.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </select>
      )}
    </div>
  );
}
