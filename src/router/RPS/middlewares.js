const required_values = ["name", "s_name", "root", "imgs"];

const validate_new_girl = (req, res) => {
  let validator = false;
  const data = req.body;
  let errors =[];
  Object.keys(data).map((k) => {
    if (data[k] == undefined) {
      validator = true;
      errors.push(k)
      return "";
      
    }

    if (data[k].length == 0) {
      validator = true;
      errors.push(k)
      return "";
    }


  });

  if (validator) {
    res.status(409).json({
        msj : `The next values are invalid: ` + errors.toString()
    });
    return "";
  }



  res.status(200).json({})
};

module.exports = { validate_new_girl };


