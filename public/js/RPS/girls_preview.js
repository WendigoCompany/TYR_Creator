let girl_data;

(async ()=>{
    girl_data = (await axios.post(sessionStorage.getItem("base") + "/girls/preview")).data;
    console.log(girl_data);
})()