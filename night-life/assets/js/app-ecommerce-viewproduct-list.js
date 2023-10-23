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

  // E-commerce Products datatable

  if (dt_product_table.length) {
    var dt_products = dt_product_table.DataTable({
      ajax: assetsPath + 'json/ecommerce-product-list.json', // JSON file to add data
      columns: [
        { data: 'id' },
        { data: 'id' },
        { data: 'product_name' }, // Product column
        { data: 'section' }, // Section column
        { data: 'date' }, // Date column
        { data: 'status' }, // Status column
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
            // Remove checkboxes
            targets: 2,
            orderable: false,
            render: function (data, type, full, meta) {
              var rowIndex = meta.row + 1; // Adding 1 to convert from 0-based to 1-based index
              return 'T' + rowIndex;
            },
            searchable: false
          },
        {
          // Section (Customization)
          targets: 3,
            render: function (data, type, full, meta) {
              // Generate a random price (e.g., between 10 and 100) and format it as a currency
              var randomPrice = (Math.random() * 90 + 10).toFixed(2);
              return '$' + randomPrice; // Assuming you want to format the price as a currency
            }
        },
      
       
        {
            // Status (Customization)
            targets: 4,
            render: function (data, type, full, meta) {
              // Generate a random price (e.g., between 10 and 100) and format it as a currency
              var randomPrice = (Math.random() * 90 + 10).toFixed(2);
              return '$' + randomPrice; // Assuming you want to format the price as a currency
            }
          }, 
        {
          // Date (Customization)
          targets: 5,
          orderable: false,
          responsivePriority: 3,
          render: function (data, type, full, meta) {
            var randomDate = '10-2-23'; // Customize the date here
            return '<span>' + randomDate + '</span>';
          }
        },
        {
          // Actions (Customization)
          targets: 6,
          title: 'Actions',
          searchable: false,
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-block text-nowrap">' +
              '<i class="ti ti-edit"></i>' + // Edit icon
              '<i class="ti ti-trash"></i>' + // Delete icon
              '</div>'
            );
          }
        }
      ]
    });
  }

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
