import {debounce} from 'lodash'
import toasty from './toasty'

export const nanAlert = debounce((val) => {
    toasty({
        type: 'error',
        text: `Value must be a number. Received '${val}'`
    })
}, 4000, { leading: true, trailing: false, maxWait: 4000 });


export const minMaxAlert = debounce((min, max) => {
    toasty({
        type: 'error',
        text: `Length must be between ${min} and ${max}`
    })
}, 4000, { leading: true, trailing: false, maxWait: 4000 });