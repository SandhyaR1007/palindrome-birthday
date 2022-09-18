let inputDate = document.querySelector("#input-date");
let btnCheck = document.querySelector("#btn-check");
let result = document.querySelector("#result");
btnCheck.addEventListener("click", function () {
  if (inputDate.value == "") {
    result.innerText = "Please select a date";
  } else {
    let givenDate = getDate(inputDate.value);
    givenDate = numberToStr(givenDate);

    if (checkPalindromeForAllDateFormats(givenDate)) {
      result.innerText = "Congrats your birthday is a Palindrome  🎊🥳";
    } else {
      let { date, noOfDays } = getNextPalindromeDate(givenDate);

      result.innerText = `😅 Birthday not Palindrome.\n Next palindrome date is ${
        date.day
      }-${date.month}-${date.year}, you missed by ${noOfDays} ${
        noOfDays == 1 ? "day" : "days"
      }`;
    }
  }
});
function getDate(date) {
  let dateArr = date.split("-");

  return { day: dateArr[2], month: dateArr[1], year: dateArr[0] };
}

function reverseString(str) {
  let reversedStr = str.split("").reverse().join("");
  return reversedStr;
}
function isPalindrome(str) {
  return str == reverseString(str);
}

function numberToStr(date) {
  let day = date.day.toString();
  let month = date.month.toString();
  let year = date.year.toString();
  if (month < 10 && month.length == 1) {
    month = "0" + month;
  }
  return { day, month, year };
}
function isLeapYear(year) {
  let flag = false;
  if ((year % 4 == 0 && year % 100 == 0) || year % 400 == 0) {
    flag = true;
  }

  return flag;
}
function getAllDateFormats(date) {
  let convertedDate = numberToStr(date);

  let arr = [];
  let ddmmyyyy = convertedDate.day + convertedDate.month + convertedDate.year;
  arr.push(ddmmyyyy);
  let mmddyyyy = convertedDate.month + convertedDate.day + convertedDate.year;
  arr.push(mmddyyyy);
  let yyyymmdd = convertedDate.year + convertedDate.month + convertedDate.day;
  arr.push(yyyymmdd);

  return arr;
}

function checkPalindromeForAllDateFormats(date) {
  let listOfPalindromes = getAllDateFormats(date);
  console.log({ listOfPalindromes });
  let arr = [];
  let flag = false;

  for (let i = 0; i < listOfPalindromes.length; i++) {
    if (isPalindrome(listOfPalindromes[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function getNextDate(obj) {
  let date = numberToStr(obj);

  let day = date.day;
  let month = date.month;
  let year = date.year;
  let monthsArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month == "02") {
    if (isLeapYear(year)) {
      if (day < 29) {
        day++;
      } else {
        day = 1;
        month++;
      }
    } else {
      if (day < 28) {
        day++;
      } else {
        day = 1;
        month++;
      }
    }
  } else {
    if (day < monthsArr[month - 1]) {
      day++;
    } else {
      day = 1;
      if (month < 12) {
        month++;
      } else {
        month = 1;
        year++;
      }
    }
  }

  return numberToStr({ day, month, year });
}

function getNextPalindromeDate(obj) {
  let date = obj;
  let found = false;
  let noOfDays = 0;

  while (!found) {
    if (checkPalindromeForAllDateFormats(date)) {
      date = date;
      found = true;
    } else {
      date = getNextDate(date);

      noOfDays++;
    }
  }
  return { date, noOfDays };
}
