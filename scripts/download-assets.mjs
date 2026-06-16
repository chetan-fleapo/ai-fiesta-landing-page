/**
 * Downloads all static assets from the original Webflow CDN into public/images.
 * Run once: node scripts/download-assets.mjs
 */
import { createWriteStream } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';

const CDN = 'https://cdn.prod.website-files.com/69c10ba8c1a6efa05284083e';

// [cdn path, local filename]
const MANIFEST = [
  // Branding
  ['69c10ba8c1a6efa0528408a5_36x36.png', 'favicon-36.png'],
  ['69c10ba8c1a6efa0528408a6_256x256.png', 'apple-touch-icon.png'],
  ['69c10ba8c1a6efa0528408f1_Asset 1 1.svg', 'logo.svg'],
  ['69c6b9979faa7c9fc2da138a_Asset 1 2.svg', 'logo-alt.svg'],
  // Hero / backgrounds
  ['69c959623d2fa2e0f8cebfd9_Background (5).avif', 'hero-bg.avif'],
  ['69c8011032981087f2d0a59b_banner-llms.avif', 'banner-llms.avif'],
  ['69c8023eb5d0b6e4238d6755_mobile-banner-llm.avif', 'mobile-banner-llm.avif'],
  ['69c8038b32981087f2d100fb_llms-on-cirlce.avif', 'llms-on-circle.avif'],
  ['69cab4be54936ec6a81f7718_Back (7).avif', 'features-bg.avif'],
  ['69c64233c7884d0402876773_Background 1.avif', 'footer-bg.avif'],
  ['69c7ff9e33e84e9f5d103e42_y-icon.avif', 'y-icon.avif'],
  ['69c8b36169c400cc32cfa136_live-badge.png', 'live-badge.png'],
  // Feature carousel cards
  [
    '69c805976b32294e1f79b11d_image-studio-img.avif',
    'feature-image-studio.avif'
  ],
  [
    // note: narrow no-break space (U+202F) before "PM" in the CDN filename
    '69c808c02ae88dd57aa24efb_Screenshot 2026-03-25 at 5.11.20 PM 1.avif',
    'feature-super-fiesta.avif'
  ],
  ['69c8068d59d04e5f707f021e_avatars-dark.avif', 'feature-avatars.avif'],
  [
    '69c80cb4ecc31589e32f7afc_Screenshot 2026-03-25 at 5.09.45 PM 5 (3).avif',
    'feature-projects-memory.avif'
  ],
  ['69ce1b5d1f2e4a801888f6f1_Compare Chats.webp', 'feature-compare-chats.webp'],
  // Secondary feature cards
  ['69c42b27b755ebd496d30b71_402 x 241.svg', 'secondary-web-research.svg'],
  ['69c63c8fc3649adcf0ea177f_402 x 244.webp', 'secondary-consensus.webp'],
  ['69c63d7061d6dde19b4545a3_820 x 413 (2).webp', 'secondary-games.webp'],
  ['69c63cd65a312c48e67c901d_402 x 242 (1).webp', 'secondary-transcribe.webp'],
  ['69c63c04c3649adcf0ea0749_820 x 413 (1).webp', 'secondary-prompt.webp'],
  // Calculator model icons
  ['69c8aef8d88dc21ffeb44df1_openai.png', 'models/chatgpt.png'],
  ['69c8b08b98116fbca42fd2fa_gemini.png', 'models/gemini.png'],
  ['69c8b08b5ccb3b99c27dda56_perplexity.png', 'models/perplexity.png'],
  ['69c8b08bf651fd002da95309_qwen.png', 'models/qwen.png'],
  ['69c8b08bd74fcba9ca2e0d0d_meta.png', 'models/meta.png'],
  ['69c8b08bf300b9bea15c68e2_grok.png', 'models/grok.png'],
  ['69c8b08bb517b171ee4ae409_deepseek.png', 'models/deepseek.png'],
  ['69c8b08b3426304a65dfc99e_mistral.png', 'models/mistral.png'],
  ['69c8b08ba42f10bf04d501a8_claude.png', 'models/claude.png'],
  ['69c8b08b5f0796b92eba8714_bytedance.png', 'models/bytedance.png'],
  ['69c8b08bf9e9e31d8c23a296_moonshot.png', 'models/moonshot.png'],
  // Testimonial avatars
  ['69cb48ef4fa9056060df1e7f_anupama.png', 'testimonials/anupama.png'],
  ['69cb4a328000bba55924dcd7_danish.png', 'testimonials/danish.png'],
  ['69cb4a4d8677a352d8dda9ac_Container.png', 'testimonials/anunitin.png'],
  ['69cb4a7a6e1fb96d392a18b8_mostofa.png', 'testimonials/mostofa.png'],
  ['69cb4a942006c4be8fd89bc8_veena.png', 'testimonials/veena.png'],
  // Store badges & misc
  ['69c166823c25bd1080f602b7_Apple.svg', 'apple.svg'],
  ['69c16b3d8b517df5fda59511_Playstore.svg', 'playstore.svg'],
  ['69c10ba8c1a6efa05284089d_CaretDown.svg', 'caret-down.svg']
];

// Files whose CDN slug needs discovery from the live HTML (hashed webp names)
const HTML_DISCOVERED = [
  ['romanbardewa.webp', 'testimonials/romanbardewa.webp'],
  ['anthiya.webp', 'testimonials/anthiya.webp'],
  ['Mrunal.webp', 'testimonials/mrunal.webp'],
  ['shirly.webp', 'testimonials/shirly.webp']
];

const SITE = 'https://ai-fiesta-3740f1dc32c0f77968bfd10043d5c.webflow.io/';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '../public/images');

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  await mkdir(path.dirname(dest), { recursive: true });
  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
  console.log(`ok  ${path.relative(OUT, dest)}`);
}

const failures = [];
for (const [slug, name] of MANIFEST) {
  const url = `${CDN}/${encodeURIComponent(slug)}`;
  try {
    await download(url, path.join(OUT, name));
  } catch (err) {
    failures.push([slug, String(err)]);
  }
}

// Discover hashed avatar URLs from the live page HTML
try {
  const html = await (await fetch(SITE)).text();
  for (const [needle, name] of HTML_DISCOVERED) {
    const re = new RegExp(
      `https://cdn\\.prod\\.website-files\\.com/[^"' )]*${needle.replace('.', '\\.')}`,
      'i'
    );
    const match = html.match(re);
    if (!match) {
      failures.push([needle, 'not found in HTML']);
      continue;
    }
    try {
      await download(match[0], path.join(OUT, name));
    } catch (err) {
      failures.push([needle, String(err)]);
    }
  }
} catch (err) {
  failures.push(['site html', String(err)]);
}

if (failures.length) {
  console.error('\nFAILED:');
  for (const [slug, err] of failures) console.error(`  ${slug}: ${err}`);
  process.exit(1);
}
console.log('\nAll assets downloaded.');
