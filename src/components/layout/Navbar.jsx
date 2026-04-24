const NAVIGATION_ITEMS = ["Home", "Recipes", "Blog", "About", "Contact"];

function Navbar() {
  return (
    <nav>
      <h3 className="logo">Le Santos Diner</h3>

      {/* Keeping the links in an array makes this list easier to scan and update. */}
      <ul>
        {NAVIGATION_ITEMS.map((itemName) => (
          <li key={itemName}>{itemName}</li>
        ))}
      </ul>

      <button
        className="mainBtn"
        style={{
          color: "#1b1b18",
          backgroundColor: "transparent",
          border: "1px solid #1b1b18",
        }}
      >
        Reserve
      </button>
    </nav>
  );
}

export default Navbar;
