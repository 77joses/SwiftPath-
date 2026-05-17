export default function SchoolFilter({
  counties,
  subcounties,
  onCountyChange,
  onSubcountyChange,
  onCategoryChange,
  onDisabilityChange
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
        Select School Category
      </h3>

      <select
        onChange={(e) =>
          onCategoryChange(e.target.value)
        }
        style={{
          marginTop: "15px",
          width: "100%",
          padding: "14px",
          borderRadius: "12px",
          border: "none",
          fontSize: "1rem",
        }}
      >
        <option>Select category</option>

        <option>C1</option>
        <option>C2</option>
        <option>C3</option>
        <option>C4</option>

      </select>

      <h3 style={{ marginTop: "30px" }}>
        Select County Preference
      </h3>

      <select
        onChange={(e) =>
          onCountyChange(e.target.value)
        }
        style={{
          marginTop: "15px",
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

      <h3 style={{ marginTop: "30px" }}>
        Select Subcounty
      </h3>

      <select
        onChange={(e) =>
          onSubcountyChange(e.target.value)
        }
        style={{
          marginTop: "15px",
          width: "100%",
          padding: "14px",
          borderRadius: "12px",
          border: "none",
          fontSize: "1rem",
        }}
      >
        <option>Select subcounty</option>

        {subcounties.map(
          (subcounty, index) => (
            <option key={index}>
              {subcounty}
            </option>
          )
        )}

      </select>

      <h3 style={{ marginTop: "30px" }}>
        Disability Support
      </h3>

      <select
        onChange={(e) =>
          onDisabilityChange(
            e.target.value
          )
        }
        style={{
          marginTop: "15px",
          width: "100%",
          padding: "14px",
          borderRadius: "12px",
          border: "none",
          fontSize: "1rem",
        }}
      >
        <option>
          Select support need
        </option>

        <option>None</option>
        <option>Visual Impairment</option>
        <option>Hearing Impairment</option>
        <option>Physical Disability</option>
        <option>Learning Support</option>

      </select>

    </div>
  );
}
