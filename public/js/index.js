let games;

const build_games = () => {
  const container = $("#gm-cont");

  games.map((gm) => {
    const button = $("<button>");
    button.text(gm.name);
    button.attr({
      class: "gm-button",
    });
    button.on("click", () => {
      sessionStorage.setItem("base", gm.url);
      window.location.href = gm.url;
    });
    container.append(button);
  });

  //  const button = $("<button>");

  //  container.append(button)
};

(async () => {
  games = (await axios.get("/games")).data;
  build_games();
})();
