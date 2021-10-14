import BookIsOpenStatusStore from "./BookIsOpenStatusStore"

export class RootStore {

    bookIsOpenStatusStore: BookIsOpenStatusStore;

    constructor() {
        this.bookIsOpenStatusStore = new BookIsOpenStatusStore();
    }

}
