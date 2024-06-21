const cc = require("node-console-colors");

const prepare_colors = (colors) => {
    const colorsarr = [];
    if (typeof colors == "object") {

        if (colors["bg"]) {
            colorsarr.push(`bg_` + colors["bg"])
        }


        if (colors["c"]) {
            colorsarr.push(`fg_` + colors["c"])
        }





    } else if (typeof colors == "string") {
        switch (colors) {
            case "err":
            case "error":
                return ["fg_red"]

            case "warning":
            case "war":
                return ["fg_yellow"]

            case "suc":
            case "success":
                return ["fg_green"]

            case "sep":
            case "separator":
                return ["fg_cyan"]


            default:
                break;


        }
    }

    return colorsarr
}


console.cc = (colors = { bg: "", c: "" }, ...params) => {
    const colorsarr = prepare_colors(colors)
    params = params.map(p => {
        if (typeof p) {
            p = JSON.stringify(p);
        }
        return p
    })

    // console.log(colorsarr);
    console.log(cc.set(colorsarr[0], colorsarr[1], params.join("\n")));

    // console.log(cc.set(colorsarr.concat(params.join(" "))));
};



const ccsep =(colors = { bg: "", c: "" }, ...params)=>{
console.cc("sep", "---------------------------------------------------------------------------")
console.cc(colors, params)
console.cc("sep", "---------------------------------------------------------------------------")

}
module.exports = {ccsep};