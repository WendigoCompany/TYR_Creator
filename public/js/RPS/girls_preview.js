let girl_data;

const show_preview =()=>{
    console.log(girl_data);
    $("#title").text(`${girl_data.name}`)
    $("#prev-img").attr({src: girl_data.imgs})


    $("#name").text( "FULL NAME: " +  girl_data.name)
    $("#s_name").text( "SHORT NAME: " +girl_data.s_name)
    $("#c_model").text( "CREATOR NAME: " +girl_data.c_model)
    $("#l_model").attr({ href :  girl_data.l_model}).text("CREATOR")
    $("#root").text( "FODLER ROOT: " +girl_data.root)
    




}

(async ()=>{
    girl_data = JSON.parse( sessionStorage.getItem("girl"))
    show_preview()
})()