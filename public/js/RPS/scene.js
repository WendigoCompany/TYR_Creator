const container = $("#scene-frag");
const base = "/RPS/scenes/";
const params = {};
params.base = window.location.pathname.replace(base, "").split("/");
params.waifu = params.base[0];
params.scene_id = params.base[1];
let scene_data = { base: [] };

// modal_fragment('${JSON.stringify(data)}', '${id}')

const handleChange = (e, data) => {
  data = JSON.parse(data);

  modal_fragment(data, e.value);
};

const modal_data = (id, data = {}) => {
  switch (id) {
    case "type":
      const types = ["basic", "select"];
      let types_txt = `<option selected value="" disabled>Select a option</option>`;
      types.map(
        (ty) =>
          (types_txt += `<option value='${ty}'>${ty.toUpperCase()}</option>`)
      );
      return `
            <div class="" id="">
                <h3 class="" id="">Scene Type</h3>
                <button>asdas</button>
                <select onchange="handleChange(this , '${JSON.stringify(
                  data
                )}')" name="" id="" class="">
                ${types_txt}
                </select>
            </div>
            `;

            case "select":
              return `<h3>SELECTO</h3>`
            case "basic":
              return `<h3>BASICO</h3>`

    default:
      break;
  }
};

const modal_fragment = (base_data = {}, modal_id = "type") => {
  if (typeof base_data == "string") {
    base_data = JSON.parse(base_data);
  }

  console.log(base_data);
  Swal.fire({
    title: "SCENE",
    html: modal_data(modal_id, base_data),
    allowOutsideClick: false,
    showConfirmButton: true,
    showCancelButton: true,

    customClass: {
      title: "txt-sw2",
      htmlContainer: "basic-label",
      popup: `pop-sw2 pop-sw2-girls`,
      confirmButton: "btn-sw2-confirm",
      cancelButton: "btn-sw2-cancel",
    },
  });
};

const build_scene_data = () => {
  const container = $("#scene-frag");

  scene_data.base.map((g) => {
    const btn = $("<button>")
      .attr({ class: "gm-button-add" })
      .text(g)
      .css({ width: "auto" })
      .on("click", () => {});

    container.append(btn);
  });

  const btn = $("<button>")
    .attr({ class: "gm-button-add" })

    .text("+")
    .on("click", () => {
      modal_fragment();
    });

  container.append(btn);
};

(async () => {
  const response = await axios.post(
    sessionStorage.getItem("base") +
      "/scenes/" +
      params.waifu +
      "/" +
      params.scene_id
  );
  scene_data.base = response.data.en;
  build_scene_data();
})();
