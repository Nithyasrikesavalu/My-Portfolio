import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const userPhotoPath = 'C:/Users/nithy/.gemini/antigravity/brain/a3d536c8-91ab-4c45-a418-a2c5c84f52f4/.user_uploaded/media_1792754939977_079041f4.png';
const scratchDir = 'C:/Users/nithy/.gemini/antigravity/brain/a3d536c8-91ab-4c45-a418-a2c5c84f52f4/scratch';
const assetsDir = 'C:/Users/nithy/Downloads/Nithyasri_MERN_Portfolio_Cosmic/portfolio-project/client/src/assets';

async function generatePortraits() {
  const size = 1000;
  const cx = 500;
  const cy = 540;
  const r = 350;

  // Background SVG with cosmic glow, glowing purple portal and neon rings
  const heroBackdropSvg = `
  <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Deep vibrant cosmic gradient -->
      <radialGradient id="portalBg" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stop-color="#9333EA" stop-opacity="0.95" />
        <stop offset="28%" stop-color="#7928CA" stop-opacity="0.9" />
        <stop offset="55%" stop-color="#581C87" stop-opacity="0.95" />
        <stop offset="82%" stop-color="#3B0764" stop-opacity="1" />
        <stop offset="100%" stop-color="#1E0538" stop-opacity="1" />
      </radialGradient>

      <!-- Intense neon glow filter -->
      <filter id="intenseNeon" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
        <feGaussianBlur stdDeviation="20" result="bigBlur"/>
        <feMerge>
          <feMergeNode in="bigBlur"/>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      <!-- Soft star glow -->
      <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <!-- Outer cosmic dashed orbit with planet/dot -->
    <circle cx="${cx}" cy="${cy}" r="${r + 75}" fill="none" stroke="#C084FC" stroke-width="1.5" stroke-dasharray="10 16" stroke-opacity="0.35" />
    <circle cx="${cx + (r + 75) * 0.94}" cy="${cy - (r + 75) * 0.34}" r="7" fill="#FFD629" filter="url(#dotGlow)" />
    <circle cx="${cx - (r + 75) * 0.8}" cy="${cy - (r + 75) * 0.6}" r="4" fill="#E879F9" filter="url(#dotGlow)" />

    <!-- Thin tilted secondary orbit line -->
    <ellipse cx="${cx}" cy="${cy}" rx="${r + 40}" ry="${r + 25}" fill="none" stroke="#A855F7" stroke-width="1.2" stroke-opacity="0.3" transform="rotate(-18 ${cx} ${cy})" />

    <!-- Main Outer Bright Neon Ring (Electric Purple / Violet) -->
    <circle cx="${cx}" cy="${cy}" r="${r + 14}" fill="none" stroke="#A855F7" stroke-width="8" stroke-opacity="0.8" filter="url(#intenseNeon)" />
    <circle cx="${cx}" cy="${cy}" r="${r + 14}" fill="none" stroke="#E9D5FF" stroke-width="2.5" stroke-opacity="0.9" />

    <!-- Solid Circle Portal Fill -->
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#portalBg)" />

    <!-- Subtle inner neon rings matching Carlos Mafla hero -->
    <circle cx="${cx}" cy="${cy}" r="${r - 28}" fill="none" stroke="#C084FC" stroke-width="2" stroke-opacity="0.45" />
    <circle cx="${cx}" cy="${cy}" r="${r - 54}" fill="none" stroke="#FFD629" stroke-width="1.2" stroke-dasharray="4 8" stroke-opacity="0.3" />
  </svg>
  `;

  const photoW = 630;
  const photoH = 946;
  const photoX = Math.round(cx - photoW / 2);
  const photoY = Math.round(cy + r - photoH + 18);

  const photoCutout = await sharp(userPhotoPath)
    .resize(photoW, photoH)
    .toBuffer();

  // Mask path: top rectangle + bottom semicircle
  const maskSvg = `
  <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <path d="M 0 0 L ${size} 0 L ${size} ${cy} L ${cx + r} ${cy} A ${r} ${r} 0 0 1 ${cx - r} ${cy} L 0 ${cy} Z" fill="#ffffff" />
  </svg>
  `;

  // Foreground ring accent
  const heroForegroundSvg = `
  <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="fgGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="6" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <!-- Soft golden accent arc at bottom rim -->
    <path d="M ${cx - r * 0.72} ${cy + r * 0.7} A ${r} ${r} 0 0 0 ${cx + r * 0.72} ${cy + r * 0.7}" 
          fill="none" stroke="#FFD629" stroke-width="3" stroke-linecap="round" stroke-opacity="0.85" filter="url(#fgGlow)" />
  </svg>
  `;

  // Apply mask to photo
  const photoOnCanvas = await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([
      { input: photoCutout, left: photoX, top: photoY }
    ])
    .png()
    .toBuffer();

  const maskedPhoto = await sharp(photoOnCanvas)
    .composite([
      { input: Buffer.from(maskSvg), blend: 'dest-in' }
    ])
    .png()
    .toBuffer();

  // Combine Backdrop + Masked Photo + Foreground Rings
  const heroFinal = await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([
      { input: Buffer.from(heroBackdropSvg), left: 0, top: 0 },
      { input: maskedPhoto, left: 0, top: 0 },
      { input: Buffer.from(heroForegroundSvg), left: 0, top: 0 }
    ])
    .png()
    .toBuffer();

  await sharp(heroFinal).toFile(path.join(scratchDir, 'hero_portrait_cosmic.png'));
  await sharp(heroFinal).toFile(path.join(assetsDir, 'profile-hero.png'));
  console.log('Hero portrait generated successfully!');

  // ==========================================
  // 2. ABOUT SECTION PORTRAIT (IMPROVED TEXTURED BRUSH SPLASH)
  // ==========================================
  const aboutW = 800;
  const aboutH = 1000;

  // Rich textured acrylic grunge brush stroke
  const aboutBackdropSvg = `
  <svg width="${aboutW}" height="${aboutH}" viewBox="0 0 ${aboutW} ${aboutH}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="paintMain" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#4C1D95" stop-opacity="0.95" />
        <stop offset="30%" stop-color="#6D28D9" stop-opacity="0.95" />
        <stop offset="65%" stop-color="#8B5CF6" stop-opacity="0.9" />
        <stop offset="100%" stop-color="#A78BFA" stop-opacity="0.85" />
      </linearGradient>

      <radialGradient id="sunOrb" cx="45%" cy="45%" r="55%">
        <stop offset="0%" stop-color="#FFD629" stop-opacity="0.85" />
        <stop offset="50%" stop-color="#F59E0B" stop-opacity="0.45" />
        <stop offset="80%" stop-color="#D97706" stop-opacity="0.15" />
        <stop offset="100%" stop-color="#B45309" stop-opacity="0" />
      </radialGradient>

      <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <!-- Glowing golden circular orb at bottom right of subject -->
    <circle cx="610" cy="780" r="130" fill="url(#sunOrb)" />

    <!-- Artistic brush stroke directly behind shoulder & neck -->
    <g transform="translate(130, 200) rotate(-18)" filter="url(#softGlow)">
      <!-- Base broad stroke with jagged bristle ends -->
      <path d="M 20 120 
               C 80 100, 160 110, 260 90
               C 340 75, 430 55, 520 35
               L 560 30 L 575 42 L 565 52 L 585 58 L 560 70 L 580 82 L 545 95
               C 460 125, 370 145, 270 160
               C 180 175, 100 185, 30 180
               L 5 170 L 15 155 L -5 148 L 10 135 Z" 
            fill="url(#paintMain)" />

      <!-- Bristle layers with realistic paint streaks -->
      <path d="M 35 110 Q 250 85 540 35 L 560 48 Q 280 98 45 125 Z" fill="#C4B5FD" opacity="0.6" />
      <path d="M 50 130 Q 300 110 520 65 L 535 78 Q 310 125 60 148 Z" fill="#7C3AED" opacity="0.8" />
      <path d="M 80 150 Q 280 138 480 95 L 495 108 Q 290 150 90 165 Z" fill="#5B21B6" opacity="0.9" />
      <path d="M 20 160 Q 200 162 420 128 L 435 140 Q 210 175 30 172 Z" fill="#4C1D95" opacity="0.95" />

      <!-- Paint splatters and droplet marks -->
      <circle cx="-18" cy="142" r="7" fill="#8B5CF6" opacity="0.75" />
      <circle cx="-32" cy="120" r="5" fill="#A78BFA" opacity="0.8" />
      <circle cx="590" cy="22" r="8" fill="#FFD629" opacity="0.8" />
      <circle cx="612" cy="48" r="10" fill="#C4B5FD" opacity="0.7" />
      <circle cx="630" cy="80" r="6" fill="#8B5CF6" opacity="0.6" />
      <circle cx="570" cy="10" r="4" fill="#E9D5FF" opacity="0.8" />
    </g>

    <!-- Faint abstract cosmic orbit curves -->
    <path d="M 60 920 C 220 840, 540 940, 780 820" fill="none" stroke="#A855F7" stroke-width="1.5" stroke-opacity="0.3" stroke-dasharray="5 7" />
  </svg>
  `;

  const aboutPhotoH = 880;
  const aboutPhotoW = Math.round((682 / 1024) * aboutPhotoH);
  const aboutPhotoX = 85;
  const aboutPhotoY = 70;

  const aboutPhotoCutout = await sharp(userPhotoPath)
    .resize(aboutPhotoW, aboutPhotoH)
    .toBuffer();

  const aboutFinal = await sharp({
    create: {
      width: aboutW,
      height: aboutH,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([
      { input: Buffer.from(aboutBackdropSvg), left: 0, top: 0 },
      { input: aboutPhotoCutout, left: aboutPhotoX, top: aboutPhotoY }
    ])
    .png()
    .toBuffer();

  await sharp(aboutFinal).toFile(path.join(scratchDir, 'about_portrait_cosmic.png'));
  await sharp(aboutFinal).toFile(path.join(assetsDir, 'profile-about.png'));
  console.log('About portrait generated successfully!');
}

generatePortraits().catch(console.error);
