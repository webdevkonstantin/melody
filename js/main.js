$(document).ready(function () {
  var currentFloor = 2;
  var counterUp = $(".counter__btn_up");
  var counterDown = $(".counter__btn_down");
  var floorPath = $(".building__img path");
  var modal = $(".modal");
  var floorCounter = $(".counter__value, .modal-counter");
  var viewFlatsButton = $(".view-flats-btn");
  var flatPath = $(".flats-img path");
  var flatLink = $(".flat-link");
  var currentFlat = 1;

  floorPath.on("mouseover", function () {
    floorPath.removeClass("active");
    currentFloor = $(this).attr("data-floor");
    floorCounter.text(currentFloor);
    // $(`[data-floor=${currentFloor}]`).toggleClass("active");
  });

  floorPath.on("click", toggleModal);
  viewFlatsButton.on("click", toggleModal);

  counterUp.on("click", function () {
    if (currentFloor < 18) {
      currentFloor++;
      var usCurrentFloor = currentFloor.toLocaleString("en-Us", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      floorCounter.text(usCurrentFloor);
      floorPath.removeClass("active");
      $(`[data-floor=${usCurrentFloor}]`).toggleClass("active");
    }
  });

  counterDown.on("click", function () {
    if (currentFloor > 2) {
      currentFloor--;
      var usCurrentFloor = currentFloor.toLocaleString("en-Us", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      floorCounter.text(usCurrentFloor);
      floorPath.removeClass("active");
      $(`[data-floor=${usCurrentFloor}]`).toggleClass("active");
    }
  });

  modal.on("click", function (e) {
    var target = e.target;
    if (!target.closest(".modal-dialog") || target.closest(".modal-close-btn")) {
      toggleModal();
    }
  });

  flatPath.on("mouseover", setActiveFlat);
  flatLink.on("mouseover", setActiveFlat);
  flatPath.on("mouseleave", removeActiveFlat);
  flatLink.on("mouseleave", removeActiveFlat);

  function removeActiveFlat() {
    flatPath.removeClass("active");
    flatLink.removeClass("active");
  }

  function setActiveFlat() {
    var currentData = $(this).data();

    flatPath.removeClass("active");
    flatLink.removeClass("active");
    currentFlat = Object.values(currentData)[0];
    $(`[data-flat-path=${currentFlat}]`).toggleClass("active");
    $(`[data-flat-link=${currentFlat}]`).toggleClass("active");
  }

  function toggleModal() {
    var currentDozen = parseInt(currentFloor) - 2;
    var currentDozenFlats = currentDozen * 10;

    modal.toggleClass("is-open");

    flatLink.each(function (index) {
      var flatNumber = $(this).children(".flat-number");
      var currentFlatNumber = currentDozenFlats + index + 1;

      var uscurrentFlatNumber = currentFlatNumber.toLocaleString("en-Us", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });

      flatNumber.text("");
      flatNumber.text(uscurrentFlatNumber);
    });
  }
});
