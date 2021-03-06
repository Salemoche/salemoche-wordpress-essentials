/******/ (() => { // webpackBootstrap
/*!**************************!*\
  !*** ./src/js/filter.js ***!
  \**************************/
(function ($) {
  $(document).on('ready', function () {
    /* Add class to display groups so they slide lower than the filter group */
    $('.wp-block-group').each(function () {
      if ($(this).find('.scientifica-story-display').length != 0) {
        $(this).addClass('scientifica-story-display-container');
      }
    });
    var filter = {
      categories: [],
      tags: [],
      all: []
    };
    var filterObjects = '.scientifica-tile';
    var filterCategories = ['categories', 'tags'];
    var filterInput = '.sm-filter-input';
    var filterType = 'has all';
    $(filterInput).each(function () {
      var smInput = $(this);
      /* Check for the type of input (switch or button) */

      if (smInput.attr('type') == 'button') {
        smInput.click(function () {
          var filterValue = smInput.attr('value');
          var filterCategory = 'tags';
          smInput.toggleClass('active');
          smCheckFilters(filterValue, filterCategory);
        });
      } else if (smInput.is('select')) {
        smInput.change(function () {
          // /* Clean up so that all the tags are removed */
          smCleanUpFilters();
          var filterValue = smInput.val();
          var filterCategory = 'categories';
          smCheckFilters(filterValue, filterCategory);
        });
      }
    });

    function smCheckFilters(filterValue, filterCategory) {
      /* Add or remove Items to and from the filter Array */
      if (filter.all.includes(filterValue)) {
        filter.all = filter.all.filter(function (value) {
          return value != filterValue;
        });
      } else {
        filter.all.push(filterValue);
      }

      smFilterObjects(filterCategory);
      /* No Results */

      /* SM-TODO: Imporve UX with feedback */

      var filteredObjects = $('.scientifica-filter-container').find('.scientifica-tile');

      if (filteredObjects.length == 0) {
        $('select' + filterInput).val('select');
        smCleanUpFilters();
      }

      console.log(filter.all);
    }

    function smFilterObjects(filterCategory) {
      $(filterObjects).each(function () {
        var filterObject = $(this);
        var specificFilter = filter.all;
        var dataArray = filterObject.data(filterCategory).split(' ');
        var isFiltered = 0;
        var parentId = $(this).data('parent');
        /* Check if the data-... contains one of the filters and add 1 to the is filtered array*/

        specificFilter.forEach(function (filterTerm) {
          if (dataArray.includes(filterTerm)) {
            isFiltered += 1;
          }
        });
        /* Check if each element has either one or all specified filters */

        if (filterType == 'has one' && isFiltered || filterType == 'has all' && isFiltered == specificFilter.length) {
          filterObject.addClass('filtered-in');
          filterObject.removeClass('filtered-out');
          filterObject.appendTo($('.scientifica-filter-container'));
        } else {
          filterObject.addClass('filtered-out');
          filterObject.removeClass('filtered-in');
          filterObject.prependTo($('#' + parentId + ' .scientifica-tile-container'));
        }
      });
      /* prepare filter container */

      $('.scientifica-filter-results').css('visibility', 'visible');
      $('.scientifica-filter-results').css('height', 'auto'); // if (filter.categories.length == 0 && filter.tags.length == 0) {

      if (filter.all.length == 0) {
        smCleanUpFilters();
      }
    }

    function smCleanUpFilters() {
      filter.categories = [];
      filter.tags = [];
      filter.all = [];
      /* Hide filter container */

      $('.scientifica-filter-results').css('visibility', 'hidden');
      $('.scientifica-filter-results').css('height', '0');
      /* Remove Tag cloud button classes */

      $(filterInput).removeClass('active');
      /* Return filter objects */

      $(filterObjects).removeClass('filtered-in');
      $(filterObjects).removeClass('filtered-out');
      $(filterObjects).each(function () {
        var parentId = $(this).data('parent');
        $(this).prependTo($('#' + parentId + ' .scientifica-tile-container'));
      });
    }
  });
})(jQuery);
/******/ })()
;
//# sourceMappingURL=filter.js.map