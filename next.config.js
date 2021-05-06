/* eslint-disable @typescript-eslint/no-var-requires */
const compose = require('next-compose-plugins');
const withImages = require('next-images');
const withSvgr = require('next-svgr');

module.exports = compose([withImages, withSvgr], {
  trailingSlash: true,
});
