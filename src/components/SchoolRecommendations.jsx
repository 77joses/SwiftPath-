export default function SchoolRecommendations({
  schools
}) {

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
            Pathway: {school.pathway}
          </p>
        </div>
      ))}

    </div>
  );
}
