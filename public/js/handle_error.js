const handle_simple_error =(status ,msj, cb)=>{
    Swal.fire({
        title: status,
        text: msj,
        icon: "error",
        customClass: {
            title: "txt-sw2",
            htmlContainer: "basic-label",
            popup: `pop-sw2 pop-sw2-girls`,
            confirmButton: "btn-sw2-confirm",
            cancelButton: "btn-sw2-cancel",
          },
      }).then(()=>{
        cb()
      });
}