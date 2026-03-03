
const createElements = (arr) => {
    const htmlElememts = arr.map(el => `<span class="btn">${el}</span>`);
    console.log(htmlElememts.join(" "));
};

const sentence = ["I", "am", "a", "Developer"];
createElements(sentence);