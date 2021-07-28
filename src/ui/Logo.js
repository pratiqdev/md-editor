import { useThemeUI, Box } from 'theme-ui'


    
const Logo = (props) => {
    const context = useThemeUI()
    const { theme, colorMode } = context
    const logoThemeColor = colorMode === 'default' ? '#ffffff' : '#000000'

    return(

        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 61 61" width='100%' height='100%'
            preserveAspectRatio="xMidYMid meet">
            <g fill={ props.color ? props.color : logoThemeColor } transform="translate(0.000000,61.000000) scale(0.02,-0.02)" stroke="none">
                <path d="M87 2994 c-4 -4 -7 -677 -7 -1496 0 -1250 2 -1489 14 -1494 13 -5
                204 108 218 130 4 6 8 559 8 1229 l0 1218 28 -19 c28 -20 240 -159 485 -318
                75 -49 255 -167 399 -262 145 -95 267 -171 273 -170 5 2 91 57 190 122 99 65
                232 153 295 194 337 220 446 292 560 368 l125 84 3 -540 c1 -297 1 -782 0
                -1078 l-3 -538 -120 78 c-66 43 -190 124 -275 180 -85 55 -211 138 -280 183
                -387 255 -486 318 -500 319 -12 1 -16 -19 -18 -113 -2 -63 -1 -124 2 -135 3
                -12 35 -41 73 -65 223 -145 573 -373 743 -486 300 -197 450 -295 455 -295 3 0
                36 -21 74 -46 38 -25 74 -43 80 -39 14 8 15 2981 1 2990 -13 8 -78 -33 -630
                -394 -63 -41 -151 -98 -195 -127 -44 -29 -194 -126 -333 -217 l-253 -165 -382
                250 c-210 138 -404 265 -432 283 -157 101 -356 231 -393 256 -23 16 -45 29
                -48 29 -3 0 -32 18 -64 40 -68 46 -83 53 -93 44z"/>
            </g>
        </svg>
    )
}
    



export default Logo