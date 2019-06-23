// Learned at https://simon-schraeder.de/posts/filereader-async/

function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      var img = new Image();
      img.src = e.target.result;

      img.onload = function() {
        let w = this.width;
        let h = this.height;
        resolve(h / w);
      };
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

async function aspectRatioCalculator(file) {
  try {
    let ratio = await readFileAsync(file);
    return ratio;
  } catch (err) {
    return err;
  }
}

export default aspectRatioCalculator;
