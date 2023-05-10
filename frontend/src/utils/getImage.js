const getImage = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "image/jpeg",
      },
    });
    const blob = await response.blob();
    return [URL.createObjectURL(blob), null];
  } catch (error) {
    console.error(`get: error occurred ${error}`);
    return [null, error];
  }
};

export default getImage;
