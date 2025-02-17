const { jwt_protection, admin_protection } = require("../middleware/jwtMiddleware");

const setupAdminRoutes = (router, db, wss) => {

    router.post("/edit-profile", jwt_protection, admin_protection, async (req, res) => {
        const { email, bio, skills, github, linkedin } = req.body;
        try {
            await db.collection("resume_info").deleteMany({});
            const result = await db.collection("resume_info").insertOne(
                { email, github, linkedin, bio, skills }
            );
            
            wss.clients.forEach(client => {
                if (client.readyState === 1) {
                    client.send(JSON.stringify({ type: "profileUpdated" }));
                }
            });
            
            res.send({ message: "Profile updated successfully" });  
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send({ message: "Failed to update profile" });
        }
    });
};

module.exports = setupAdminRoutes;
