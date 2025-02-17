const { jwt_protection } = require("../middleware/jwtMiddleware");

const setupUserRoutes = (router, db) => {
    
    router.get("/get-resume-info", jwt_protection, async (req, res) => {
        try {
            const resumeInfo = await db.collection("resume_info").findOne({});
            if (!resumeInfo) {
                return res.status(404).send({ message: "Resume info not found" });
            }
            res.send(resumeInfo);
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send({ message: "Failed to retrieve resume info" });
        }
    });
};

module.exports = setupUserRoutes;