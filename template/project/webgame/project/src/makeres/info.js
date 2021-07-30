
/**
 * 取得資源
 * @param {String} id 資源代碼
 */
export async function get (id) {
  let res = {};
  res.texture  = await import(`../../res/info/${id}.textureList.yml`);

  return res;
}
