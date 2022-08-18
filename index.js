import {
  set_Elments,
  set_Attribute,
  matchAllScreens,
  applyTap,
  tabsFilter,
} from "./modules/helper-functions.js";

const courseTemplate = document.querySelector("#course-temp");
const matchFourCourses = window.matchMedia("(max-width: 1200px)");
const matchThreeCourses = window.matchMedia("(max-width: 1080px)");
const matchTwoCourses = window.matchMedia("(max-width: 850px)");
const matchOneCourses = window.matchMedia("(max-width: 740px)");
const tapsNodes = document.querySelectorAll("#pills-tab li");
const tapsNodesArray = Array.from(tapsNodes);
const mapCourses = new Map();
let allCourses = [];
let tabsCourses = [
  "python",
  "drawing",
  "data science",
  "aws",
  "javascript",
  "web development",
  "excel",
];
const matchesScreen = [
  matchFourCourses,
  matchThreeCourses,
  matchTwoCourses,
  matchOneCourses,
];

tabsCourses.forEach((tab) => {
  tab = applyTap(tab);
  mapCourses.set(tab, []);
});

tapsNodesArray.forEach((tap) => {
  tap.addEventListener("click", function (e) {
    let x = tap.querySelector("button").textContent;
  });
});

matchesScreen.forEach((screen) => {
  screen.addEventListener("change", () => {
    matchAllScreens(mapCourses, tabsCourses, matchesScreen);
  });
});

fetch("http://localhost:3000/courses")
  .then((res) => res.json())
  .then((json) => {
    allCourses = json.map((data) => {
      const course = courseTemplate.content.cloneNode(true).children[0];
      for (let prop in data) {
        if (prop === "image") {
          set_Attribute(
            course,
            "img",
            "src",
            data[prop],
            "alt",
            data["title"] + " photo"
          );
        } else set_Elments(course, "." + prop, data[prop]);
      }

      return { title: data["title"], course: course };
    });

    allCourses.forEach((ele) => {
      tabsCourses.forEach((tab) => {
        let bol = tabsFilter(tab, ele.title.toLowerCase());
        if (bol) {
          tab = applyTap(tab);
          mapCourses.get(tab).push(ele.course);
        }
      });
    });
    matchAllScreens(mapCourses, tabsCourses, matchesScreen);
  });
