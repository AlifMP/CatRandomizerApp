$(document).ready(function () {
  $.ajax({
    url: "https://api.thecatapi.com/v1/categories",
    type: "get",
    dataType: "json",
    headers: {
      "content-type": "application/json",
      "x-api-key": "live_JHh5fc8DbXJkBwzmTEYT0u5r2cMOCGt2XfFM0nW8ATZNVMxTUSVK0QFcWGXjCb8I",
    },
    data: {
      limit: 100,
    },
    success: function (hasil) {
      if (hasil.length > 0) {
        hasil.forEach(function (cutes) {
          $("#select-cutes").append(`<option value="${cutes.id}" style="text-transform: capitalize;">${cutes.name}</option>`);
        });
      } else {
        $("#cutes-list").html(`
                    <div class="col">
                        <h1 class="text-center">Cannot Load Your Favourite Cat Pictures</h1>
                    </div>
                `);
      }
    },
  });
});

$("#select-cutes").on("change", function () {
  var cutesID = $(this).val();
  if (cutesID !== "Choose One") {
    $.ajax({
      url: "https://api.thecatapi.com/v1/images/search",
      type: "get",
      dataType: "json",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "live_dKOiebFbcgicJcEa8QpoX9xfQqTstrOc8naoCDQX60KuKc3AG9ZDOmVvntYlpXmW",
      },
      data: {
        limit: 100,
        category_ids: cutesID,
      },
      success: function (hasil) {
        if (hasil.length > 0) {
          var imagesHTML = "";
          hasil.forEach(function (image) {
            imagesHTML += `<img src="${image.url}" class="img-fluid mb-3 md-4" style="width: 430px; height: 430px; margin-left: auto; margin-right: auto;">`;
          });
          $("#cutes-list").html(imagesHTML);
        } else {
          $("#cutes-list").html(`
            <div class="col">
                <h1 class="text-center">Cannot Load Your Favourite Cat Pictures</h1>
            </div>
          `);
        }
      },
    });
  } else {
    $("#fav-h5").html(`
            <h5 class="text-center mb-4" id="fav-h5">There Are No Cat Photos That You Like</h5>
        `);
  }
});
