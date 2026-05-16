import performanceBands from "../data/performanceBands";

export default function PerformanceCard({
  subject,
  onPerformanceChange
}) {

  return (
    <div
      style={{
        background: "#10213d",
        padding: "20px",
        borderRadius: "16px",
        marginTop: "16px",
        width: "100%",
        maxWidth: "700px",
      }}
    >
      <h3>{subject}</h3>

      <select
        onChange={(e) =>
          onPerformanceChange(
            subject,
            e.target.value
          )
        }
        style={{
          marginTop: "15px",
          width: "100%",
          padding: "14px",
          borderRadius: "12px",
          border: "none",
          fontSize: "1rem",
        }}
      >
        <option>
          Select performance band
        </option>

        {performanceBands.map((band, index) => (
          <option key={index}>
            {band}
          </option>
        ))}
      </select>
    </div>
  );
}
