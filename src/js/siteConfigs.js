class SiteConfigs {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.lastFetch = 'TRENDING';
    this.geners = [];
  }

  incrementPage() {
    this.page += 1;
  }

  decrementPage() {
    this.page -= 1;
  }

  resetPage() {
    this.page = 1;
  }

  setSearchQuery(newSearchQuery) {
    this.searchQuery = newSearchQuery;
    this.resetPage();
  }

  getPage() {
    return this.page;
  }
    
}

export const siteConfigs = new SiteConfigs();
