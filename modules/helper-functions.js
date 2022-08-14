function set_Elments(course, class_Name, value) {
  if (class_Name === ".id" || class_Name === ".link") return;

  const element = course.querySelector(class_Name);
  element.textContent = value;
  if (class_Name === ".rating") {
    const ratingBox = course.querySelector(".rating-box");
    let num = Math.floor(value);
    let num_ceil = 5 - Math.ceil(value);
    set_FullStar(course, ratingBox, num);
    if (!Number.isInteger(value)) {
      set_halfStar(course, ratingBox, num);
    }
    if (num_ceil > 0) {
      set_emptyStar(course, ratingBox, num_ceil);
    }
  }
}

function set_Attribute(course, class_Name, ...a) {
  const element = course.querySelector(class_Name);

  for (let ele = 0; ele < a.length; ele += 2) {
    element.setAttribute(a[ele], a[ele + 1]);
  }
}
function set_FullStar(course, ratingBox, value) {
  const full_Star_Template = course.querySelector("#full-star-temp");
  for (let i = 0; i < value; i++) {
    let star = full_Star_Template.content.cloneNode(true).children[0];
    ratingBox.insertBefore(star, ratingBox.children[1]);
  }
}

function set_halfStar(course, ratingBox, num) {
  const half_Star_Template = course.querySelector("#half-star-temp");
  let halfstar = half_Star_Template.content.cloneNode(true).children[0];

  ratingBox.insertBefore(halfstar, ratingBox.children[num + 1]);
}

function set_emptyStar(course, ratingBox, value) {
  const empty_Star_Template = course.querySelector("#empty-star-temp");
  let next_node = 5 - value + 1;
  for (let i = 0; i < value; i++) {
    let emptystar = empty_Star_Template.content.cloneNode(true).children[0];
    ratingBox.insertBefore(emptystar, ratingBox.children[next_node]);
  }
}

function show_OneItem(changer, courses, textserach) {
  let bool = 0;
  courses.forEach((ele) => {
    const isvisible = ele.title.toLowerCase().includes(textserach);
    if (isvisible) {
      if (!bool) {
        bool = 1;
      } else {
        ele.course.classList.toggle("hide", !changer);
      }
    }
  });
}

export {
  set_Elments,
  set_Attribute,
  set_FullStar,
  set_emptyStar,
  set_halfStar,
  show_OneItem,
};
