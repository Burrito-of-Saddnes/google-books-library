import DisplayMoreButtonStatusStore from "./DisplayMoreButtonStatusStore"

export class RootStore {

    displayMoreButtonStatusStore: DisplayMoreButtonStatusStore;

    constructor() {
        this.displayMoreButtonStatusStore = new DisplayMoreButtonStatusStore();
    }

}
