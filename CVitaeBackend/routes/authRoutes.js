const { verify_token, hash_password, verify_password, generate_token } = require("../utils/authUtils");



const createUser = async (db, email, password, role) => {
    const { hash, salt } = await hash_password(password);
    await db.collection("users").insertOne({ email, hash, salt, role });
};

const getUserByEmail = async (db, email) => {
    return await db.collection("users").findOne({ email });
};



const setupAuthRoutes = (router, db) => {

    router.post("/login", async (req, res) => {
        const { email, password } = req.body;
        const user = await getUserByEmail(db, email);

        if (!user) {
            return res.status(401).json({ message: "Incorrect credentials" });
        }

        const password_correct = await verify_password(password, user.hash, user.salt);

        if (password_correct) {
            const token = await generate_token({ _id: user._id, email: user.email, role : user.role });
            res.status(200).json({ message: "Successfully signed in", token });
        } else {
            res.status(401).json({ message: "Incorrect credentials" });
        }
    });

    router.post("/register", async (req, res) => {
        const { email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).send({ message: "Passwords do not match" });
        }

        try {
            const existingUser = await getUserByEmail(db, email);
            if (existingUser) {
                return res.status(400).send({ message: "This email is already registered" });
            }
            await createUser(db, email, password, "user");
            const user = await getUserByEmail(db, email);
            const token = await generate_token({ _id: user._id, email: user.email, role : "user" });
            res.send({ message: "User registered successfully", token });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send({ message: "Failed to register user" });
        }
    });

    router.post("/verify-token", async (req, res) => {
        const token = req.body.token;
        try {
            const payload = await verify_token(token);
            res.send(payload);
        } catch (error) {
            console.error("Error:", error);
            res.status(401).send({ message: "Invalid token" });
        }
    });
};

module.exports = setupAuthRoutes;