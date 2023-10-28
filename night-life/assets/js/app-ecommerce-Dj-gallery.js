/**
 * app-ecommerce-product-list
 */

'use strict';

// Datatable (jquery)
$(function () {
  let borderColor, bodyBg, headingColor;

  if (isDarkStyle) {
    borderColor = config.colors_dark.borderColor;
    bodyBg = config.colors_dark.bodyBg;
    headingColor = config.colors_dark.headingColor;
  } else {
    borderColor = config.colors.borderColor;
    bodyBg = config.colors.bodyBg;
    headingColor = config.colors.headingColor;
  }

  // Variable declaration for table
  var dt_product_table = $('.datatables-products'),
    productAdd = 'product-add.html',
    statusObj = {
      1: { title: 'Scheduled', class: 'bg-label-warning' },
      2: { title: 'Publish', class: 'bg-label-success' },
      3: { title: 'Inactive', class: 'bg-label-danger' }
    },
    categoryObj = {
      0: { title: 'Household' },
      1: { title: 'Office' },
      2: { title: 'Electronics' },
      3: { title: 'Shoes' },
      4: { title: 'Accessories' },
      5: { title: 'Game' }
    },
    stockObj = {
      0: { title: 'Out_of_Stock' },
      1: { title: 'In_Stock' }
    },
    stockFilterValObj = {
      0: { title: 'Out of Stock' },
      1: { title: 'In Stock' }
    };
let user = document.getElementById("user")
let promoter = document.getElementById("promoter")
let dj = document.getElementById("dj")
  // E-commerce Products datatable

  if (dt_product_table.length) {
    var dt_products = dt_product_table.DataTable({
      ajax: assetsPath + 'json/ecommerce-product-list.json', // JSON file to add data
      columns: [
        { data: 'id' },
        { data: 'id' },
        { data: 'product_name' }, // Product column
        { data: 'review' }, // Section column
        { data: 'rate' }, // Date column
       
        { data: '' } // Action column
      ],
      columnDefs: [
        {
          // For Responsive
          className: 'control',
          searchable: false,
          orderable: false,
          responsivePriority: 2,
          targets: 0,
          render: function (data, type, full, meta) {
            return '';
          }
        },
        {
          // For Checkboxes
          targets: 1,
          orderable: false,
          checkboxes: {
            selectAllRender: '<input type="checkbox" class="form-check-input">'
          },
          render: function () {
            return '<input type="checkbox" class="dt-checkboxes form-check-input" >';
          },
          searchable: false
        },
        {
          // Section (Customization)
          targets: 2,
          responsivePriority: 5,
          render: function (data, type, full, meta) {
            return '<img class="logo" src="/assets/img/NIGHTLIFE.png">';

          

          }
        },
        {
          // Section (Customization)
          targets: 3,
          responsivePriority: 5,
          render: function (data, type, full, meta) {
            return "It was good though";

          }
        },
      
        {
          // Date (Customization)
          targets: 4,
          orderable: false,
          responsivePriority: 3,
          render: function (data, type, full, meta) {
            return "20-05-2023";
          }
        },
        
        
       
        {
          // Actions (Customization)
          targets: 5,
          title: 'Actions',
          searchable: false,
          orderable: false,
          render: function (data, type, full, meta) {
            return (
                '<div style="display: flex !important; gap: 1rem !important; " class="d-inline-block text-nowrap">' +
                '<i class="fas fa-edit"></i> ' + 
                '<i class="fas fa-trash-alt"></i>' +
                '</div>'
            );
          }
        }
      ]
    });
  }
  function updateColumns(name, review, rate) {
    dt_products.column(2).nodes().each(function (node, index, dt) {
      $(node).html(name);
    });

    dt_products.column(3).nodes().each(function (node, index, dt) {
      $(node).html(review);
    });

    dt_products.column(4).nodes().each(function (node, index, dt) {
      $(node).html(rate);
    });

    dt_products.column(5).nodes().each(function (node, index, dt) {
      // You can update the Actions column content here if needed
      $(node).html( '<i class="fas fa-edit"></i> ' + 
    '<i class="fas fa-trash-alt"></i>');
    });
  }

  // Listen for tab change events and update the columns
  $('#homeTab').on('click', function () {
    updateColumns('<img class="logo" src="/assets/img/NIGHTLIFE.png">', 'It was Amazing, excellent experience', '10-05-2020');
  });

  $('#profileTab').on('click', function () {
    updateColumns('<img class="logo" src="/assets/img/NIGHTLIFE.png">', 'It was better', '15-02-2022');
  });

  $('#messagesTab').on('click', function () {
    updateColumns('<img class="logo" src="/assets/img/NIGHTLIFE.png">', 'I would give 4 stars', '20-10-2020');
  });
  // Delete Record
  $('.datatables-products tbody').on('click', '.delete-record', function () {
    dt_products.row($(this).parents('tr')).remove().draw();
  });

  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(() => {
    $('.dataTables_filter .form-control').removeClass('form-control-sm');
    $('.dataTables_length .form-select').removeClass('form-select-sm');
  }, 300);
});
