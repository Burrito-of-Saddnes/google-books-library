import { action, observable, makeObservable } from 'mobx'
import { BooksIsOpenStatus } from '../utils/booksIsOpenStatus'

export default class BookIsOpenStatusStore {

    @observable
    booksIsOpenStatus: BooksIsOpenStatus

    constructor() {
        this.booksIsOpenStatus = BooksIsOpenStatus.CLOSED
        makeObservable(this)
    }
    
    @action
    public triggerActive = () => {
        this.booksIsOpenStatus = BooksIsOpenStatus.OPENED;
        console.log("Open")
    }

    @action
    public triggerDisabled = () => {
        this.booksIsOpenStatus = BooksIsOpenStatus.CLOSED;
        console.log("Close")
    } 

}