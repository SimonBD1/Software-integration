import { Router } from "express";

const router = Router();
let nextId = 4;
const users = [
  { id: 1, name: "Arne" },
  { id: 2, name: "Minho" },
  { id: 3, name: "Charlie" },
];

/**
 * @openapi
 * /api/users:
 *   get:
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Returns all users
 */
router.get("/api/users", (req, res) => {
  res.send({ data: users }); //aldrig brug res.json, da det kun hjælper med at sætte headers. brug altid res.send i stedet
});

/**
 * @openapi
 * /api/users:
 *   post:
 *     description: Create a new user
 *     responses:
 *       200:
 *         description: Returns the users that was created
 *
 */
router.post("/api/users", (req, res) => {
  const newUser = req.body;
  newUser.id = nextId++;
  users.push(req.body);

  res.send({ data: newUser });
});
export default router;
