import printMe from "../src/scripts/test"
import cardFirst from "../assets/covid-19.png"
import cardSecond from "../assets/python.png"

const imgFirst:any=document.querySelector(".imgFirst");
const imgSecond:any=document.querySelector(".imgSecond");
imgFirst.src=cardFirst;
imgSecond.src=cardSecond;
printMe();