import pathways from "./data/pathways";
import PathwayCard from "./components/PathwayCard";

export default function App() {
  return (
    <div className="container">

      <section className="hero">

        <h1>SwiftPath</h1>

        <p>
          Discover the pathway built for your future.
          SwiftPath helps CBC learners explore pathways,
          subjects, schools, and careers through intelligent guidance.
        </p>

        <div className="buttons">
          <button className="primary">
            Start Analysis
          </button>

          <button className="secondary">
            Explore Pathways
          </button>
        </div>

        <div
          style={{
            marginTop: "60px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {pathways.map((pathway) => (
            <PathwayCard
              key={pathway.id}
              name={pathway.name}
              description={pathway.description}
            />
          ))}
        </div>

      </section>

    </div>
  );
}
