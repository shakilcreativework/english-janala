
const createElements = (arr) => {
    const htmlElememts = arr.map(el => `<span class="bg-[#EDF7FF] py-1 px-3">${el}</span>`);
    return (htmlElememts.join(" "));
};

// voice implement
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpinner = (status) => {
    const spin = document.getElementById('spinner');
    const word = document.getElementById('word-container');

    if(status == true){
        spin.classList.remove("hidden");
        spin.classList.add("flex");
        word.classList.add("hidden");
    }else{
        word.classList.remove("hidden");
        spin.classList.add("hidden");
        spin.classList.remove("flex");
    }
};

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
    .then(res => res.json()) // promise of json data
    .then(data => displayLesson(data))
};

const removeActive = () => {
    const lessonButtons = document.querySelectorAll('.lesson-btn');
    lessonButtons.forEach(btn => btn.classList.remove('active'));
};


const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            clickBtn.classList.add('active');
            // console.log('btn clicked');
            displayLevelWord(data?.data);
        });

    manageSpinner(false);

};

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    // console.log(url);
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details?.data);
};

const displayWordDetails = (word) => {
    // console.log(word);
    const detailsBox = document.getElementById('details-container');
    detailsBox.innerHTML = `
        <div>
            <h2 class="mb-2 text-2xl font-bold">${word?.word} (<i class="fa-solid fa-microphone-lines"></i> :${word?.pronunciation})</h2>
        </div>
        <div>
            <h2 class="mb-2 font-bold">Meaning</h2>
            <p class="font-bangla text-base">${word?.meaning}</p>
        </div>
        <div>
            <h2 class="mb-2 font-bold">Example</h2>
            <p class="text-base">${word?.sentence}</p>
        </div>
        <div>
            <h2 class="mb-2 font-bangle font-bold">সমার্থক শব্দ গুলো</h2>
            <div class="flex items-center gap-3">
               ${createElements(word?.synonyms)}
            </div>
        </div>
    `;
    document.getElementById('word_model').showModal();
    
};


const displayLevelWord = (words) => {
    // console.log(words);
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    // conditions of zero data
    if(words?.length === 0){
        wordContainer.innerHTML = `
            <div class="col-span-full text-center space-y-5">
                <div class="w-20 mx-auto"><img class="mx-auto" src="./assets/alert-error.png"></div>
                <p class="font-bangla text-sm">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="font-bangla text-lg font-semibold text-[#292524]">নেক্সট Lesson এ যান</h2>
            </div>
        `;
        // manageSpinner(false);
        // return;
    }

    words?.map(word => {
        // console.log(word.word);
        const card = document.createElement('div');
        card.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5">
            <h2 class="text-3xl font-bold">${word?.word ? word?.word : 'Not a meaning'}</h2>
            <p class="text-lg font-medium my-5">Meaning/Pronounciation</p>
            <div class="text-xl font-bold font-bangla text-[#18181B]">"${word?.meaning ? word?.meaning : 'Not a meaning'} / ${word?.pronunciation ? word?.pronunciation : 'Not a meaning'}"</div>
            <div class="flex justify-between items-center mt-10">
                <button onclick="loadWordDetail(${word?.id})" class="btn text-lg bg-[#1A91FF10] hover:bg-[#1A91FF90]"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick="pronounceWord('${word?.word}')" class="btn text-lg bg-[#1A91FF10] hover:bg-[#1A91FF90]"><i class="fa-solid fa-volume-high"></i></button>
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
            <button id="lesson-btn-${lesson?.level_no}" onclick="loadLevelWord(${lesson?.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson?.level_no}</button>
        `;

        // 4. append into container
        levelContainer.append(btnDiv);
    }

};

loadLessons();

document.getElementById('btn-search').addEventListener('click', () => {
    removeActive();
    const input = document.getElementById('input-search');
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);

    fetch("https://openapi.programming-hero.com/api/words/all")
        .then(res => res.json())
        .then(data => {
            const allWords = data?.data;
            // console.log(allWords);
            const filterWords = allWords.filter(word => word?.word.toLowerCase().includes(searchValue));
            // console.log(filterWords);
            displayLevelWord(filterWords);
        });
});