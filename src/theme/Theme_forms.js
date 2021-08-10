export default {
  label: {
    fontSize: 1,
    fontWeight: "body",
  },
  input: {
    borderRadius: 2,
    border: '1px solid green',
    borderColor: "grey_7",
    "&:focus": {
      borderColor: "primary",
    //   boxShadow: (t) => `0 0 0 2px ${t.colors.primary_c}`,
      outline: "none",
      bg: 'primary_t',
      color: 'grey_15',
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
    "&:focus": {
      // borderColor: "primary_c",
    //   boxShadow: (t) => `0 0 0 2px ${t.colors.primary_c}`,
      outline: "none",
      bg: 'primary_t',
      color: 'grey_15',

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
    transition: 1,
    'input:checked ~ &': {
      bg: 'primary_b',
    },
  }
};