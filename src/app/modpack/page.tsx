"use client";

import { useEffect, useState } from "react";
import { FileArchive, Copy, Check } from "lucide-react";
import { getModpackFiles } from "./actions";
import ServerStatus from "@/components/mc-server-status";

export default function DynamicModpackPage() {
  const [files, setFiles] = useState<
    { name: string; url: string; size: string }[]
  >([]);
  const [copied, setCopied] = useState(false);
  const serverIP = "acodecrafter.xyz";

  useEffect(() => {
    getModpackFiles().then(setFiles);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(serverIP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tighter text-white">
            MODPACK STUFF
          </h1>
        </div>

        {/* Server IP Section */}
        <div className="mb-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs uppercase text-blue-400 font-bold">
              Server Address
            </p>
            <p className="text-gray-200 font-mono">{serverIP}</p>
          </div>
          <button
            onClick={copyToClipboard}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-blue-400"
          >
            {copied ? <Check size={20} /> : <Copy size={20} />}
          </button>
        </div>

        {/* Server Status Section */}
        <div className="mb-6">
          <ServerStatus ip="acodecrafter.xyz" />
        </div>
        {/* Dynamic File List */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">
            Available Downloads
          </h3>

          {files.length === 0 ? (
            <p className="text-gray-500 italic text-center py-4">
              Scanning repository...
            </p>
          ) : (
            files.map((file) => (
              <div
                key={file.name}
                className="group flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:border-blue-500/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <FileArchive className="text-blue-400" />
                  <div>
                    <p className="text-gray-200 font-medium text-sm truncate max-w-[200px]">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">{file.size}</p>
                  </div>
                </div>
                <a
                  href={file.url}
                  download
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  DOWNLOAD
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
