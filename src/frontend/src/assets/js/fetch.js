export const getData = async (url) => {
  try {
    const respones = await fetch(url);
    const result = respones.json();
    return result;
  } catch (e) {
    console.log(e);
  }
};
