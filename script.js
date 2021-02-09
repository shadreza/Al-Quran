const fetchingFromApi = (fetchingURL , decisionParameter) => {
    fetch(fetchingURL)
    .then(responseFromApi => responseFromApi.json())
    .then(dataFetchedFromApi => {
        const alQuranDiv = document.getElementById('theQuranId');
        if(decisionParameter === 1){
            const theEntireQuran = dataFetchedFromApi;
            const verseArrayOfTheEntireQuran = theEntireQuran.verses;
            let currentVerseChapterKey=0;
            let previousVerseChapterKey=0;
            let label = 0;
            verseArrayOfTheEntireQuran.forEach(verse => {
                const verseKey = verse.verse_key;
                if(label==0){
                    currentVerseChapterKey = previousVerseChapterKey = verseKey.split(':')[0];
                }
                else{
                    previousVerseChapterKey = currentVerseChapterKey;
                    currentVerseChapterKey = verseKey.split(':')[0];
                }
                label++;
                const chapterKeyUrl = `https://api.quran.com/api/v4/chapters/${parseInt(currentVerseChapterKey)}?language=en`;
                if(currentVerseChapterKey != previousVerseChapterKey || label===1){
                    console.log('in');
                    fetchingFromApi(chapterKeyUrl,2);
                }
                const verseTextIndopiak = verse.text_indopak;
                const verseData = `
                    <h4>${verseKey}</h4>
                    <h2>${verseTextIndopiak}</h2>
                    <br>
                    <br>
                    <br>
                `
                const eachVerseDiv = document.createElement('div');
                eachVerseDiv.innerHTML=verseData;
                alQuranDiv.appendChild(eachVerseDiv);
            });
        }
        else if(decisionParameter === 2){
            const chapterInformation = dataFetchedFromApi.chapter;
            const nameOfTheSurahInArabic = chapterInformation.name_arabic;
            const nameOfTheSurahInEnglishSimple = chapterInformation.name_arabic;
            const nameOfThePlaceWhereSurahRevealed = chapterInformation.revelation_place;
            const revelationOrderOfTheSurah = chapterInformation.revelation_order;
            const verseCountOfTheSurah = chapterInformation.verses_count;
            const meaningOfTheSurahInEnglish = chapterInformation.translated_name.name;
            const surahInformation = nameOfTheSurahInArabic + '  :  ' +nameOfTheSurahInEnglishSimple + '  :  ' + meaningOfTheSurahInEnglish + '\n\n' + nameOfThePlaceWhereSurahRevealed + '  :  ' + revelationOrderOfTheSurah + '  :  ' + verseCountOfTheSurah;
            console.log(surahInformation);
            const informationOfTheSurah = document.createElement('p');
            informationOfTheSurah.innerText = surahInformation;
            alQuranDiv.appendChild(informationOfTheSurah);
        }
    })
    .catch( error =>{
        console.log(error);
        // const onlineOrOffline = window.onlineOrOffline;
        // if(!onlineOrOffline){
        //     alert('No Internet Connection');
        //     return;
        // }
        // else{
        //     alert('There Was A Problem With The API\n\nContact Shad Reza');
        //     return;
        // }
    } )
}

fetchingFromApi('https://api.quran.com/api/v4/quran/verses/indopak' , 1);
