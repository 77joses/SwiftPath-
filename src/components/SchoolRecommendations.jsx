export default function SchoolRecommendations({
  schools,
  selectedCategory,
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
        <p style={{ lineHeight: "1.7", opacity: 0.9 }}>
          C4 sub-county schools offer the{" "}
          <strong>STEM pathway only</strong>. Your current
          recommendation does not match STEM. To see C4 schools,
          please answer questions that lead to a STEM
          recommendation, or select a different school category.
        </p>
      </div>
    );
  }

  if (schools.length === 0) {
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
        <p style={{ lineHeight: "1.7", opacity: 0.9 }}>
          No schools found matching your selections.
          Try adjusting your county, category, or gender filters.
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

      <p
        style={{
          opacity: 0.7,
          fontSize: "0.9rem",
          marginBottom: "10px",
        }}
      >
        Showing {schools.length} best matching{" "}
        {schools.length === 1 ? "school" : "schools"} for you.
      </p>

      {schools.map((school, index) => (
        <div
          key={index}
          style={{
            background: "#10213d",
            padding: "20px",
            borderRadius: "16px",
            marginTop: "15px",
            borderLeft: index === 0
              ? "4px solid #0b63f6"
              : index === 1
              ? "4px solid #4a9d6f"
              : "4px solid #555",
          }}
        >

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3>{school.name}</h3>
            <span
              style={{
                background: index === 0
                  ? "#0b63f6"
                  : index === 1
                  ? "#4a9d6f"
                  : "#333",
                padding: "4px 10px",
                borderRadius: "8px",
                fontSize: "0.8rem",
              }}
            >
              #{index + 1}
            </span>
          </div>

          <p style={{ marginTop: "10px" }}>
            County: {school.county}
          </p>

          <p style={{ marginTop: "6px" }}>
            Category: {school.category}
          </p>

          <p style={{ marginTop: "6px" }}>
            Gender: {school.gender}
          </p>

          <p style={{ marginTop: "6px" }}>
            Accommodation: {school.accommodation}
          </p>

          <p style={{ marginTop: "6px" }}>
            Pathways: {school.pathways?.join(", ")}
          </p>

        </div>
      ))}

    </div>
  );
}
