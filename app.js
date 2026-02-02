import express from "express";
import tracksRouter from "#api/tracks";
import playlistsRouter from "#api/playlists";

const app = express();

app.use(express.json());

app.use("/tracks", tracksRouter);
app.use("/playlists", playlistsRouter);

export default app;
