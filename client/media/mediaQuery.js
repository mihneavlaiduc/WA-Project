export const mediaQuery = () => {
  document.addEventListener("DOMContentLoaded", () => {
    let resizer = new ResizeObserver(handleResize);
    resizer.observe(document.getElementById("main-body"));
  });
  const handleResize = (entries) => {
    if (entries[0].contentRect.width <= 1024) {
        document.getElementById("add-member-container").style.display = "none";
        document.getElementById("edit-member-container").style.display = "none";
        document.getElementById("add-member-container-1024").style.display = "block";
        document.getElementById("edit-member-container-1024").style.display = "none";

        const backButton = document.getElementById("back-button-1024");
        
        backButton.addEventListener("click", () => {
          document.getElementById("edit-member-container-1024").style.display =
            "none";
          document.getElementById("add-member-container-1024").style.display =
            "block";
        });
    } else {
      document.getElementById("add-member-container").style.display = "block";
      document.getElementById("edit-member-container").style.display = "block";
      document.getElementById("add-member-container-1024").style.display = "none";
      document.getElementById("edit-member-container-1024").style.display = "none";
    }
  };
};
