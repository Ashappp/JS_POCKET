// Найти повторяющееся популярное слово в массиве 
// Артем
const mostPopularWord = text => {
    const wordToArr = text.replace(/[,.*]/g, "").split(/\s+/gi);
  
    let mostPopularWord = "";
    let maincounter = 1;
  
    wordToArr.forEach(word => {
      let innercounter = 0;
      wordToArr.forEach(subword => {
        word === subword && innercounter++;
        if (innercounter > maincounter) {
          mostPopularWord = word;
          maincounter = innercounter;
        }
      });
    });

    return mostPopularWord;
  };
  
  const text1 = "dog, cat, lizard, cat, dog, dog, cat, cat, cat";
  const text2 =
    "John and Marry work together for last few years. John as designer and Marry as his manager. On Firday John is going to be promoted.";
  
  console.log(mostPopularWord(text1));
  console.log(mostPopularWord(text2));

//   Дима
const mostPopularWord = (text) => {
    const counter = text
      .replace(/[,.*]/g, '')
      .split(/\s+/gi)
      .reduce((acc, word) => {
        acc[word] = acc[word] ? acc[word] + 1 : 1;
        return acc;
      }, {});
    return Object.entries(counter).sort((a, b) => b[1] - a[1])[0][0];
  };
// =======================================================================


let arr = [-2,0,1,2,3,4,5,8,9,11,13,15,18,22,25,28,29,30];

 function out(arr){
   let result = '';
   let isDash = false;
   for(let i=0;i<arr.length;i++){
    if (((arr[i+1] - arr[i]) === 1) && isDash){
    } else if (((arr[i+1] - arr[i]) === 1) && ((arr[i+2] - arr[i+1]) === 1)){
      result += arr[i] + "-";
      isDash = true;
    } else {
      isDash = false;
      result += arr[i] + ",";
    }
   }
   return result;
 }
 console.log(out(arr));