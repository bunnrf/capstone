
const SearchApiUtil = {
  fetchTags: function(callback, limit) {
    $.ajax({
      url: 'api/tags',
      data: { limit: limit },
      success: function(tags) {
        callback(tags);
      }
    })
  }
};

module.exports = SearchApiUtil;
