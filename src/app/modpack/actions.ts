"use server";

import fs from "fs";
import path from "path";

export async function getModpackFiles() {
  const dirPath = path.join(process.cwd(), "public/modpack_files");

  // Create directory if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const files = fs.readdirSync(dirPath);

  // Filter for common modpack files and return metadata
  return files
    .filter((file) => file.endsWith(".zip") || file.endsWith(".mrpack"))
    .map((file) => ({
      name: file,
      url: `/modpack_files/${file}`,
      size:
        (fs.statSync(path.join(dirPath, file)).size / (1024 * 1024)).toFixed(
          2,
        ) + " MB",
    }));
}

export async function getServerStatus(ip: string) {
  try {
    const res = await fetch(`https://api.mcsrvstat.us/3/${ip}`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });
    const data = await res.json();

    return {
      online: data.online,
      players: data.players?.online || 0,
      maxPlayers: data.players?.max || 20,
      version: data.version || "1.20.1",
    };
  } catch (error) {
    return { online: false, players: 0, maxPlayers: 0, version: "" };
  }
}
