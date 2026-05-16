export default function PathwayCard({ name, description }) {
  return (
    <div
      style={{
        background: "#10213d",
        padding: "25px",
        borderRadius: "18px",
        marginTop: "20px",
        width: "100%",
        maxWidth: "500px",
      }}
    >
      <h2>{name}</h2>

      <p
        style={{
          marginTop: "10px",
          opacity: 0.8,
          lineHeight: "1.7",
        }}
      >
        {description}
      </p>
    </div>
  );
}
