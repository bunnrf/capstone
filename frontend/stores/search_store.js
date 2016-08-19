const Store = require('flux/utils').Store;
const SearchConstants = require('../constants/search_constants');
const dispatcher = require('../dispatcher/dispatcher');

let _tags = [];
const SearchStore = new Store(dispatcher);

SearchStore.tags = () => _tags;

function resetAllTags (tags) {
  _tags = tags;
  SearchStore.__emitChange();
};

SearchStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case SearchConstants.TAGS_RECEIVED:
      SearchStore.resetAllTags(payload.tags);
      break;
  }
};

module.exports = SearchStore;
