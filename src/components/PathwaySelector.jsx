export default function PathwaySelector({
  pathways
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
        Which pathways are you most interested in?
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
        <option>Select pathway</option>

        {pathways.map((pathway, index) => (
          <option key={index}>
            {pathway}
          </option>
        ))}
      </select>
    </div>
  );
}
