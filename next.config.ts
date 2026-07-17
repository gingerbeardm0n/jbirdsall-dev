import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/chess", destination: "https://chess-game-plus.vercel.app" },
      { source: "/chess/:path*", destination: "https://chess-game-plus.vercel.app/:path*" },
      { source: "/climber", destination: "https://jclimber-game.vercel.app" },
      { source: "/climber/:path*", destination: "https://jclimber-game.vercel.app/:path*" },
    ];
  },
};

export default nextConfig;
