import {
  set_Elments,
  set_Attribute,
  show_OneItem,
} from "./modules/helper-functions.js";

const courseTemplate = document.querySelector("#course-temp");
const coursesList = document.querySelector(".courses-list");
const form = document.getElementsByClassName("search-bar")[0];
const mxql = window.matchMedia("(max-width: 800px)");
let change = 0;
let courses = [];
let textserach = "";

form.addEventListener(
  "submit",
  (e) => {
    e.preventDefault();
    textserach = document
      .getElementsByClassName("search-box")[0]
      .value.toLowerCase();
    courses.forEach((ele) => {
      const isvisible = ele.title.toLowerCase().includes(textserach);
      ele.course.classList.toggle("hide", !isvisible);
    });
  },
  false
);

mxql.addEventListener("change", () => {
  show_OneItem(change, courses, textserach);
  change = !change;
});
fetch("http://localhost:3000/courses")
  .then((res) => res.json())
  .then((json) => {
    courses = json.map((data) => {
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
      coursesList.append(course);
      return { title: data["title"], course: course };
    });
  });
