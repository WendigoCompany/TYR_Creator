const base = "/RPS/scenes/";
let scene;
let id = 0;
const build_scene = () => {
  const container = $("#scene-cont");
  let params = {};
  params.waifu = window.location.pathname.replace(base, "");

  scene.map((g) => {
    g = g.replace("scene_", "");
    const btn = $("<button>")
      .attr({ class: "gm-button-add" })
      .text(g)
      .on("click", () => {
        // window.location.href = sessionStorage.getItem("base") + "/scenes/" + g;
        window.location.href =
          sessionStorage.getItem("base") + "/scenes/" + params.waifu + "/" + g;
      });

    container.append(btn);
  });

  for (let index = 0; index < scene.length; index++) {
    let g = scene[i].replace("scene_", "");
    if (parseInt(g) > id) {
      id = parseInt(g);
    }
  }

  const btn = $("<button>")
    .attr({ class: "gm-button-add" })

    .text("+")
    .on("click", () => {
      window.location.href =
        sessionStorage.getItem("base") + "/scenes/" + params.waifu + "/" + id;
    });

  container.append(btn);
};

(async () => {
  const waifu = window.location.pathname.replace(base, "");
  const response = await axios.post(
    sessionStorage.getItem("base") + "/scenes/" + waifu
  );
  scene = response.data.scenes;

  build_scene();
})();
