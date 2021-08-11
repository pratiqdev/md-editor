let SETTINGS_ARRAY = [
  {    id: "enable-basic-autocompletion",
    name: "Basic Autocompletion", // name on menu
    group: "editorSettings", // group for grouping or filtering or details
    desc: "Enable text autocompletion with strings derived from local document", // description to explain setting
    type: "boolean", // type for display and toggle
    state: true, // state for display and functionality
    default: true, // default to revert to defaults
  },
  {    id: "enable-live-autocompletion",
  name: "Live Autocompletion", // name on menu
  group: "editorSettings", // group for grouping or filtering or details
  desc: "Enable text autocompletion with strings derived from local document", // description to explain setting
  type: "boolean", // type for display and toggle
  state: true, // state for display and functionality
  default: true, // default to revert to defaults
},

  {    id: "array-setting",
    name: "An array setting",
    group: "editorSettings",
    desc: "This setting controls things about stuff",
    type: "array",
    state: 2,
    default: 1,
    options: [
      {
        name: "Option One Full Name",
        shortName: "Option One",
        desc: "This is the option one to control something",
      },
      {
        name: "Option Two Long Text Name",
        shortName: "Option Two",
        desc: "This is the option two to control something else",
      },
      {
        name: "Option Three Really Long Text Name",
        shortName: "Option Three",
        desc: "This is the option three to control something completely different",
      },
    ],
  },
  {    id: "number-setting",
    name: "A number setting",
    group: "editorSettings",
    desc: "This setting controls things about stuff",
    type: "number",
    state: 17,
    min: 0,
    max: 100,
    default: 50,
  },

  {    id: "auto-prepend-content",
    name: "Auto prepend content",
    group: "editorSettings",
    desc: "Define a custom string at the beginning of each new file",
    type: "bool-string",
    state: [
      true,
      `--- 
title: {{filename}}
created: {{date}}
edited: {{edit}}
---`,
    ],
    min: 0,
    max: 5000,
    default: [
      true,
      `--- 
title: {{filename}}
created: {{date}}
edited: {{edit}}
---`,
    ],
  },

  {    id: "auto-append-content",
    name: "Auto append content",
    group: "editorSettings",
    desc: "Define a custom string at the end of each new file",
    type: "bool-string",
    state: [false, ""],
    min: 0,
    max: 5000,
    default: "",
  },

  {    id: "find-and-replace-values",
    name: "Find and replace values",
    group: "editorSettings",
    desc: "Define a set of custom strings to find and replace content on save. ",
    type: "find-and-replace",
    state: [
      true, // is replacer enabled
      {
        active: true,
        name: "Name of file",
        description:
          "This built-in replacer will replace all occurences of {{filename}} with the current name of the file.",
        find: "{{filename}}",
        replace: "{{filename}}",
      },
      {
        active: true,
        name: "Date of creation",
        description:
          "This built-in replacer will replace all occurences of {{date}} with the actual date and time of file creation.",
        find: "{{date}}",
        replace: "{{date}}",
      },
      {
        active: true,
        name: "Date of last edit",
        description:
          "This built-in replacer will replace all occurences of {{edit}} with the actual date and time of the last edit.",
        find: "{{edit}}",
        replace: "{{edit}}",
      },
      {
        active: true,
        name: "Line count",
        description:
          "This built-in replacer will replace all occurences of {{line-count}} with the number of vertical lines in the file.",
        find: "{{line-count}}",
        replace: "{{line-count}}",
      },
      {
        active: true,
        name: "Word count",
        description:
          "This built-in replacer will replace all occurences of {{word-count}} with the number of words in the file",
        find: "{{word-count}}",
        replace: "{{word-count}}",
      },
      {
        active: true,
        name: "Character count",
        description:
          "This built-in replacer will replace all occurences of {{character-count}} with the actual date and time of file creation.",
        find: "{{character-count}}",
        replace: "{{character-count}}",
      },
      {
        active: true,
        name: "Author name",
        description:
          "This built-in replacer will all occurences of {{date}} with the actual date and time of file creation.",
        find: "{{author}}",
        replace: "Some Dude",
      },
      {
        active: false,
        name: "Test 1",
        description: "This a plain string test",
        find: "{{test}}",
        replace: "IT REPLACED ME!",
      },
      {
        active: true,
        name: "Test 2",
        description: "This is a test of RegExp.",
        find: /-test-/gm,
        replace: "REGEX REPLACED ME!",
      },
    ],
    default: [
      {
        find: "{{date}}",
        replace: "{{date}}",
      },
      {
        find: "{{filename}}",
        replace: "{{filename}}",
      },
      {
        find: "{{author}}",
        replace: "Some Dude",
      },
    ],
  },
  {    id: "custom-snippets",
    name: "Custom snippets",
    group: "editorSettings",
    desc: "Add or remove custom snippets",
    type: "snippets",
    state: [
        true,
    { 
        title: 'Link',
        name: "link", 
        code: "[${1:alt-text}](${2:url})",
        active: true,
        description: 'Optional description'
    },
    { 
        title: 'Image',
          name: "img", 
          code: "![${1:link-text}](${2:url})",
          active: true,
        description: 'Optional description'
    },
    { 
        title: 'Code block',
        name: "codeblock", 
        code: "```${1:lang} \r\n ${2:code} \r\n```",
        active: true,
        description: 'Optional description'
    },
    {
        title: 'Table',
        name: "table",
        code: "|${1:heading-1}|${2:heading-2}|${3:heading-3}|\r\n|:--|:--|:--|\r\n|${4:content-1}|${5:content-2}|${6:content-3}|\r\n",
        active: true,
        description: 'Optional description'
    },
    {
        title: 'Badge',
        name: "badge",
        code: "![badge](https://img.shields.io/badge/${1:label}-${2:message}-${3:color})",
        active: true,
        description: 'Optional description'
    },
    ],
    default: [
        { 
            title: 'Link',
            name: "link", 
            code: "[${1:alt-text}](${2:url})",
            active: true,
            description: 'Optional description'
        },
        { 
              name: "Image", 
              code: "![${1:link-text}](${2:url})",
              active: true,
            description: 'Optional description'
        },
        { 
            title: 'Code block',
            name: "codeblock", 
            code: "```${1:lang} \r\n ${2:code} \r\n```",
            active: true,
            description: 'Optional description'
        },
        {
            title: 'Table',
            name: "table",
            code: "|${1:heading-1}|${2:heading-2}|${3:heading-3}|\r\n|:--|:--|:--|\r\n|${4:content-1}|${5:content-2}|${6:content-3}|\r\n",
            active: true,
            description: 'Optional description'
        },
        {
            title: 'Badge',
            name: "badge",
            code: "![badge](https://img.shields.io/badge/${1:label}-${2:message}-${3:color})",
            active: true,
            description: 'Optional description'
        },
        ],
  },
  {    id: "copy-with-empty-selection",
  name: "Copy / Cut Line", 
  group: "editorSettings", 
  desc: "Modify the entire line at cursor location if no text is selected", 
  type: "boolean", 
  state: true, 
  default: true, 
},
{    id: "use-soft-tabs",
name: "Use Soft Tabs", 
group: "editorSettings", 
desc: "Use multiple spaces instead of the tab character. Number of spaces can be set with 'Tab Size'", 
type: "boolean", 
state: true, 
default: true, 
},
];
export default SETTINGS_ARRAY;
