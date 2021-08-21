// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
const outputBox = document.querySelector(".search-output")
let linkTag = searchWrapper.querySelector("a");
let webLink;
// if user press any key and release
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //user entered data
    let emptyArray = [];
    let commonStringArray = [];
    let autocorrectArray =[];
    if(userData){
        suggBox.style.display= "block";
        clickCheckButton(userData);

        emptyArray = suggestions.filter((data)=>{
            //suggestion autocomplete: start with the same characters
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });

        commonStringArray = suggestions.filter((data)=>{
            //suggestion autocomplete: common string length larger than half of the data length
            return LCSubStr(data.toLocaleLowerCase(),userData.toLocaleLowerCase(),data.length,userData.length) > data.length/2
                && !data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.concat(commonStringArray)
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}
inputBox.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        icon.click();
    }
});

function clickCheckButton(userData){
    let autocorrectArray = [];
    icon.onclick = ()=>{
        // webLink = `https://www.google.com/search?q=${userData}`;
        // linkTag.setAttribute("href", webLink);
        // linkTag.click();
        outputBox.querySelector(".autocorrection").innerHTML = "";
        outputBox.querySelector(".auto-list").innerHTML = "";
        outputBox.querySelector(".auto-list").style.setProperty('--show',"none");
        let lowercaseSuggestions = [];
        lowercaseSuggestions = suggestions.map((data)=> {
            return data.toLocaleLowerCase();
        })

        if (lowercaseSuggestions.includes(userData.toLocaleLowerCase()) ||
            lowercaseSuggestions.includes((userData + ' B.V.').toLocaleLowerCase())) {
            outputBox.querySelector(".response1").innerHTML = "Yes! ";
            outputBox.querySelector(".companyName").innerHTML = "\xa0" + userData + "\xa0";
            outputBox.querySelector(".endSentence").innerHTML = "\xa0is a recognized sponsor";

        } else {
            outputBox.querySelector(".response1").innerHTML = "";
            outputBox.querySelector(".companyName").innerHTML = "\xa0" + userData + "\xa0";
            outputBox.querySelector(".endSentence").innerHTML = " \xa0is Not a recognized sponsor name";
            autocorrectArray = suggestions.filter((data) => {
                return data.split(" ").map((element) => {return element.toLocaleLowerCase();}).includes(userData.toLocaleLowerCase());
            });
            if (autocorrectArray.length>0) {
                outputBox.querySelector(".autocorrection").innerHTML = "<i>Do you mean the following recognized sponsor(s)?</i>";
                function autoList(value){
                    outputBox.querySelector(".auto-list").innerHTML += "<p>"+value+"<\p>" ;
                }
                autocorrectArray.forEach(autoList);
                outputBox.querySelector(".auto-list").style.setProperty('--show',"block");
            }
        }
    }
}
function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    clickCheckButton(selectData);
    searchWrapper.classList.remove("active");
}
function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;

    }
    else{
      listData = list.join('');


    }

    suggBox.innerHTML = listData;

}


document.onclick = e => {
    //if click somewhere else other than the input box then hide the suggestion box
    var t = e.target;
    var exceptDiv = searchWrapper.querySelector("input");
    if (t != exceptDiv && inputBox.value) {
        //clicked oustide of div
        suggBox.style.display= "none";
    }
    else if( t== exceptDiv){
        suggBox.style.display= "block";
    }


}