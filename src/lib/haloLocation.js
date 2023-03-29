



const getHaloLocation = (id, marg) => {
    const loc = {}

    let el = document.getElementById( id )?.getBoundingClientRect() || null
    // console.log(`find element: ${id}`)
    

    if(el != null){
        loc.exist = true
        loc.l = el.left - marg
        loc.t = el.top - marg
        loc.h = el.height + (marg * 2)
        loc.w = el.width + (marg * 2)
        // console.log(id, loc)
    }else{
        loc.exist = false
        if(window){

            loc.h = 0
            loc.w = 0       
            loc.t = window.innerHeight / 2
            loc.l = window.innerWidth / 2
            // console.log('NO ELEMENT ---')

        }
    }

    return loc
}

export default getHaloLocation