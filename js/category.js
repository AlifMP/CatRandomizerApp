$(document).ready(function () {
  $.ajax({
    url: "https://api.thecatapi.com/v1/categories",
    type: "get",
    dataType: "json",
    headers: {
      "content-type": "application/json",
      "x-api-key": "live_dKOiebFbcgicJcEa8QpoX9xfQqTstrOc8naoCDQX60KuKc3AG9ZDOmVvntYlpXmW",
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
        <h1 class="text-center">Cannot Load Cute Cats</h1>
        </div>
        `);
      }
    },
  });
  loadCuteImages();
});

function loadCuteImages() {
  $.ajax({
    url: "https://api.thecatapi.com/v1/images/search",
    type: "get",
    dataType: "json",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "live_dKOiebFbcgicJcEa8QpoX9xfQqTstrOc8naoCDQX60KuKc3AG9ZDOmVvntYlpXmW",
    },
    data: {
      limit: 20,
    },
    success: function (result) {
      if (result.length > 0) {
        var imagecutes = "";
        result.forEach(function (yoi) {
          imagecutes += `
          <div class="row-img">
            <img src="${yoi.url}" class="img-fluid mb-3" value="${yoi.id}">
            <div class="layer">
            <button type="submit" onclick="downloadImage('${yoi.url}')">Download Now</button>
            </div>
          </div>
          `;
        });
        $("#cutes-list").html(imagecutes);
      } else {
        $("#cutes-list").html(`
        <div class="col">
              <h1 class="text-center">Cannot Load Images</h1>
            </div>
          `);
      }
    },
  });
}

$("#select-cutes").on("change", function () {
  var cutesID = $(this).val();
  if (cutesID !== "Choose One") {
    $.ajax({
      url: "https://api.thecatapi.com/v1/images/search",
      type: "get",
      dataType: "json",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "live_JHh5fc8DbXJkBwzmTEYT0u5r2cMOCGt2XfFM0nW8ATZNVMxTUSVK0QFcWGXjCb8I",
      },
      data: {
        limit: 100,
        category_ids: cutesID,
      },
      success: function (hasil) {
        if (hasil.length > 0) {
          var imagesHTML = "";
          hasil.forEach(function (image) {
            imagesHTML += `
              <div class="row-img">
                <img src="${image.url}" class="img-fluid mb-3" value="${image.id}">
                <div class="layer">
                  <button type="submit" onclick="downloadImage('${image.url}')">Download Now</button>
                </div>
              </div>
            `;
          });
          $("#cutes-list").html(imagesHTML);
        } else {
          $("#cutes-list").html(`
            <div class="col">
              <h1 class="text-center">Cannot Load Cute Cats</h1>
            </div>
          `);
        }
      },
    });
  } else {
    loadCuteImages();
  }
});

function downloadImage(imageURL) {
  var link = document.createElement("a");
  link.href = imageURL;
  link.download = "cute-cat-image.jpg";
  link.target = "_blank";
  link.click();
}
