import createElement from "./createElement";
import forEachElem from "./forEachElem";
import { insertAfter } from "./extensions";

const attachEditBehavior = el => {
  const createInput = () => {
    const elStyle = getComputedStyle(el);
    const prevDisplay = el.style.display;

    const input = createElement("input", {
      type: "text",
      value: el.innerText,
      style: {
        fontSize: elStyle.fontSize,
        fontWeight: elStyle.fontWeight
      },
      onkeydown: ev => {
        if (ev.key === "Enter" || ev.code === "NumpadEnter") {
          if (!input.value) alert("can't be empty!");
          else {
            el.innerText = input.value;
            el.style.display = prevDisplay;
            input.parentNode.remove();
            forEachElem(".actionContainer")(ac => ac.remove());
          }
        }
      }
    });

    return createElement("div", {
      className: "input",
      children: [input]
    });
  };

  el.addEventListener("dblclick", ev => {
    const input = createInput();
    insertAfter(el, input);
    input.firstChild.focus();
    el.style.display = "none";
    ev.stopPropagation();
    forEachElem(".actionContainer")(ac => ac.remove());
  });
};

export default attachEditBehavior;
