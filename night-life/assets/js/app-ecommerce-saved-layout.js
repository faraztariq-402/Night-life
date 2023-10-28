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
        { data: 'Date' }, // Date column
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
          // Section (Customization)
          targets: 3,
          responsivePriority: 5,
          render: function (data, type, full, meta) {
            return '<button class="btn btn-sm btn-primary" onclick="window.location.href=\'../../view.html\'">View</button>';

          }
        },
        {
          // Date (Customization)
          targets: 4,
          orderable: false,
          responsivePriority: 3,
          data: null, // Set data to null since there is no actual date property
          render: function (data, type, full, meta) {
            var randomDate = '10-2-23'; // Customize the date here
            console.warn("Warning: 'date' property is not available in data source for column 4.");
            return '<span class="your-custom-class">' + randomDate + '</span>';
          },
          createdCell: function (td, cellData, rowData, row, col) {
            if (col === 4) {
              td.className = 'dateTd'; // Add your custom class here
            }
          }
        },
        {
          // Status (Customization)
          targets: 5,
          render: function (data, type, full, meta) {
            var stock = full['status'];
            var statusToggle = stock === 'Active' ? 'on' : 'off'; // Toggle on and off based on 'Active' status
            return (
              '<label class="switch switch-primary switch-sm">' +
              '<input type="checkbox" class="switch-input" ' + (statusToggle === 'on' ? 'checked' : '') + '>' +
              '<span class="switch-toggle-slider">' +
              '<span class="switch-' + statusToggle + '">' +
              '</span>' +
              '</span>' +
              '</label>'
            );
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