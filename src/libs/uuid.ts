export const uuid = (length: number) => {
  const characters = "abcedfghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * characters.length);
    result += characters[randomNumber];
  }

  return result;
};
