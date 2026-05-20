export default function CombinationSelector({
  combinations,
  onCombinationChange
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
      <h3>
        Select subject combination of interest
      </h3>

      <select
        onChange={(e) =>
          onCombinationChange(e.target.value)
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
        <option value="">Select combination</option>

        {combinations.map((combination, index) => (
          <option key={index} value={combination}>
            {combination}
          </option>
        ))}
      </select>
    </div>
  );
}
