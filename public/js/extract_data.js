const EXTRACT_DATA=(arr, type)=>{
    const data ={};
    if(type == "name"){
        if(Array.isArray(arr)){
            arr.map(name => {
                data[name] = document.getElementsByName(name)[0].value;
            })
        }else{

        }
    }

    return data
}