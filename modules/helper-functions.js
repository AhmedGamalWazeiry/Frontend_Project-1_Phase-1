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

function applyTap(tab) {
  tab = tab.replace(/\s/g, "");
  if (tab === "aws") tab += "certification";
  return tab;
}
function matchAllScreens(mapCourses, tabs, ...screen) {
  if (screen[0][3].matches) {
    createSliding(1, tabs, mapCourses);
  } else if (screen[0][2].matches) {
    createSliding(2, tabs, mapCourses);
  } else if (screen[0][1].matches) {
    createSliding(3, tabs, mapCourses);
  } else if (screen[0][0].matches) {
    createSliding(4, tabs, mapCourses);
  } else {
    createSliding(5, tabs, mapCourses);
  }
}
function tabsFilter(filter, text) {
  const istrue = text.includes(filter);
  return istrue;
}

function createSliding(frameCoursesNumber, tabs, mapCourses) {
  tabs.forEach((tab) => {
    tab = applyTap(tab);

    const allTabCourses = mapCourses.get(tab);

    // Create div carousel for specific tab
    const getCarouselInner_Id = "#carousel-" + tab;
    const getCarouselInner = document.querySelector(getCarouselInner_Id);

    const activeFrame = getCarouselInner.querySelector(".active");

    // Calculate the number of frames.
    const getCarouselInner_Length = getCarouselInner.children.length;
    const framesNumber = Math.ceil(allTabCourses.length / frameCoursesNumber);

    // Remove all old frames;
    for (let i = 0; i < getCarouselInner_Length; i++) {
      const removeframe = getCarouselInner.querySelector("#f" + i);
      getCarouselInner.removeChild(removeframe);
    }

    // Create new frames and set active frame.
    let Found_Active_Frame = 1;
    for (let i = 0; i < framesNumber; i++) {
      const newFrame = document.createElement("div");
      newFrame.id = "f" + i;
      if (activeFrame != undefined && newFrame.id == activeFrame.id) {
        Found_Active_Frame = 0;
        newFrame.className = "carousel-item active row";
      } else if (i == framesNumber - 1 && Found_Active_Frame) {
        newFrame.className = "carousel-item active row";
      } else newFrame.className = "carousel-item row";
      getCarouselInner.append(newFrame);
    }

    // Add courses to frames.
    let frameID = -1;
    for (let i = 0; i < allTabCourses.length; i++) {
      const isFalse = i % frameCoursesNumber;
      if (!isFalse) {
        frameID++;
      }
      const getFrame = getCarouselInner.querySelector("#f" + frameID);
      getFrame.append(allTabCourses[i]);
    }

    // If the last frame is incomplete, Courses in the first frame will be added.
    if (framesNumber - 1 != 0) {
      const lastFrame = getCarouselInner.querySelector(
        "#f" + (framesNumber - 1)
      );
      rollCourses(lastFrame, frameCoursesNumber, allTabCourses);
    }
  });
}

function rollCourses(lastFrame, frameCoursesNumber, allTabCourses) {
  let lastFrameCourses = lastFrame.children.length;
  let courseFirstframe = 0;
  while (lastFrameCourses < frameCoursesNumber) {
    lastFrameCourses++;
    const cloneCourse = allTabCourses[courseFirstframe].cloneNode(true);
    lastFrame.append(cloneCourse);
    courseFirstframe++;
  }
}

export {
  set_Elments,
  set_Attribute,
  set_FullStar,
  set_emptyStar,
  set_halfStar,
  matchAllScreens,
  applyTap,
  tabsFilter,
  rollCourses,
};
