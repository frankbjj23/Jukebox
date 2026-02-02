import express from "express";
import {
  createPlaylist,
  getPlaylistById,
  getPlaylistTracksByPlaylistId,
  getPlaylists,
} from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { getTrackById } from "#db/queries/tracks";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const playlists = await getPlaylists();
    res.send(playlists);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, description } = req.body ?? {};
    if (!name || !description) {
      return res.sendStatus(400);
    }
    const playlist = await createPlaylist(name, description);
    res.status(201).send(playlist);
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
    const playlist = await getPlaylistById(id);
    if (!playlist) {
      return res.sendStatus(404);
    }
    res.send(playlist);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/tracks", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.sendStatus(400);
    }
    const playlist = await getPlaylistById(id);
    if (!playlist) {
      return res.sendStatus(404);
    }
    const tracks = await getPlaylistTracksByPlaylistId(id);
    res.send(tracks);
  } catch (err) {
    next(err);
  }
});

router.post("/:id/tracks", async (req, res, next) => {
  try {
    const playlistId = Number(req.params.id);
    if (!Number.isInteger(playlistId)) {
      return res.sendStatus(400);
    }
    const { trackId } = req.body ?? {};
    if (!Number.isInteger(trackId)) {
      return res.sendStatus(400);
    }

    const playlist = await getPlaylistById(playlistId);
    if (!playlist) {
      return res.sendStatus(404);
    }

    const track = await getTrackById(trackId);
    if (!track) {
      return res.sendStatus(400);
    }

    try {
      const playlistTrack = await createPlaylistTrack(playlistId, trackId);
      res.status(201).send(playlistTrack);
    } catch (err) {
      if (err.code === "23505") {
        return res.sendStatus(400);
      }
      throw err;
    }
  } catch (err) {
    next(err);
  }
});

export default router;
