export default function SchoolFilter({
  counties,
  subcounties,
  onCountyChange,
  onSubcountyChange,
  onCategoryChange,
  onDisabilityChange,
  onGenderChange,
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

      <select
        onChange={(e) => onCountyChange(e.target.value)}
        style={{
          marginTop: "15px",
          width: "100%",
          padding: "14px",
          borderRadius: "12px",
          border: "none",
          fontSize: "1rem",
        }}
      >
        <option value="">Select county</option>
        {counties.map((county, index) => (
          <option key={index} value={county}>
            {county}
          </option>
        ))}
      </select>

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
