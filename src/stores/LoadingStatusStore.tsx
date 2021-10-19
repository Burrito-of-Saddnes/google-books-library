import { action, observable, makeObservable } from 'mobx'
import { LoadingStatus } from '../utils/loadingStatus'

export default class LoadingStatusStore {

    @observable
    loadingStatus: LoadingStatus

    constructor() {
        this.loadingStatus = LoadingStatus.OFF
        makeObservable(this)
    }
    
    @action
    public triggerActive = () => {
        this.loadingStatus = LoadingStatus.ON;
    }

    @action
    public triggerDisabled = () => {
        this.loadingStatus = LoadingStatus.OFF;
    } 

}