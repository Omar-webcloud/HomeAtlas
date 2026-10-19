const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 1. Create the SVG Icon
// We create an architectural emblem: A sleek squircle with a modern luxury pavilion structure
// combining the letters 'H' (twin pillars & crossbeam) and 'A' (pitched architectural roofline / atlas apex).
const svgContent = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#141416"/>
      <stop offset="100%" stop-color="#070708"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="120" y1="100" x2="392" y2="412" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="50%" stop-color="#F4F4F5"/>
      <stop offset="100%" stop-color="#D4D4D8"/>
    </linearGradient>
    <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Background squircle -->
  <rect width="512" height="512" rx="112" fill="url(#bgGrad)"/>
  <rect x="3" y="3" width="506" height="506" rx="109" stroke="#27272A" stroke-width="6"/>

  <!-- Architectural Emblem: HOMEATLAS Monogram (H + A + Modern Pavilion) -->
  <g filter="url(#subtleGlow)">
    <!-- Floating Architectural Gable Roof (Apex of 'A' & Estate Canopy) -->
    <path d="M256 96 L400 204 L368 228 L256 144 L144 228 L112 204 Z" fill="url(#goldGrad)"/>

    <!-- Left Pillar of 'H' -->
    <rect x="144" y="220" width="44" height="196" rx="6" fill="url(#goldGrad)"/>

    <!-- Right Pillar of 'H' -->
    <rect x="324" y="220" width="44" height="196" rx="6" fill="url(#goldGrad)"/>

    <!-- Architectural Cantilever Crossbeam ('H' bar & Floor Line) -->
    <rect x="144" y="288" width="224" height="40" rx="6" fill="url(#goldGrad)"/>

    <!-- Subtle Centered Diamond Accent (Atlas Compass Marker) -->
    <polygon points="256,220 266,236 256,252 246,236" fill="url(#goldGrad)"/>
  </g>
</svg>`;

// We also create an adaptive SVG version for public/icon.svg that supports browser dark/light mode
const adaptiveSvgContent = `<svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root {
      --bg: #09090b;
      --border: #27272a;
      --fg: #fafafa;
    }
    @media (prefers-color-scheme: light) {
      :root {
        --bg: #09090b;
        --border: #27272a;
        --fg: #fafafa;
      }
    }
  </style>
  <rect width="180" height="180" rx="40" fill="var(--bg)"/>
  <rect x="1.5" y="1.5" width="177" height="177" rx="38.5" stroke="var(--border)" stroke-width="3"/>
  <g>
    <!-- Roof Gable (Apex of A & Modern Estate Canopy) -->
    <path d="M90 34 L141 72 L130 80 L90 50 L50 80 L39 72 Z" fill="var(--fg)"/>
    <!-- Left Column of H -->
    <rect x="50.5" y="77" width="15.5" height="69" rx="2" fill="var(--fg)"/>
    <!-- Right Column of H -->
    <rect x="114" y="77" width="15.5" height="69" rx="2" fill="var(--fg)"/>
    <!-- Crossbeam of H -->
    <rect x="50.5" y="101" width="79" height="14" rx="2" fill="var(--fg)"/>
    <!-- Atlas Marker -->
    <polygon points="90,77 93.5,83 90,89 86.5,83" fill="var(--fg)"/>
  </g>
