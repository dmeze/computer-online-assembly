import { sumBy } from 'lodash'

self.addEventListener('message', ({ data }) => {
  console.log(data)
  postMessage(sumBy(data.array, data.iteratee))
})
