"use client";

import { useEffect, useState } from "react";
import { getServerStatus } from "@/app/modpack/actions";
import { Users } from "lucide-react";

export default function ServerStatus({ ip }: { ip: string }) {
  const [status, setStatus] = useState({
    online: false,
    players: 0,
    maxPlayers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServerStatus(ip).then((data) => {
      setStatus(data);
      setLoading(false);
    });
  }, [ip]);

  if (loading)
    return (
      <div className="animate-pulse text-gray-500 text-sm">
        Checking server...
      </div>
    );

  return (
    <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 rounded-full w-fit">
      {/* Online/Offline Indicator */}

      <div className="flex items-center gap-2">
        <div className="relative flex h-3 w-3">
          {status.online && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          )}
          <span
            className={`relative inline-flex rounded-full h-3 w-3 ${status.online ? "bg-green-500" : "bg-red-500"}`}
          ></span>
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
          {status.online ? "Server Online" : "Server Offline"}
        </span>
      </div>

      {/* Player Count */}
      {status.online && (
        <div className="flex items-center gap-2 border-l border-white/10 pl-4 text-gray-400">
          <Users size={14} />
          <span className="text-sm font-mono text-blue-400">
            {status.players}
            <span className="text-gray-600">/</span>
            {status.maxPlayers}
          </span>
        </div>
      )}
    </div>
  );
}
