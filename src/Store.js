class Store {
  constructor() {
    this.state = {
      fetchedUrls: [],
    }
  }

  getFetchedUrls() {
    return this.state.fetchedUrls;
  }

  setUrlFetched(url) {
    const { fetchedUrls } = this.state;
    this.state.fetchedUrls = [...fetchedUrls, url];
    return this;
  }

  isUrlFetched(url) {
    return this.state.fetchedUrls.includes(url);
  }
}

export default new Store;
