const AddAuthorController = (req, res) => {

    try {
        const thumbnail = req.file;
        if (!thumbnail) {
            return res.json({
                status: false,
                message: "No thumbnail uploaded",
            });
        }
        const { author_name, email, bio, premiumStatus } = req.body;

    } catch (err) {
        console.log(err);
    }

    res.json({
        status: true,
    })

}

module.exports = {
    AddAuthorController
}