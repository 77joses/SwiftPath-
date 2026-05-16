export default function QuestionCard({ question }) {
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

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <button className="primary">Yes</button>
        <button className="secondary">No</button>
      </div>
    </div>
  );
}
