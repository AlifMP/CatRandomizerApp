// Windows Load index
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

// Menangani perubahan opsi pada select-breed
$("#select-breed").on("change", function () {
  var breedID = $(this).val();
  if (breedID !== "Choose Breeds") {
    // Mengambil detail breed berdasarkan id breed yang dipilih
    $.ajax({
      url: "https://api.thecatapi.com/v1/breeds/" + breedID,
      type: "get",
      dataType: "json",
      headers: {
        "content-type": "application/json",
        "x-api-key": "live_dKOiebFbcgicJcEa8QpoX9xfQqTstrOc8naoCDQX60KuKc3AG9ZDOmVvntYlpXmW",
      },
      success: function (breed) {
        // Mengambil foto berdasarkan breed ID
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
              // Menampilkan data breed dan image jika berhasil
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

// $('.nav-link').on('click', function() {
//     $('.nav-link').removeClass('active');
//     $(this).addClass('active');
// });

// $(document).ready(function() {
//     // Mengambil data breed dan image secara bersamaan
//     $.ajax({
//       url: 'https://api.thecatapi.com/v1/breeds',
//       type: 'get',
//       dataType: 'json',
//       headers: {
//         'content-type': 'application/json',
//         'x-api-key': 'live_dKOiebFbcgicJcEa8QpoX9xfQqTstrOc8naoCDQX60KuKc3AG9ZDOmVvntYlpXmW'
//       },
//       data: {
//         'limit': 100,
//       },
//       success: function(breeds) {
//         if (breeds.length > 0) {
//           breeds.forEach(function(breed) {
//             var breedID = breed.id;

//             // Mengambil detail breed berdasarkan id breed yang dipilih
//             $.ajax({
//               url: 'https://api.thecatapi.com/v1/images/search',
//               type: 'get',
//               dataType: 'json',
//               headers: {
//                 'content-type': 'application/json',
//                 'x-api-key': 'live_dKOiebFbcgicJcEa8QpoX9xfQqTstrOc8naoCDQX60KuKc3AG9ZDOmVvntYlpXmW'
//               },
//               data: {
//                 'breed_ids': breedID,
//                 'limit': 5
//               },
//               success: function(images) {
//                 var image = images[0, 1, 2, 3, 4, 5];
//                 // Menampilkan data breed dan image jika berhasil
//                 $('#breed-list').append(`
//                   <div class="card mb-3" style="max-width: auto; max-height: auto;">
//                     <div class="row g-0">
//                       <div class="col-md-4">
//                         <img src="${image.url}" class="img-fluid rounded-start" style="margin-left: -12px; width: 100%; height: 100%;">
//                       </div>
//                       <div class="col-md-8">
//                         <div class="card-body" style="">
//                           <h5 class="card-title">${breed.name}</h5>
//                           <p class="card-text">${breed.origin}</p>
//                           <p class="card-text">${breed.description}</p>
//                           <p class="card-text">Life Span: ${breed.life_span}</p>
//                           <p class="card-text"><small class="text-body-secondary">${breed.temperament}</small></p>
//                           <a href="${breed.wikipedia_url}" target="_blank" class="btn btn-primary">Detail Wiki</a>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 `);
//               },
//               error: function() {
//                 // Menampilkan pesan jika gagal mengambil data image
//                 $('#breed-list').append(`
//                   <div class="col">
//                     <h1 class="text-center">Cannot Load Breed Image</h1>
//                   </div>
//                 `);
//               }
//             });
//           });
//         } else {
//           // Menampilkan pesan jika tidak ada data breed
//           $('#breed-list').html(`
//             <div class="col">
//               <h1 class="text-center">Cannot Load Breeds</h1>
//             </div>
//           `);
//         }
//       },
//       error: function() {
//         // Menampilkan pesan jika gagal mengambil data breed
//         $('#breed-list').html(`
//           <div class="col">
//             <h1 class="text-center">Cannot Load Breeds</h1>
//           </div>
//         `);
//       }
//     });
//   });

// $(document).ready(function() {
//     var breedID;

//     // Mengambil data breed
//     $.ajax({
//       url: 'https://api.thecatapi.com/v1/breeds',
//       type: 'get',
//       dataType: 'json',
//       headers: {
//         'content-type': 'application/json',
//         'x-api-key': 'live_dKOiebFbcgicJcEa8QpoX9xfQqTstrOc8naoCDQX60KuKc3AG9ZDOmVvntYlpXmW'
//       },
//       data: {
//         'limit': 100,
//       },
//       success: function(result) {
//         if (result.length > 0) {
//           result.forEach(function(breed) {
//             $('#select-breed').append('<option value="' + breed.id + '">' + breed.name + '</option>');
//           });
//         } else {
//           $('#breed-list').html(`
//             <div class="col">
//               <h1 class="text-center">Cannot Load Breeds</h1>
//             </div>
//           `);
//         }
//       },
//       complete: function() {
//         // Setelah permintaan breed selesai, ambil data image berdasarkan breed yang dipilih
//         breedID = $('#select-breed').val();
//         if (breedID !== 'Choose Breeds') {
//           getImagesByBreedID(breedID);
//         }
//       }
//     });

//     // Fungsi untuk mengambil data image berdasarkan breed ID
//     function getImagesByBreedID(breedID) {
//       $.ajax({
//         url: 'https://api.thecatapi.com/v1/images/search',
//         type: 'get',
//         dataType: 'json',
//         headers: {
//           'content-type': 'application/json',
//           'x-api-key': 'live_dKOiebFbcgicJcEa8QpoX9xfQqTstrOc8naoCDQX60KuKc3AG9ZDOmVvntYlpXmW'
//         },
//         data: {
//           'breed_ids': breedID,
//           'limit': 5
//         },
//         success: function(result) {
//           if (result.length > 0) {
//             result.forEach(function(image) {
//               $('#breed-list').append('<img src="' + image.url + '" class="img-fluid mb-3">');
//             });
//           } else {
//             $('#breed-list').html(`
//               <div class="col">
//                 <h1 class="text-center">Cannot Load Images</h1>
//               </div>
//             `);
//           }
//         }
//       });
//     }

//     // Menangani perubahan opsi pada select-breed
//     $('#select-breed').on('change', function() {
//       breedID = $(this).val();
//       if (breedID !== 'Choose Breeds') {
//         // Hapus gambar yang ada sebelumnya
//         $('#breed-list').empty();
//         // Ambil data image berdasarkan breed yang dipilih
//         getImagesByBreedID(breedID);
//       } else {
//         // Jika tidak ada breed yang dipilih, hapus gambar
//         $('#breed-list').empty();
//       }
//     });
//   });
