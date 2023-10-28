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
            { data: null }, // This will be used for the "Select" column
            { data: 'id' }, // This will be used for the checkboxes
            { data: null }, // Description column
            { data: null }, // Salary column
            { data: null }, // Expertise column
            { data: null }, // Date column
            { data: null }, // Status column
            { data: null }, // Event column
            { data: null }, // Time Duration column
            { data: null }  // Contact No column
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
            // For Description
            targets: 2,
            orderable: false,
            render: function (data, type, full, meta) {
              return 'DJ';
            }
          },
          {
            // For Salary
            targets: 3,
            render: function (data, type, full, meta) {
              return '$500';
            }
          },
          {
            // For Expertise
            targets: 4,
            render: function (data, type, full, meta) {
              return 'Front end';
            }
          },
          {
            // For Date (Random date)
            targets: 5,
            orderable: false,
            responsivePriority: 3,
            render: function (data, type, full, meta) {
              return '5/23';
            }
          },
          {
            // For Event
            targets: 6,
            render: function (data, type, full, meta) {
              return 'event..';
            }
          },
          {
            // For Time Duration
            targets: 7,
            render: function (data, type, full, meta) {
              return '8h';
            }
          },
          {
            // For Contact No
            targets: 8,
            render: function (data, type, full, meta) {
              return '03346758675';
            }
          },
          {
            // For Actions (Edit and Delete Icons)
            targets: 9,
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
          },
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
