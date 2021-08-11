export default {
    text: "#000",
    background: "#fff",


    //? should I use color_saturated and color_b to allow better theme contrast?
    //? e.g. 
    //? color_b for hover states
    //? color_saturated for bg and text
    //? or just make sure to switch _b and _d for modes

    // - need to make sure contrast between text and bg is high


  

    // primary: '#C2E4FF',
    primary_a: "hsla(207, 100%, 50%, 1)",
    primary_b: "hsla(207, 100%, 60%, 1)",
    primary_c: "hsla(207, 100%, 70%, 1)",
    primary_d: "hsla(207, 100%, 80%, 1)",
    primary_t: "hsla(207, 100%, 50%, .3)",

    secondary_a: "hsla(20, 90%, 50%, 1)",
    secondary_b: 'hsla(20, 90%, 60%, 1)',
    secondary_c: 'hsla(20, 90%, 70%, 1)',
    secondary_d: 'hsla(20, 90%, 80%, 1)',
    secondary_t: 'hsla(20, 90%, 60%, .3)',

    accent_a: "hsla(284, 100%, 38%, 1)",
    accent_b: 'hsla(284, 100%, 58%, 1)',
    accent_c: 'hsla(284, 100%, 78%, 1)',
    accent_d: 'hsla(284, 100%, 88%, 1)',
    accent_t: 'hsla(284, 100%, 88%, .3)',

    red: "#ff0000",
    red_t: "#ff000033",
    green: "#00bb00",
    green_light: "#66cc66",
    green_t: "#0f02",

    alert: '#e69c15',
    alert_dark: '#e68b15',

    error: '#e84610',
    success: '#4db309',

    devOnly: '#ff000044',

    faint: '#fefefe',


    // grey_0: "#fff", // closest to bg
    // grey_1: "#ddd",
    // grey_2: "#aaa",
    // grey_3: "#888",
    // grey_4: "#666",
    // grey_5: "#444", // farthest from bg
    // grey_6: "#222", // farthest from bg
    // grey_7: "#000", // farthest from bg

    grey_0: '#fff',
    grey_1: '#eee',
    grey_2: '#ddd',
    grey_3: '#ccc',
    grey_4: '#bbb',
    grey_5: '#aaa',
    grey_6: '#999',
    grey_7: '#888',
    grey_8: '#777',
    grey_9: '#666',
    grey_10: '#555',
    grey_11: '#444',
    grey_12: '#333',
    grey_13: '#222',
    grey_14: '#111',
    grey_15: '#000',

    modes: {
      dark: {
        text: "#fff",
        background: "hsl(255, 100%, 0%)",

        primary_a: "hsla(207, 100%, 80%, 1)",
        primary_b: "hsla(207, 100%, 60%, 1)",
        primary_c: "hsla(207, 100%, 40%, 1)",
        primary_d: "hsla(207, 100%, 30%, 1)",
        primary_t: "hsla(207, 100%, 30%, .3)",


        secondary_a: "hsla(20, 100%, 80%, 1)",
        secondary_b: 'hsla(20, 90%, 60%, 1)',
        secondary_c: 'hsla(20, 80%, 50%, 1)',
        secondary_d: 'hsla(20, 70%, 40%, 1)',

        accent_a: 'hsla(284, 100%, 80%, 1)',
        accent_b: "hsla(284, 80%, 60%, 1)",
        accent_c: 'hsla(284, 60%, 40%, 1)',
        accent_d: 'hsla(284, 40%, 20%, 1)',

        accent: "#B400F5",
        red: "#ff2222",
        red_t: "#cc222255",

        green: "#00aa00",
        green_light: "#66cc66",
        green_t: "#0f03",

        alert: '#e69c15',
        error: '#e84610',
        success: '#4db309',


        devOnly: '#ff000044',

        faint: '#1a1a1a',
        // grey_0: "#000", // closest to bg
        // grey_1: "#222",
        // grey_2: "#444",
        // grey_3: "#666",
        // grey_4: "#888",
        // grey_5: "#aaa", // farthest from bg
        // grey_6: "#ccc", // farthest from bg
        // grey_7: "#fff", // farthest from bg

        grey_15: '#fff',
        grey_14: '#eee',
        grey_13: '#ddd',
        grey_12: '#ccc',
        grey_11: '#bbb',
        grey_10: '#aaa',
        grey_9: '#999',
        grey_8: '#888',
        grey_7: '#777',
        grey_6: '#666',
        grey_5: '#555',
        grey_4: '#444',
        grey_3: '#333',
        grey_2: '#222',
        grey_1: '#111',
        grey_0: '#000',
      },
    },
}