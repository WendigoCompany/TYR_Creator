let waifus = [];

const build_waifus = () => {
  const container = $("#girl-cont");

  waifus.map((g) => {
    const btn = $("<button>")
      .attr({ class: "gm-button-add" })
      .text(g)
      .css({ width: "auto" })
      .on("click", () => {
        window.location.href = sessionStorage.getItem("base") + "/scenes/" + g;
      });

      container.append(btn)
      
  });



};

(async () => {
  const response = await axios.post(sessionStorage.getItem("base") + "/scenes");
  waifus = response.data.girls;
  build_waifus()
})();
