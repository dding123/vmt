// https://wiki.geogebra.org/en/SetPerspective_Command
const perspectiveMap = {
  Algebra: "A",
  "Probability Calculator": "B",
  CAS: "C",
  "Graphics 2": "D",
  Graphics: "G",
  "Construction Protocol": "L",
  Spreadsheet: "S",
  "3D Graphics": "T"
};

export const initPerspectiveListener = (
  document,
  currentPerspective,
  perspectiveChanged,
  store
) => {
  console.log("reinitiazlizing!");
  // console.log("SOTTT: ", store)
  var elements = document.getElementsByClassName("rightButtonPanel");
  elements[0].lastChild.removeEventListener("click", menuClickListener);
  elements[0].lastChild.addEventListener("click", menuClickListener);

  // let item;
  function menuClickListener() {
    console.log("menu clicked");
    var menuItems = document.getElementsByClassName("gwt-StackPanelItem");
    for (let item of menuItems) {
      if (item.lastChild.innerHTML.includes("Perspectives")) {
        item.removeEventListener("click", perspectiveClickListener);
        item.addEventListener("click", perspectiveClickListener);
      } else if (item.lastChild.innerHTML.includes("View")) {
        item.removeEventListener("click", viewClickListener);
        item.addEventListener("click", viewClickListener);
      }
    }

    function perspectiveClickListener() {
      console.log("perspective clicked");
      let perspective;
      for (perspective of this.nextSibling.firstChild.children) {
        perspective.removeEventListener("click", cb);
        perspective.addEventListener("click", cb);
      }

      function cb() {
        perspectiveChanged(perspectiveMap[perspective.textContent]);
      }
    }

    function viewClickListener() {
      for (let viewItem of this.nextSibling.firstChild.children) {
        if (Object.keys(perspectiveMap).indexOf(viewItem.textContent) > -1) {
          viewItem.removeEventListener("click", viewItemClickListener);
          viewItem.addEventListener("click", viewItemClickListener);
        }
      }

      function viewItemClickListener() {
        console.log("viewItem clicked");
        let newPerspective;
        let viewCode = this.textContent;
        console.log("View code: ", viewCode);
        // N.B. setTimeout 0 so the checkbox can update before we look at its value
        // you might think we could just check the opposite of its value (if its checked that means we're unchecking it)
        // however, at least one box always needs to be checked so clicking the sole checked box does not actually toggle
        // its value
        setTimeout(() => {
          let checkbox = this.firstChild.firstChild.firstChild.firstChild
            .firstChild.firstChild;
          console.log(checkbox);
          if (checkbox.checked) {
            console.log("CHECKED!");
            currentPerspective = `${currentPerspective}${
              perspectiveMap[viewCode]
            }`;
          } else {
            let regex = new RegExp(perspectiveMap[viewCode], "g");
            currentPerspective = currentPerspective.replace(
              perspectiveMap[viewCode],
              ""
            );
          }
          currentPerspective = currentPerspective.split("").sort();
          currentPerspective = [...new Set(currentPerspective)].join("");
          console.log(currentPerspective);
          perspectiveChanged(currentPerspective); // SOrt so the algebra window is on the right
        }, 0);
      }
    }
  }
};