</svg>`;

// Helper function to build a multi-resolution ICO file from PNG buffers
function createIco(images) {
  // images: array of { width, height, buffer }
  const count = images.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + count * dirEntrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type 1 = ICO
  header.writeUInt16LE(count, 4);

  const dirEntries = [];
  for (const img of images) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // Colors
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Planes
    entry.writeUInt16LE(32, 6); // BPP
    entry.writeUInt32LE(img.buffer.length, 8); // Size
    entry.writeUInt32LE(offset, 12); // Offset
    offset += img.buffer.length;
    dirEntries.push(entry);
  }

  return Buffer.concat([header, ...dirEntries, ...images.map(img => img.buffer)]);
}

async function run() {
  const publicDir = path.join(__dirname, '..', 'public');
  const appDir = path.join(__dirname, '..', 'app');

  // Save the SVG icon
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), adaptiveSvgContent);
  console.log('✓ Created public/icon.svg');

  // Render PNGs at various resolutions
  const svgBuffer = Buffer.from(svgContent);

  const pngSizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 32, name: 'icon-light-32x32.png' },
    { size: 32, name: 'icon-dark-32x32.png' },
    { size: 48, name: 'favicon-48x48.png' },
    { size: 180, name: 'apple-icon.png' },
    { size: 192, name: 'icon-192.png' },
    { size: 512, name: 'icon-512.png' },
  ];

  const icoBuffers = [];

  for (const { size, name } of pngSizes) {
    const buf = await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toBuffer();
    
    fs.writeFileSync(path.join(publicDir, name), buf);
    console.log(`✓ Created public/${name} (${size}x${size})`);

    if (size === 16 || size === 32 || size === 48) {
      if (!icoBuffers.some(b => b.width === size)) {
        icoBuffers.push({ width: size, height: size, buffer: buf });
      }
    }
  }

  // Generate multi-resolution favicon.ico
  const icoData = createIco(icoBuffers);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoData);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoData);
  console.log('✓ Created public/favicon.ico and app/favicon.ico');

  // Create an OpenGraph 1200x630 card
  const heroImage = path.join(publicDir, 'images', 'estate-hero-main.jpg');
  if (fs.existsSync(heroImage)) {
    // Generate an overlay with luxury branding for og-image.jpg
    const ogSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="overlayGrad" x1="0" y1="0" x2="0" y2="630" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#000000" stop-opacity="0.4"/>
          <stop offset="50%" stop-color="#000000" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.85"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#overlayGrad)"/>
      
      <!-- Top Brand Mark -->
      <g transform="translate(80, 70)">
        <rect width="56" height="56" rx="14" fill="#0A0A0A" stroke="#27272A" stroke-width="2"/>
        <path d="M28 14 L42 25 L38.5 27.5 L28 19 L17.5 27.5 L14 25 Z" fill="#FFFFFF"/>
        <rect x="17.5" y="27" width="5" height="19" rx="1" fill="#FFFFFF"/>
        <rect x="33.5" y="27" width="5" height="19" rx="1" fill="#FFFFFF"/>
        <rect x="17.5" y="34" width="21" height="4" rx="1" fill="#FFFFFF"/>
        <text x="72" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="700" letter-spacing="4" fill="#FFFFFF">HOMEATLAS</text>
        <text x="72" y="52" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" letter-spacing="2" fill="#A1A1AA">ARCHITECTURAL ESTATES</text>
      </g>

      <!-- Bottom Headline -->
      <g transform="translate(80, 420)">
        <rect x="0" y="-12" width="160" height="26" rx="13" fill="#FFFFFF" fill-opacity="0.15"/>
        <text x="14" y="5" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" letter-spacing="2" fill="#FFFFFF">CURATED PORTFOLIO</text>
        <text x="0" y="60" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="600" letter-spacing="-0.5" fill="#FFFFFF">Curated Luxury Real Estate &amp; Architectural Estates</text>
        <text x="0" y="100" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="400" fill="#D4D4D8">Discover premier architectural estates, contemporary villas, and iconic luxury residences.</text>
        <text x="0" y="140" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="500" letter-spacing="1" fill="#A1A1AA">home-atlas-estate.vercel.app</text>
      </g>
    </svg>`;

    const ogImageBuffer = await sharp(heroImage)
      .resize(1200, 630, { fit: 'cover', position: 'center' })
      .composite([{ input: Buffer.from(ogSvg) }])
      .jpeg({ quality: 92 })
      .toBuffer();

    fs.writeFileSync(path.join(publicDir, 'og-image.jpg'), ogImageBuffer);
    console.log('✓ Created public/og-image.jpg (1200x630)');
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
