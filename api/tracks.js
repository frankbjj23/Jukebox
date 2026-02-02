import express from "express";
import { getTrackById, getTracks } from "#db/queries/tracks";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const tracks = await getTracks();
    res.send(tracks);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.sendStatus(400);
    }
    const track = await getTrackById(id);
    if (!track) {
      return res.sendStatus(404);
    }
    res.send(track);
  } catch (err) {
    next(err);
  }
});

export default router;
