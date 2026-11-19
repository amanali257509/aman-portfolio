const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const base = 'C:\\Users\\Aman Ali\\.gemini\\antigravity\\brain\\ee095a8c-ef94-4a8e-b688-9bc3b24dee5c\\scratch\\mockup_extracted\\websites portfolio mockup';

const mapping = [
  { slug: 'xperti-io', title: 'Xperti', domain: 'xperti.io', category: 'WordPress', tint: '#16a34a', rel: 'inner pages screen shot/screencapture-xperti-io-2024-10-17-04_04_30 copy 2.webp' },
  { slug: 'blackbuckdesigns', title: 'Black Buck Designs', domain: 'blackbuckdesigns.com', category: 'WordPress', tint: '#3b82f6', rel: 'inner pages screen shot/screencapture-blackbuckdesigns-2024-10-17-01_55_03 copy.webp' },
  { slug: 'customwebproficient', title: 'Custom Web Pro', domain: 'customwebproficient.com', category: 'Custom HTML', tint: '#f43f5e', rel: 'inner pages screen shot/screencapture-customwebproficient-2024-10-17-02_53_09 copy.webp' },
  { slug: 'keeps-pk', title: 'Keeps.pk', domain: 'keeps.pk', category: 'Shopify', tint: '#0284c7', rel: 'inner pages screen shot/screencapture-keeps-pk-2024-10-17-01_46_49 copy.webp' },
  { slug: 'malihakamal', title: 'Maliha Kamal', domain: 'malihakamal.com', category: 'Shopify', tint: '#d97706', rel: 'inner pages screen shot/webp/screencapture-malihakamal-2024-10-17-13_44_56 copy.webp' },
  { slug: 'pk-creoliving', title: 'CREO Home & Living', domain: 'creoliving.pk', category: 'Shopify', tint: '#c9a24d', rel: 'inner pages screen shot/screencapture-pk-creoliving-2024-10-17-02_04_34 copy.webp' },
  { slug: 'snug-n-play', title: 'Snug N Play', domain: 'snugnplay.com', category: 'Shopify', tint: '#06b6d4', rel: 'shpoify/shopify+liquid Customize.png' },
  { slug: 'stylezonefactory', title: 'Style Zone Factory', domain: 'stylezonefactory.com', category: 'Shopify', tint: '#eab308', rel: 'inner pages screen shot/webp/screencapture-stylezonefactory-2024-10-17-14_07_27 copy.webp' },
  { slug: 'textilestyles-co', title: 'Textile Styles (Store)', domain: 'textilestyles.co.za', category: 'Shopify', tint: '#ea580c', rel: 'inner pages screen shot/webp/screencapture-textilestyles-co-za-2024-10-17-13_43_42 copy.webp' },
  { slug: 'mydesignbuddy', title: 'My Design Buddy', domain: 'mydesignbuddy.co.uk', category: 'Webflow', tint: '#ec4899', rel: 'inner pages screen shot/screencapture-mydesignbuddy-co-uk-2024-10-17-03_18_54 copy.webp' },
  { slug: 'steadily', title: 'Steadily', domain: 'steadily.com', category: 'Webflow', tint: '#7c3aed', rel: 'inner pages screen shot/screencapture-steadily-2024-10-17-03_14_59 copy.webp' },
  { slug: 'popping-social', title: 'Popping', domain: 'popping.social', category: 'Wix', tint: '#f43f5e', rel: 'inner pages screen shot/webp/screencapture-popping-social-2024-10-17-15_49_43 copy.webp' },
  { slug: 'urban-arc-properties', title: 'Urban Arc Properties', domain: 'urbanarcproperties.com', category: 'WordPress', tint: '#64748b', rel: 'WORDPRESS/Arbanaracproperties-wordpress-elementor.png' },
  { slug: 'creativefinancegames', title: 'Creative Cash Flow', domain: 'creativefinancegames.com', category: 'WordPress', tint: '#38bdf8', rel: 'inner pages screen shot/screencapture-creativefinancegames-2024-10-17-02_57_00 copy.webp' },
  { slug: 'featherlite-logistics', title: 'Featherlite Logistics', domain: 'featherlitelogistics.com', category: 'WordPress', tint: '#f97316', rel: 'WORDPRESS/faterlitelogistics-wordpress-elementor.png' },
  { slug: 'fitzonefactory', title: 'Fit Zone Factory', domain: 'fitzonefactory.com', category: 'WordPress', tint: '#f59e0b', rel: 'inner pages screen shot/webp/screencapture-fitzonefactory-2024-10-17-13_39_53 copy.webp' },
  { slug: 'habitat-medical-center', title: 'Habitat at the Medical Center', domain: 'habitatmedicalcenter.com', category: 'WordPress', tint: '#15803d', rel: 'WORDPRESS/habitatthemedicalcenter-wordpress-kadence.png' },
  { slug: 'jahrealtors', title: 'JAH Realtors', domain: 'jahrealtors.com', category: 'WordPress', tint: '#2563eb', rel: 'inner pages screen shot/webp/screencapture-jahrealtors-2024-10-17-13_54_39 copy.webp' },
  { slug: 'medshop-pk', title: 'Medshop.pk', domain: 'medshop.pk', category: 'WordPress', tint: '#06b6d4', rel: 'inner pages screen shot/screencapture-medshop-pk-2024-10-17-02_06_51 copy.webp' },
  { slug: 'metro-group', title: 'Metro Group', domain: 'metro-tz.com', category: 'WordPress', tint: '#f97316', rel: 'WORDPRESS/Metro-tz-wordpress-kadence.png' },
  { slug: 'petroflow-control', title: 'Petro Flow Control', domain: 'petroflow-control.com', category: 'WordPress', tint: '#dc2626', rel: 'inner pages screen shot/screencapture-petroflow-control-2024-10-17-02_00_23 copy.webp' },
  { slug: 'purechoicefoods', title: 'Pure Choice Foods', domain: 'purechoicefoods.us', category: 'WordPress', tint: '#84cc16', rel: 'inner pages screen shot/webp/screencapture-purechoicefoods-us-2024-10-17-15_18_29 copy.webp' },
  { slug: 'textilestyles-org', title: 'Textile Styles', domain: 'textilestyles.org', category: 'WordPress', tint: '#0ea5e9', rel: 'inner pages screen shot/webp/screencapture-textilestyles-org-2024-10-17-13_46_02 copy.webp' },
  { slug: 'thecopyworx', title: 'The Copy Worx', domain: 'thecopyworx.com', category: 'WordPress', tint: '#6366f1', rel: 'inner pages screen shot/screencapture-thecopyworx-2024-10-17-02_59_58 copy.webp' },
  { slug: 'urbansneaks', title: 'Urban Sneaks', domain: 'urbansneaks.com', category: 'WordPress', tint: '#3b82f6', rel: 'inner pages screen shot/webp/screencapture-urbansneaks-2024-10-17-13_57_50 copy.webp' },
  { slug: 'valscode-stylesgroup', title: 'Styles Group', domain: 'stylesgroup.com', category: 'WordPress', tint: '#b91c1c', rel: 'inner pages screen shot/webp/screencapture-valscode-stylesgroup-2024-10-17-14_00_45 copy.webp' }
];

