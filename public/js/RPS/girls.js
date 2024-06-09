let girls;
const build_girls = () => {
  const container = $("#girl-cont");

  // gm-button
  girls.map((g) => {});

  const btn = $("<button>")
    .attr({ class: "gm-button-add" })
    .text("+")
    .on("click", () => {
      Swal.fire({
        title: "NEW GIRL",
        html: `
         <div>
      <table class="text-center w-100">
        <tr>
          <td>
            <label class="gm-lb" for="">NAME</label> <br />
            <input type="text" class="gm-inp" name="name" class="input-pop" />
          </td>
          <td>
            <label class="gm-lb" for="">SHORT NAME</label> <br />
            <input type="text" class="gm-inp" name="s_name" class="input-pop" />
          </td>
        </tr>
        <tr>
          <td>
            <label class="gm-lb" for="">CRE MODEL</label> <br />
            <input type="text" class="gm-inp" name="c_model" class="input-pop" />
          </td>
          <td>
            <label class="gm-lb" for="">LINK CRE</label> <br />
            <input type="text" class="gm-inp" name="l_model" class="input-pop" />
          </td>
        </tr>
        <tr>
          <td>
            <label class="gm-lb" for="">ROOT FOLDER</label> <br />
            <input type="text" class="gm-inp" name="root" class="input-pop" />
          </td>
          <td>
            <label class="gm-lb" for="">IMG LOBY</label> <br />
            <input type="text" class="gm-inp" name="imgs" class="input-pop" />
          </td>
        </tr>
      </table>
       <br />
       <div> <button id="preview" class="btn btn-info gm-btn-sw2">PREVIEW</button></div>
    </div>
        
        `,
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
      }).then((resp) => {
        if (resp.isConfirmed) {
          const data = {
            name: document.getElementsByName("name")[0].value,
            s_name: document.getElementsByName("s_name")[0].value,
            c_model: document.getElementsByName("c_model")[0].value,
            l_model: document.getElementsByName("l_model")[0].value,
            root: document.getElementsByName("root")[0].value,
            imgs: document.getElementsByName("imgs")[0].value,
          };

          //  axios.post( sessionStorage.getItem("base")+ "/girls/catch" , data).then(re => {

          //  })
        }
      });

      document.getElementById("preview").onclick = () => {
        const data = EXTRACT_DATA(
          ["name", "s_name", "c_model", "l_model", "root", "imgs"],
          "name"
        );
        // = {
        //   name: document.getElementsByName("name")[0].value,
        //   s_name: document.getElementsByName("s_name")[0].value,
        //   c_model: document.getElementsByName("c_model")[0].value,
        //   l_model: document.getElementsByName("l_model")[0].value,
        //   root: document.getElementsByName("root")[0].value,
        //   imgs: document.getElementsByName("imgs")[0].value,
        // };
        sessionStorage.setItem("girl", JSON.stringify(data))

        window.open(
          sessionStorage.getItem("base") + "/girls/preview",
          "_blank"
        );

        // axios
        //   .post(sessionStorage.getItem("base") + "/girls/catch", data)
        //   .then((re) => {
        //     window.open(
        //       sessionStorage.getItem("base") + "/girls/preview",
        //       "_blank"
        //     );
        //   });
      };
    });

  container.append(btn);
};

(async () => {
  girls = (await axios.get(sessionStorage.getItem("base") + "/girls/gets")).data
    .girls;
  build_girls();
})();
