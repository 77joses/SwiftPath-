const categoryLabels = {
  C1: "C1 — National Schools",
  C2: "C2 — Extra County Schools",
  C3: "C3 — County Schools",
  C4: "C4 — Sub-County Schools",
};

const categoryColors = {
  C1: "#0b63f6",
  C2: "#4a9d6f",
  C3: "#c47f17",
  C4: "#7b4fa6",
};

function SchoolCard({ school, index }) {
  return (
    <div
      style={{
        background: "#10213d",
        padding: "20px",
        borderRadius: "16px",
        marginTop: "12px",
        borderLeft: `4px solid ${
          index === 0 ? "#ffffff" : "#334"
        }`,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ fontSize: "1rem" }}>
          {school.name}
        </h3>
        <span
          style={{
            background: index === 0 ? "#0b63f6" : "#223",
            padding: "3px 9px",
            borderRadius: "8px",
            fontSize: "0.78rem",
          }}
        >
          #{index + 1}
        </span>
      </div>

      <p style={{ marginTop: "8px", fontSize: "0.9rem" }}>
        County: {school.county}
      </p>

      <p style={{ marginTop: "4px", fontSize: "0.9rem" }}>
        Gender: {school.gender}
      </p>

      <p style={{ marginTop: "4px", fontSize: "0.9rem" }}>
        Accommodation: {school.accommodation}
      </p>

      <p style={{ marginTop: "4px", fontSize: "0.9rem" }}>
        Pathways: {school.pathways?.join(", ")}
      </p>
    </div>
  );
}

function CategoryGroup({ category, schools }) {
  const color = categoryColors[category];
  const label = categoryLabels[category];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "700px",
        marginTop: "40px",
      }}
    >
      <div
        style={{
          background: color,
          padding: "14px 20px",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0 }}>{label}</h3>
        <span
          style={{
            background: "rgba(0,0,0,0.2)",
            padding: "3px 10px",
            borderRadius: "8px",
            fontSize: "0.85rem",
          }}
        >
          {schools.length}{" "}
          {schools.length === 1 ? "school" : "schools"}
        </span>
      </div>

      {schools.length === 0 ? (
        <div
          style={{
            background: "#10213d",
            padding: "16px 20px",
            borderRadius: "12px",
            marginTop: "12px",
            opacity: 0.7,
            fontSize: "0.9rem",
          }}
        >
          {category === "C4"
            ? "C4 schools offer STEM only. No match for your current recommendation."
            : "No schools found for your current filters in this category."}
        </div>
      ) : (
        schools.map((school, index) => (
          <SchoolCard
            key={index}
            school={school}
            index={index}
          />
        ))
      )}
    </div>
  );
}

export default function SchoolRecommendations({
  c1Schools,
  c2Schools,
  c3Schools,
  c4Schools,
}) {

  const total =
    c1Schools.length +
    c2Schools.length +
    c3Schools.length +
    c4Schools.length;

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <p
        style={{
          opacity: 0.7,
          fontSize: "0.9rem",
          marginBottom: "10px",
        }}
      >
        {total > 0
          ? `Showing ${total} best matching schools across all categories.`
          : "No schools found. Try adjusting your filters."}
      </p>

      <CategoryGroup category="C1" schools={c1Schools} />
      <CategoryGroup category="C2" schools={c2Schools} />
      <CategoryGroup category="C3" schools={c3Schools} />
      <CategoryGroup category="C4" schools={c4Schools} />

    </div>
  );
}
