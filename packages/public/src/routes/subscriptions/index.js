import cancel from './cancel.js'
import create from './create.js'
import getAll from './get-all.js'
import getOne from './get-one.js'

export default (f, _opts, done) => {
  f.route(cancel)
  f.route(create)
  f.route(getAll)
  f.route(getOne)
  done()
}
