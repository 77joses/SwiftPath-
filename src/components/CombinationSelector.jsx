export default function CombinationSelector({
  combinations
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
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "14px",
          borderRadius: "12px",
          border: "none",
          fontSize: "1rem",
        }}
      >
        <option>Select combination</option>

        {combinations.map((combination, index) => (
          <option key={index}>
            {combination}
          </option>
        ))}
      </select>
    </div>
  );
}
