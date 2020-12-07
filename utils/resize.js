'use strict';
const sharp = require('sharp');

// file = full path to image (req.file.path), thumbname = filename (req.file.filename)
const makeThumbnail = async (file, thumbname, size) => {
    // TODO: use sharp to create a png thumbnail of 160x160px, use async await
    const result = await sharp(file).
    resize(size.widht, size.height).
    png().
    toFile(thumbname);
    return result;
};

module.exports = {
    makeThumbnail,
};
