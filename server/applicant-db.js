const save_personal_info = async (req, res) => {
    try {
        console.log(req.body);
      } catch (err) {
        console.error(err.message);
      }
}

module.exports = {
    save_personal_info
}