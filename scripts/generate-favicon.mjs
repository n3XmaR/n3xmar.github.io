import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

// Make the browser's fallback favicon from the same avatar used by the site.
const sizes = [16, 32, 48, 64];
const images = await Promise.all(
  sizes.map((size) =>
    sharp('public/avatar.png')
      .resize(size, size, { fit: 'cover' })
      .png()
      .toBuffer()
  )
);

const directory = Buffer.alloc(6 + sizes.length * 16);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(sizes.length, 4);

let offset = directory.length;

images.forEach((png, index) => {
  const entry = 6 + index * 16;
  directory.writeUInt8(sizes[index], entry);
  directory.writeUInt8(sizes[index], entry + 1);
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(png.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += png.length;
});

await writeFile('public/favicon.ico', Buffer.concat([directory, ...images]));
