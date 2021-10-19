import { action, observable, makeObservable } from 'mobx'
import { DisplayMoreButtonStatus } from '../utils/displayMoreButtonStatus'

export default class DisplayMoreButtonStatusStore {

    @observable
    displayMoreButtonStatus: DisplayMoreButtonStatus

    constructor() {
        this.displayMoreButtonStatus = DisplayMoreButtonStatus.HIDE
        makeObservable(this)
    }
    
    @action
    public triggerActive = () => {
        this.displayMoreButtonStatus = DisplayMoreButtonStatus.DISPLAY;
    }

    @action
    public triggerDisabled = () => {
        this.displayMoreButtonStatus = DisplayMoreButtonStatus.HIDE;
    } 

}