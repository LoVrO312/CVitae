const { jwt_protection, admin_protection } = require("../middleware/jwtMiddleware");
const multer = require("multer");
const fs = require("fs");
const upload = multer({ dest: "./uploads/" });

const setupFileRoutes = (router, db) => {

    router.get("/:name", jwt_protection, async (req, res) => {
        try {
            const file = await db.collection("files").findOne({ name: req.params.name });

            if (!file) return res.status(404).send({ message: "File not found" });
            if (!fs.existsSync(file.path)) {
                return res.status(404).send({ message: "File not found on server" });
            }
            res.download(file.path, file.name);
        } catch (err) {
            res.status(500).send({ message: "Error retrieving file" });
        }
    });

    router.post("/upload", jwt_protection, admin_protection, upload.single("file"), async (req, res) => {
        if (!req.file) return res.status(400).send({ message: "No file uploaded" });

        const existingFile = await db.collection("files").findOne({ name: req.body.fileName });
        await db.collection("files").deleteOne({ name: req.body.fileName });

        if (existingFile && fs.existsSync(existingFile.path)) {
            fs.unlinkSync(existingFile.path);
        }

        const fileData = {
            name: req.body.fileName,
            path: req.file.path,
            mimetype: req.file.mimetype,
            size: req.file.size
        };

        await db.collection("files").insertOne(fileData);
        res.send({ message: "Uploaded successfully", filename: req.file.originalname });
    });
};

module.exports = setupFileRoutes;
