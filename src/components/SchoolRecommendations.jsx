export default function SchoolRecommendations({
  schools,
  selectedCategory
}) {

  if (schools.length === 0 && selectedCategory === "C4") {
    return (
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          marginTop: "30px",
          background: "#10213d",
          padding: "20px",
          borderRadius: "16px",
        }}
      >
        <p
          style={{
            lineHeight: "1.7",
            opacity: 0.9,
          }}
        >
          C4 sub-county schools offer the <strong>STEM pathway only</strong>.
          Your current recommendation does not match STEM.
          To see C4 schools, please answer questions that lead to a STEM
          recommendation, or select a different school category.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "700px",
        marginTop: "30px",
      }}
    >

      {schools.map((school, index) => (
        <div
          key={index}
          style={{
            background: "#10213d",
            padding: "20px",
            borderRadius: "16px",
            marginTop: "15px",
          }}
        >

          <h3>{school.name}</h3>

          <p style={{ marginTop: "10px" }}>
            County: {school.county}
          </p>

          <p style={{ marginTop: "6px" }}>
            Category: {school.category}
          </p>

          <p style={{ marginTop: "6px" }}>
            Pathways: {school.pathways?.join(", ")}
          </p>

        </div>
      ))}

    </div>
  );
}
