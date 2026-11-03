#!/usr/bin/env node
const os = require("os");
(async () => {
  console.log("\x1b[36m=== Local Network Interfaces ===\x1b[0m");
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) {
        console.log(`  ${name}: \x1b[32m${net.address}\x1b[0m (${net.netmask})`);
      }
    }
  }
  console.log("\n\x1b[36m=== Public IP & Geolocation ===\x1b[0m");
  try {
    const res = await fetch("https://ipapi.co/json/", { headers: { "User-Agent": "devkit-100" } });
    if (res.ok) {
      const data = await res.json();
      console.log(`  Public IP:   \x1b[33m${data.ip}\x1b[0m`);
      console.log(`  Location:    ${data.city}, ${data.region}, ${data.country_name}`);
      console.log(`  ISP / Org:   ${data.org}`);
    } else {
      const fallback = await (await fetch("https://api.ipify.org?format=json")).json();
      console.log(`  Public IP:   \x1b[33m${fallback.ip}\x1b[0m`);
    }
  } catch (e) {
    console.log("  Could not fetch public IP (offline)");
  }
})();
