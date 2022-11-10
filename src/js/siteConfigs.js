class SiteConfigs {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.lastFetch = 'TRENDING';
    this.geners = [];
    this.perPage = 20;
    this.watchedPage = 1;
    this.queuePage = 1;
  }

  incrementWatchedPage() {
    this.watchedPage += 1;
  }
  incrementQueuePage() {
    this.queuePage += 1;
  }

  decrementWatchedPage() {
    this.watchedPage -= 1;
  }
  decrementQueuePage() {
    this.queuePage -= 1;
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

}

export const siteConfigs = new SiteConfigs();
