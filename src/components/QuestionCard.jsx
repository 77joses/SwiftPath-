export default function QuestionCard({
  question,
  type,
  options,
  onAnswer
}) {

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

      {type === "yesno" && (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "12px",
          }}
        >
          <button
            className="primary"
            onClick={() => onAnswer("Yes")}
          >
            Yes
          </button>

          <button
            className="secondary"
            onClick={() => onAnswer("No")}
          >
            No
          </button>
        </div>
      )}

      {type === "select" && (
        <select
          onChange={(e) =>
            onAnswer(e.target.value)
          }
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
            <option key={index}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
