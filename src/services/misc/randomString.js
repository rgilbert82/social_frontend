export default (strLength) => {
  const chars  = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let   result = '';
  for (let i = strLength; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
