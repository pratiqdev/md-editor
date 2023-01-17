const excludedTerms = [
    "",
    "the",
    "that",
    "this",
    "those",
    "then",
    "they",
    "them",
    " a ",
    "an",
    "at",
    "or",
    "both",
    "when",
    "why",
    "what",
    "who",
    "where",
    "with",
    "and",
    "do",
    '`',

  ];

  let sv = val
    .replace(/ /g, "%%")
    .split("%%")

    // console.log()

    .filter(
      (s) => {

        return excludedTerms
          .map((term) => {
              if(s === term){
                  // console.log(`term excluded: ${term}`)
                  return false
              }else{
                  return true
              }
          })
          .includes(true);


      });
