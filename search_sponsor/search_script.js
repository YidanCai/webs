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
        icon.onclick = ()=>{
            // webLink = `https://www.google.com/search?q=${userData}`;
            // linkTag.setAttribute("href", webLink);
            // linkTag.click();
            outputBox.querySelector(".autocorrection").innerHTML = "";

            if (suggestions.includes(userData) || suggestions.includes(userData + ' B.V.')) {
                outputBox.querySelector(".response1").innerHTML = "Yes! ";
                outputBox.querySelector(".companyName").innerHTML = "\xa0" + userData + "\xa0";
                outputBox.querySelector(".endSentence").innerHTML = "\xa0is a recognized sponsor";
            } else {
                outputBox.querySelector(".response1").innerHTML = "";
                outputBox.querySelector(".companyName").innerHTML = "\xa0" + userData + "\xa0";
                outputBox.querySelector(".endSentence").innerHTML = " \xa0is Not a recognized sponsor";
                autocorrectArray = suggestions.filter((data) => {
                    return data.split(" ").map((element) => {return element.toLocaleLowerCase();}).includes(userData.toLocaleLowerCase());
                });
                if (autocorrectArray.length>0) {
                    outputBox.querySelector(".autocorrection").innerHTML = "<p>Do you mean the following recognized sponsor(s)?</p>";
                    function autoList(value){
                        outputBox.querySelector(".autocorrection").innerHTML += "<p>"+value+"<\p>" ;
                    }
                    autocorrectArray.forEach(autoList);
                }

            }

        }
        emptyArray = suggestions.filter((data)=>{
            //suggestion autocomplete: start with the same characters
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });

        commonStringArray = suggestions.filter((data)=>{
            //suggestion autocomplete: common string length larger than 4
            return LCSubStr(data.toLocaleLowerCase(),userData.toLocaleLowerCase(),data.length,userData.length) > 4
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
function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = ()=>{
        if(suggestions.includes(selectData)){
            outputBox.querySelector(".response1").innerHTML = "Yes! ";
            outputBox.querySelector(".companyName").innerHTML = "\xa0" + selectData + "\xa0";
            outputBox.querySelector(".endSentence").innerHTML = "\xa0is a recognized sponsor";
        }
        else{
            outputBox.querySelector(".response1").innerHTML = "";
            outputBox.querySelector(".companyName").innerHTML = "\xa0" + selectData + "\xa0";
            outputBox.querySelector(".endSentence").innerHTML = " \xa0is Not a recognized sponsor";

        }
        // webLink = `https://www.google.com/search?q=${selectData}`;
        // linkTag.setAttribute("href", webLink);
        // linkTag.click();
    }
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