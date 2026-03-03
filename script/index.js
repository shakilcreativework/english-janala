
const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
    .then(res => res.json()) // promise of json data
    .then(data => displayLesson(data))
};

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayLevelWord(data))

};

// {
//     "id": 84,
//     "level": 1,
//     "word": "Fish",
//     "meaning": "মাছ",
//     "pronunciation": "ফিশ"
// }

const displayLevelWord = (words) => {
    // console.log(words?.data);
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    words?.data.forEach(word => {
        // console.log(word.word);
        const card = document.createElement('div');
        card.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5">
            <h2 class="text-3xl font-bold">${word?.word}</h2>
            <p class="text-lg font-medium my-5">Meaning/Pronounciation</p>
            <div class="text-2xl font-bold font-bangla text-[#18181B]">"${word?.meaning} / ${word?.pronunciation}"</div>
            <div class="flex justify-between items-center mt-10">
                <button class="btn text-lg bg-[#1A91FF10] hover:bg-[#1A91FF90]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn text-lg bg-[#1A91FF10] hover:bg-[#1A91FF90]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
            </div>
        `;

        wordContainer.append(card);
    });
};

const displayLesson = (lessons) => {
    // 1. get the container and empty
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';

    // 2. get into every lessons
    for(let lesson of lessons?.data){
        // 3. create element
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
            <button onclick="loadLevelWord(${lesson?.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson?.level_no}</button>
        `;

        // 4. append into container
        levelContainer.append(btnDiv);
    }

};

loadLessons();