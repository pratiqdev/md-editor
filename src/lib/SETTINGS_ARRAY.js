
let SETTINGS_ARRAY = [
    {   id: 'boolean-setting-1',
        name: 'A boolean setting',// name on menu
        group: 'editorSettings', // group for grouping or filtering or details
        desc: 'This setting controls things about stuff', // description to explain setting
        type: 'boolean', // type for display and toggle
        state: true, // state for display and functionality
        default: true, // default to revert to defaults
    },
    {   id:'boolean-setting-2',
        name: 'Another boolean setting',
        group: 'editorSettings',
        desc: 'This setting controls things about stuff',
        type: 'boolean',
        state: false,
        default: false,
    },
    {   id:'array-setting',
        name: 'An array setting',
        group: 'editorSettings',
        desc: 'This setting controls things about stuff',
        type: 'array',
        state: 2,
        default: 1,
        options: [
            {          
               name: 'Option One Full Name',
               shortName: 'Option One',
               desc: 'This is the option one to control something'
            },
            {          
                name: 'Option Two Long Text Name',
                shortName: 'Option Two',
                desc: 'This is the option two to control something else'
            },
            {          
                name: 'Option Three Really Long Text Name',
                shortName: 'Option Three',
                desc: 'This is the option three to control something completely different'
            },
        ]
    },
    {   id:'number-setting',
        name: 'A number setting',
        group: 'editorSettings',
        desc: 'This setting controls things about stuff',
        type: 'number',
        state: 17,
        min: 0,
        max: 100,
        default: 50
    },
    {   id:'auto-prepend-content-enabled',
        name: 'Enable auto prepend',
        group: 'editorSettings',
        desc: 'Enable auto-insertion of a custom string at the beginning of each new file',
        type: 'boolean',
        state: true,
        default: true,
    },
    {   id:'auto-prepend-content-string',
        name: 'Auto prepend content',
        group: 'editorSettings',
        desc: 'Define a custom string at the beginning of each new file',
        type: 'string',
        state: 
`--- 
title: {{filename}}
created: {{date}}
edited: {{edit}}
---`,
        min: 0,
        max: 5000,
        default: 
`--- 
title: {{filename}}
created: {{date}}
edited: {{edit}}
---`
    },
    {   id:'auto-append-content-enabled',
    name: 'Enable auto append',
    group: 'editorSettings',
    desc: 'Enable auto-insertion of a custom string at the beginning of each new file',
    type: 'boolean',
    state: false,
    default: false,
    },
    {   id:'auto-append-content-string',
    name: 'Auto append content',
    group: 'editorSettings',
    desc: 'Define a custom string at the end of each new file',
    type: 'string',
    state: '',
    min: 0,
    max: 5000,
    default: ''
    },
    {   id:'find-and-replace-enabled',
    name: 'Enable Find and replace',
    group: 'editorSettings',
    desc: 'Enable auto replacement of defined values on save.',
    type: 'boolean',
    state: true,
    default: true
    },
    {   id:'find-and-replace-values',
    name: 'Find and replace values',
    group: 'editorSettings',
    desc: 'Define a set of custom strings to find and replace content on save. Includes created date as {{date}}, last edited date as {{edit}} and filename as {{filename}}.',
    type: 'find-and-replace',
    state: [
        {
            find: '{{date}}',
            replace: '{{date}}',
        },
        {
            find: '{{filename}}',
            replace: '{{filename}}',
        },
        {
            find: '{{author}}',
            replace: 'Some Dude',
        },
        {
            find: '{{test}}',
            replace: 'IT REPLACED ME!'
        },
        {
            find: /-test-/gm,
            replace: 'REGEX REPLACED ME!'
        }
    ],
    default: [
        {
            find: '{{date}}',
            replace: '{{date}}',
        },
        {
            find: '{{filename}}',
            replace: '{{filename}}',
        },
        {
            find: '{{author}}',
            replace: 'Some Dude',
        }
    ],
    },

]
export default SETTINGS_ARRAY