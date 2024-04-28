const { Optimizer } = require('@parcel/plugin');
const { countLines } = require('@parcel/utils');
const SourceMap = require('@parcel/source-map').default;



module.exports = new Optimizer({
  async loadConfig({ config }) {
    // we use toml since it has nicer syntax for multi-line strings than json
    // and we dont want js since its overkill
    let { contents, filePath } = await config.getConfig(['header.toml']);
    config.invalidateOnFileChange(filePath) // not sure this has an effect on e.g. parcel watch
    return contents;
  },

  async optimize({
    contents,
    map,
    options,
    config
  }) {
    const header = config.header
    const newMap = new SourceMap(options.projectRoot);
    if (options.sourceMaps) {
      const mapBuffer = map.toBuffer();
      const lineOffset = countLines(header) - 1;
      newMap.addBuffer(mapBuffer, lineOffset);
    }

    return { contents: header + contents, map: newMap };
  },
});
