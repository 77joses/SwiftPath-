export default function SchoolFilter({
  counties,
  subcounties,
  selectedCounties,
  onAddCounty,
  onRemoveCounty,
  onSubcountyChange,
  onCategoryChange,
  onDisabilityChange,
  onGenderChange,
  onAccommodationChange,
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

      <h3>Select Your Gender</h3>

      <select
        onChange={(e) => onGenderChange(e.target.value)}
        style={{
          marginTop: "15px",
          width: "100%",
          padding: "14px",
          borderRadius: "12px",
          border: "none",
          fontSize: "1rem",
        }}
      >
        <option value="">Select gender</option>
        <option value="Boys">Boy</option>
        <option value="Girls">Girl</option>
      </select>

      <h3 style={{ marginTop: "30px" }}>
        Accommodation Preference
      </h3>

      <select
        onChange={(e) => onAccommodationChange(e.target.value)}
        style={{
          marginTop: "15px",
          width: "100%",
          padding: "14px",
          borderRadius: "12px",
          border: "none",
          fontSize: "1rem",
        }}
      >
        <option value="">Select accommodation</option>
        <option value="Boarding">Boarding</option>
        <option value="Day">Day</option>
      </select>

      <h3 style={{ marginTop: "30px" }}>
        Select School Category
      </h3>

      <select
        onChange={(e) => onCategoryChange(e.target.value)}
        style={{
          marginTop: "15px",
          width: "100%",
          padding: "14px",
          borderRadius: "12px",
          border: "none",
          fontSize: "1rem",
        }}
      >
        <option value="">Select category</option>
        <option value="C1">C1</option>
        <option value="C2">C2</option>
        <option value="C3">C3</option>
        <option value="C4">C4</option>
      </select>

      <h3 style={{ marginTop: "30px" }}>
        Select County Preference
      </h3>

      <p
        style={{
          marginTop: "8px",
          opacity: 0.7,
          fontSize: "0.9rem",
        }}
      >
        Add up to 3 counties in order of preference.
        First added = highest priority.
      </p>

      {/* Selected counties display */}
      {selectedCounties.length > 0 && (
        <div style={{ marginTop: "15px" }}>
          {selectedCounties.map((county, index) => (
            <div
              key={county}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#0b63f6",
                padding: "10px 16px",
                borderRadius: "10px",
                marginTop: "8px",
              }}
            >
              <span>
                {index + 1}. {county}
              </span>
              <button
                onClick={() => onRemoveCounty(county)}
                style={{
                  background: "transparent",
                  border: "1px solid white",
                  color: "white",
                  borderRadius: "8px",
                  padding: "4px 10px",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* County selector — hidden when 3 already selected */}
      {selectedCounties.length < 3 && (
        <select
          onChange={(e) => {
            onAddCounty(e.target.value);
            e.target.value = "";
          }}
          style={{
            marginTop: "15px",
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "none",
            fontSize: "1rem",
          }}
        >
          <option value="">
            {selectedCounties.length === 0
              ? "Select 1st county"
              : selectedCounties.length === 1
              ? "Select 2nd county (optional)"
              : "Select 3rd county (optional)"}
          </option>
          {counties
            .filter((c) => !selectedCounties.includes(c))
            .map((county, index) => (
              <option key={index} value={county}>
                {county}
              </option>
            ))}
        </select>
      )}

      <h3 style={{ marginTop: "30px" }}>
        Select Subcounty
      </h3>

      <select
        onChange={(e) => onSubcountyChange(e.target.value)}
        style={{
          marginTop: "15px",
          width: "100%",
          padding: "14px",
          borderRadius: "12px",
          border: "none",
          fontSize: "1rem",
        }}
      >
        <option value="">Select subcounty</option>
        {subcounties.map((subcounty, index) => (
          <option key={index} value={subcounty}>
            {subcounty}
          </option>
        ))}
      </select>

      <h3 style={{ marginTop: "30px" }}>
        Disability Support
      </h3>

      <select
        onChange={(e) => onDisabilityChange(e.target.value)}
        style={{
          marginTop: "15px",
          width: "100%",
          padding: "14px",
          borderRadius: "12px",
          border: "none",
          fontSize: "1rem",
        }}
      >
        <option value="">Select support need</option>
        <option value="None">None</option>
        <option value="Visual Impairment">Visual Impairment</option>
        <option value="Hearing Impairment">Hearing Impairment</option>
        <option value="Physical Disability">Physical Disability</option>
        <option value="Learning Support">Learning Support</option>
      </select>

    </div>
  );
}
