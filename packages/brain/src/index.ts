import _ from 'lodash'

export default class Brain<T = any> {
  private _state = {}
  constructor() {}

  get allData() {
    return _.cloneDeep(this._state)
  }

  getData(id: string): T {
    return _.cloneDeep(this._state[id])
  }

  setData(id: string, data: T) {
    this._state[id] = data
  }
}
