const fetchingFromApi = (fetchingURL) => {
    let entryMode = 1;
    fetch(fetchingURL)
    .then(responseFromApi => responseFromApi.json())
    .then(dataFetchedFromApi => {
        const alQuranDiv = document.getElementById('theQuranId');
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
            if((currentVerseChapterKey != previousVerseChapterKey || label===1) && entryMode===1){
                try{
                    const request = new XMLHttpRequest();
                    request.open('GET', chapterKeyUrl, false);  // `false` makes the request synchronous
                    request.send(null);
                    console.log(request.status);
                    if (request.status === 200) {
                        const chapterInformation = JSON.parse(request.response).chapter;
                        const nameOfTheSurahInArabic = chapterInformation.name_arabic;
                        const nameOfTheSurahInEnglishSimple = chapterInformation.name_simple;
                        const nameOfThePlaceWhereSurahRevealed = chapterInformation.revelation_place;
                        const revelationOrderOfTheSurah = chapterInformation.revelation_order;
                        const verseCountOfTheSurah = chapterInformation.verses_count;
                        const meaningOfTheSurahInEnglish = chapterInformation.translated_name.name;
                        let surahInformation = nameOfTheSurahInArabic + '  :  ' +nameOfTheSurahInEnglishSimple + '  :  ' + meaningOfTheSurahInEnglish + '\n\n' + nameOfThePlaceWhereSurahRevealed + '  :  ' + revelationOrderOfTheSurah + '  :  ' + verseCountOfTheSurah;
                        const informationOfTheSurah = document.createElement('p');
                        if(label===1){
                            
                        }
                        else{
                            
                        }
                        informationOfTheSurah.className='suraInfoBriefing';
                        informationOfTheSurah.innerText = surahInformation;
                        alQuranDiv.appendChild(informationOfTheSurah);
                        const bismillahirRahmanirRahimH2 = document.createElement('h2');
                        bismillahirRahmanirRahimH2.innerText='بِسۡمِ اللهِ الرَّحۡمٰنِ الرَّحِيۡمِ';
                        if(label!=1){
                            informationOfTheSurah.style.marginTop='6em';
                            alQuranDiv.appendChild(bismillahirRahmanirRahimH2);
                            bismillahirRahmanirRahimH2.style.marginTop='2rem';
                            bismillahirRahmanirRahimH2.style.fontWeight='600';
                        }
                    }
                    else{
                        entryMode=0;
                    }
                }
                catch(err){
                    entryMode=0;
                    console.log(err);
                }
            }
            const verseTextIndopiak = verse.text_indopak;
            const verseData = `
                <h4>${verseKey}</h4>
                <h2>${verseTextIndopiak}</h2>
            `
            const eachVerseDiv = document.createElement('div');
            eachVerseDiv.innerHTML=verseData;
            eachVerseDiv.className='eachVerse';
            alQuranDiv.appendChild(eachVerseDiv);
        });  
    })
    .catch( error =>{
        console.log(error);
        const onlineOrOffline = window.onlineOrOffline;
        if(!onlineOrOffline){
            alert('No Internet Connection');
            return;
        }
        else{
            alert('There Was A Problem With The API\n\nContact Shad Reza');
            return;
        }
    } )
}
fetchingFromApi('https://api.quran.com/api/v4/quran/verses/indopak');
document.getElementById('bodyTag').style.background='#2b2e4a';
document.getElementById('bodyTag').style.color='#f5f5f5';