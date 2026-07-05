// Projects Natural Earth 110m land polygons into a true orthographic
// "top view" of the Earth, seen from above the North Pole, and emits a
// single SVG path (earth-local coords, center 500,500) to bake into
// index.html. Greenwich points up; east longitudes run counterclockwise,
// matching the clock's geometry (rotate the group by UTC time).
//
// Usage: node tools/build-earth.mjs <land-geojson> [radius]
import { readFileSync } from "node:fs";

const R = Number(process.argv[3] ?? 110);
const CX = 500, CY = 500;
const geo = JSON.parse(readFileSync(process.argv[2], "utf8"));

const D2R = Math.PI / 180;

function project([lon, lat]) {
  const phi = Math.max(lat, 0) * D2R; // below the equator lies beyond the horizon
  const r = R * Math.cos(phi);
  return [CX - r * Math.sin(lon * D2R), CY - r * Math.cos(lon * D2R)];
}

function ringToPath(ring) {
  // drop rings that never rise above the horizon (Antarctica & friends)
  if (!ring.some(([, lat]) => lat > 0)) return "";
  let d = "", px = NaN, py = NaN, n = 0;
  for (const pt of ring) {
    const [x, y] = project(pt);
    if (Math.hypot(x - px, y - py) < 1.0) continue; // simplify
    d += (n === 0 ? "M" : "L") + Math.round(x) + " " + Math.round(y);
    px = x; py = y; n++;
  }
  return n > 2 ? d + "Z" : "";
}

let path = "";
for (const f of geo.features) {
  const g = f.geometry;
  const polys = g.type === "Polygon" ? [g.coordinates] : g.coordinates;
  for (const poly of polys) for (const ring of poly) path += ringToPath(ring);
}

process.stdout.write(path);
