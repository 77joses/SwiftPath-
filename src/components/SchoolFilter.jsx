export default function SchoolFilter({
  counties,
  onCountyChange
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
        Select County Preference
      </h3>

      <select
        onChange={(e) =>
          onCountyChange(e.target.value)
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
        <option>Select county</option>

        {counties.map((county, index) => (
          <option key={index}>
            {county}
          </option>
        ))}
      </select>
    </div>
  );
}