const targetDirs = [
  path.resolve(__dirname, '../public/projects'),
  path.resolve(__dirname, '../../aman-portfolio/public/projects')
];

async function run() {
  for (const tDir of targetDirs) {
    const origDir = path.join(tDir, 'originals');
    const optDir = path.join(tDir, 'optimized');
    fs.mkdirSync(origDir, { recursive: true });
    fs.mkdirSync(optDir, { recursive: true });
  }

  const results = [];

  for (const item of mapping) {
    const srcPath = path.join(base, item.rel);
    const ext = path.extname(srcPath);

    // 1. Copy original untouched
    for (const tDir of targetDirs) {
      const origDest = path.join(tDir, 'originals', `${item.slug}${ext}`);
      fs.copyFileSync(srcPath, origDest);
    }

    // 2. Read dimensions & Optimize with sharp
    const image = sharp(srcPath);
    const meta = await image.metadata();

    // Scale to width 900
    const targetWidth = 900;
    const scale = targetWidth / meta.width;
    let newHeight = Math.round(meta.height * scale);

    let pipeline = sharp(srcPath).resize({ width: targetWidth });

    // Cap very tall pages at 6000px height so GPU memory does not blow up on mobile
    if (newHeight > 6000) {
      pipeline = pipeline.extract({ left: 0, top: 0, width: targetWidth, height: 6000 });
      newHeight = 6000;
    }

    const optBuffer = await pipeline.webp({ quality: 80 }).toBuffer();

    for (const tDir of targetDirs) {
      const optDest = path.join(tDir, 'optimized', `${item.slug}.webp`);
      fs.writeFileSync(optDest, optBuffer);
    }

    // Calculate duration: about 1 second per 1000px of page height, min 4s, max 14s
    const duration = Math.max(4, Math.min(14, Math.round((newHeight / 1000) * 10) / 10));

    results.push({
      ...item,
      origFile: `${item.slug}${ext}`,
      optimizedFile: `${item.slug}.webp`,
      width: targetWidth,
      height: newHeight,
      scrollDuration: `${duration}s`,
      origSize: fs.statSync(srcPath).size,
      optSize: optBuffer.length
    });

    console.log(`Processed ${item.slug}: ${meta.width}x${meta.height} -> ${targetWidth}x${newHeight} (${(optBuffer.length / 1024).toFixed(1)} KB, duration: ${duration}s)`);
  }

  // Save manifest
  const manifestPath = path.resolve(__dirname, '../src/data/projects-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(results, null, 2));
  console.log('Manifest written successfully with', results.length, 'projects.');
}

run().catch(console.error);
