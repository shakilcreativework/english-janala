
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
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            clickBtn.classList.add('active');
            // console.log('btn clicked');
            displayLevelWord(data);
        });

};

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    // console.log(url);
    const res = await fetch(url);
    const details = await res.json();
    console.log(details);
};


const displayLevelWord = (words) => {
    // console.log(words?.data);
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    // conditions of zero data
    if(words?.data?.length === 0){
        wordContainer.innerHTML = `
            <div class="col-span-full text-center space-y-5">
                <div class="w-20 mx-auto"><img class="mx-auto" src="./assets/alert-error.png"></div>
                <p class="font-bangla text-sm">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="font-bangla text-lg font-semibold text-[#292524]">নেক্সট Lesson এ যান</h2>
            </div>
        `;
    }

    words?.data.forEach(word => {
        // console.log(word.word);
        const card = document.createElement('div');
        card.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5">
            <h2 class="text-3xl font-bold">${word?.word ? word?.word : 'Not a meaning'}</h2>
            <p class="text-lg font-medium my-5">Meaning/Pronounciation</p>
            <div class="text-xl font-bold font-bangla text-[#18181B]">"${word?.meaning ? word?.meaning : 'Not a meaning'} / ${word?.pronunciation ? word?.pronunciation : 'Not a meaning'}"</div>
            <div class="flex justify-between items-center mt-10">
                <button onclick="loadWordDetail(${word?.id})" class="btn text-lg bg-[#1A91FF10] hover:bg-[#1A91FF90]"><i class="fa-solid fa-circle-info"></i></button>
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
            <button id="lesson-btn-${lesson?.level_no}" onclick="loadLevelWord(${lesson?.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson?.level_no}</button>
        `;

        // 4. append into container
        levelContainer.append(btnDiv);
    }

};

loadLessons();