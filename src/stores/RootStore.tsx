import DisplayMoreButtonStatusStore from "./DisplayMoreButtonStatusStore";
import LoadingStatusStore from "./LoadingStatusStore";

export class RootStore {

    displayMoreButtonStatusStore: DisplayMoreButtonStatusStore;
    loadingStatusStore: LoadingStatusStore

    constructor() {
        this.displayMoreButtonStatusStore = new DisplayMoreButtonStatusStore();
        this.loadingStatusStore = new LoadingStatusStore();
    }

}
