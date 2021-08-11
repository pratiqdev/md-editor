import ace from 'ace-builds'

export const registerSnippets = function(active, editor, session, mode, snippetText) {
   return new Promise((resolve, reject) => {
       
       
       // console.log('snippetText:', snippetText)
       
       editor.setOptions({
           enableSnippets: true,
        })
        
        var snippetManager = ace.require('ace/snippets').snippetManager
        
        var id = session.$mode.$id || ''
        var m = snippetManager.files[id]
        
        m.scope = mode
        m.snippetText = snippetText
        m.snippet = snippetManager.parseSnippetFile(snippetText, m.scope)
        if(active){
            console.log(`SNIPPET MGR | active`)
            snippetManager.snippetMap = {}

            
            snippetManager.register(m.snippet, m.scope)
            resolve()
        }else{
            console.log(`SNIPPET MGR | disable snippets!`)
            snippetManager.snippetMap = {}
        }

        



    })
}

export const createSnippets = snippets =>
    (Array.isArray(snippets) ? snippets : [snippets])
    .filter(s=> s.active)
        .map((s) => {
            if(s.code){

               return  [
                    'snippet ' + s.name,
                    s.code
                    .split('\n')
                    .map(c => '\t' + c)
                    .join('\n'),
                ].join('\n')
            }
        }
        )
        .join('\n')