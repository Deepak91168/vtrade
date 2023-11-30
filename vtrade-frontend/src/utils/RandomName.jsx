export const getRandomFileName = (file) => {
  const randomName =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const fileExtension = file.name.split(".").pop();
  const fileName = `${randomName}.${fileExtension}`;
  return fileName;
};
export const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
