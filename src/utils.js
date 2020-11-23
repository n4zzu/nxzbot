const mod = {};
/**
 * Transforms a raw mention '<@0000>' to 0000 as a number
 * @param {String} raw
 * @returns {Number} returns the snowflake
 */
mod.mention_to_id = (raw) => {
  const a = Array.from(raw).slice(2);
  a.pop();
  return a.join("");
};
mod.make_mention = (id) => {
  return `<@${id}>`;
}
module.exports = mod;