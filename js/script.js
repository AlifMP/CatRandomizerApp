$(document).ready(function () {
  $.ajax({
    url: "https://api.thecatapi.com/v1/breeds",
    type: "get",
    dataType: "json",
    headers: {
      "content-type": "application/json",
      "x-api-key": "live_dKOiebFbcgicJcEa8QpoX9xfQqTstrOc8naoCDQX60KuKc3AG9ZDOmVvntYlpXmW",
    },
    data: {
      limit: 100,
    },
    success: function (result) {
      if (result.length > 0) {
        result.forEach(function (breed) {
          $("#select-breed").append('<option value="' + breed.id + '">' + breed.name + "</option>");
        });
      } else {
        $("#breed-list").html(`
                    <div class="col">
                        <h1 class="text-center">Cannot Load Breeds</h1>
                    </div>
                `);
      }
    },
  });
});

$("#select-breed").on("change", function () {
  var breedID = $(this).val();
  if (breedID !== "Choose Breeds") {
    $.ajax({
      url: "https://api.thecatapi.com/v1/breeds/" + breedID,
      type: "get",
      dataType: "json",
      headers: {
        "content-type": "application/json",
        "x-api-key": "live_dKOiebFbcgicJcEa8QpoX9xfQqTstrOc8naoCDQX60KuKc3AG9ZDOmVvntYlpXmW",
      },
      success: function (breed) {
        $.ajax({
          url: "https://api.thecatapi.com/v1/images/search",
          type: "get",
          dataType: "json",
          headers: {
            "content-type": "application/json",
            "x-api-key": "live_dKOiebFbcgicJcEa8QpoX9xfQqTstrOc8naoCDQX60KuKc3AG9ZDOmVvntYlpXmW",
          },
          data: {
            breed_ids: breedID,
            limit: 3,
          },
          success: function (images) {
            if (images.length > 0 || breed.length > 0) {
              var image = images[0];

              $("#breed-list").html(`
                                <div class="card mb-3" style="max-width: auto; max-height: auto;">
                                    <div class="row g-0">
                                        <div class="col-md-4">
                                            <img src="${image.url}" class="img-fluid rounded-start" style="margin-left: -12px; width: 100%; height: 100%;">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body" style="">
                                                <h5 class="card-title">${breed.name}</h5>
                                                <p class="card-text">${breed.origin}</p>
                                                <p class="card-text">${breed.description}</p>
                                                <p class="card-text">Life Span: ${breed.life_span}</p>
                                                <p class="card-text"><small class="text-body-secondary">${breed.temperament}</small></p>
                                                <a href="${breed.wikipedia_url}" target="_blank" class="btn btn-primary">Detail Wiki</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `);
            } else {
              $("#breed-list").html(`
                                <div class="col">
                                    <h1 class="text-center">No Images And Breeds Found</h1>
                                </div>
                            `);
            }
          },
          error: function () {
            $("#breed-list").html(`
                            <div class="col">
                                <h1 class="text-center">Error Fetching Images</h1>
                            </div>
                        `);
          },
        });
      },
      error: function () {
        $("#breed-list").html(`
                    <div class="col">
                        <h1 class="text-center">Error Fetching Breed Details</h1>
                    </div>
                `);
      },
    });
  } else {
    $("#breed-list").html(`
            <div class="col">
                <h2 class="text-center">Please Choose One Of The Breeds</h2>
            </div>
        `);
  }
});
