import db from "#db/client";

export const getPlaylists = async () => {
  const res = await db.query("SELECT * FROM playlists;");
  return res.rows;
};

export const createPlaylist = async (name, description) => {
  const res = await db.query(
    `INSERT INTO playlists (name, description) 
    VALUES ($1, $2) 
    RETURNING *;`,
    [name, description],
  );
  return res.rows[0];
};

export const getPlaylistById = async (id) => {
  const res = await db.query(`SELECT * FROM playlists WHERE id = $1;`, [id]);
  return res.rows[0];
};

export const getPlaylistTracksByPlaylistId = async (playlistId) => {
  const res = await db.query(
    ` SELECT tracks.*
    FROM tracks
    JOIN playlists_tracks
    ON tracks.id = playlists_tracks.track_id
    WHERE playlists_tracks.playlist_id = $1;`,
    [playlistId],
  );
  return res.rows;
};
