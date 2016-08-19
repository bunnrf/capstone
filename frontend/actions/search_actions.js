const SearchApiUtil = require('../util/search_api_util');
const SearchConstants = require('../constants/search_constants');
const dispatcher = require('../dispatcher/dispatcher');

const SearchActions = {
  fetchTags: function(limit = 10) {
    SearchApiUtil.fetchTags(this.receiveTags, limit);
  },

  receiveTags: function(tags) {
    dispatcher.dispatch({
      actionType: SearchConstants.TAGS_RECEIVED,
      tags: tags
    });
  }
};

module.exports = SearchActions;
