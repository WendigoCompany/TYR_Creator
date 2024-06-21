const container = $("#scene-frag");
const base = "/RPS/scenes/";
const params = {};
params.base = (window.location.pathname.replace(base,"")).split("/");
params.waifu = params.base[0];
params.scene_id = params.base[1];




(async ()=>{
    const response = await axios.post(sessionStorage.getItem("base") + "/scenes/" + params.waifu + "/" + params.scene_id);
})()


