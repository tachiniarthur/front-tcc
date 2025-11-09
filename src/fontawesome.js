import { library, config } from '@fortawesome/fontawesome-svg-core'
import {
    faUserSecret,
    faCoffee,
    faEye,
    faEyeSlash,
    faCartShopping,
    faPlus,
    faMinus,
    faTrash,
    faXmark,
    faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false
library.add(faUserSecret, faCoffee, faEye, faEyeSlash, faCartShopping, faPlus, faMinus, faTrash, faXmark, faArrowLeft)

export { FontAwesomeIcon }