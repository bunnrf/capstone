const Store = require('flux/utils').Store;
const SearchConstants = require('../constants/search_constants');
const dispatcher = require('../dispatcher/dispatcher');

let _tags = [SearchConstants.MOST_VIRAL];
const SearchStore = new Store(dispatcher);

SearchStore.filterOptions = () => _tags;
SearchStore.sortOptions = function() {
  return [SearchConstants.MOST_POPULAR,
          SearchConstants.MOST_RECENT,
          SearchConstants.HIGHEST_SCORING]
}

function resetAllTags (tags) {
  _tags = [SearchConstants.MOST_VIRAL];
  Object.keys(tags).forEach((key) => {
    _tags.push(tags[key]["name"]);
  });
  SearchStore.__emitChange();
};

SearchStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case SearchConstants.TAGS_RECEIVED:
      resetAllTags(payload.tags);
      break;
  }
};

module.exports = SearchStore;
