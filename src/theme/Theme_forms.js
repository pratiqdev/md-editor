export default {
  label: {
    fontSize: 1,
    fontWeight: "body",
  },
  input: {
    position: 'relative',
    zIndex: 1,
    borderRadius: 2,
    px: 2,
    py:0,
    border: '1px solid',
    borderColor: "grey_7",
    '&:hover':{
      outline: '1px solid',
      outlineOffset: '-1px',
      outlineColor: "primary_light",
    },
    "&:focus": {
      outline: '2px solid',
      outlineOffset: '-2px',
      outlineColor: "primary_c",
      zIndex: 2,
      // borderColor: 'primary_c',
    },
  },
  select: {
    borderColor: "transparent",
    borderRadius: 2,
    bg: 'primary_b',
    "&:focus": {
      borderColor: "white",
    //   boxShadow: (t) => `0 0 0 2px ${t.colors.primary_c}`,
      outline: "none",
    },
  },
  options:{
    bg: '#0f0'
  },
  textarea: {
    borderColor: "grey_7",
    borderRadius: 2,
    px:2,
    py:0,
    position: 'relative',
    zIndex: 1,
    '&:hover':{
      outline: '1px solid',
      outlineOffset: '-1px',
      outlineColor: "primary_light",
    },
    "&:focus": {
      zIndex: 2,
      outline: '2px solid',
      outlineOffset: '-2px',
      outlineColor: "primary_c",
      // borderColor: 'primary_c',
    },
  },
  checkbox:{
      borderColor: "grey_7",
      color: 'primary_c',
    "&:focus": {
      borderColor: "primary_c",
    //   boxShadow: (t) => `0 0 0 2px ${t.colors.primary_c}`,
      outline: "none",
    },
  },
  slider: {
    bg: "muted",
  },
  switch:{
    bg: 'grey_3',
    '&:hover':{
      bg: 'primary_light'
    },
    transition: 1,
    'input:checked ~ &': {
      bg: 'primary_b',
    },
  }
};