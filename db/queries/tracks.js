import db from "#db/client";

export async function createTrack(name, durationMs) {
  const sql = `
  INSERT INTO tracks
    (name, duration_ms)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const {
    rows: [track],
  } = await db.query(sql, [name, durationMs]);
  return track;
}

export const getTracks = async () => {
  const res = await db.query("SELECT * FROM tracks;");
  return res.rows;
};

export const getTrackById = async (id) => {
  const res = await db.query("SELECT * FROM tracks WHERE id = $1;", [id]);
  return res.rows[0];
};
