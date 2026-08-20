import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The project sits under C:\Users\DELL\Downloads, which has a package-lock.json
  // higher up the tree. Pin the workspace root so Turbopack does not walk into
  // the home directory looking for one.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
