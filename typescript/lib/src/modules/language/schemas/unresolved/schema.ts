import * as p_ from 'pareto-core/schema'

// types

namespace Value_ {
    
    export type component = string
    
    export namespace group {
        
        export namespace properties {
            
            export type D = Value_
        }
        
        export type properties = p_.Dictionary<
            properties.D
        >
    }
    
    export type group = {
        readonly 'properties': group.properties
    }
    
    export type token = string
    
    export namespace list {
        
        export type item = Value_
        
        export namespace separation {
            
            export namespace O {
                
                export type separator = string
                
                export type trailing_allowed = boolean
            }
            
            export type O = {
                readonly 'separator': O.separator
                readonly 'trailing allowed': O.trailing_allowed
            }
        }
        
        export type separation = p_.Optional_Value<
            separation.O
        >
    }
    
    export type list = {
        readonly 'item': list.item
        readonly 'separation': list.separation
    }
    
    export type optional = Value_
    
    export namespace state {
        
        export namespace options {
            
            export type D = Value_
        }
        
        export type options = p_.Dictionary<
            options.D
        >
    }
    
    export type state = {
        readonly 'options': state.options
    }
}

type Value_ = 
    | readonly ['component', Value_.component]
    | readonly ['group', Value_.group]
    | readonly ['token', Value_.token]
    | readonly ['list', Value_.list]
    | readonly ['optional', Value_.optional]
    | readonly ['state', Value_.state]

namespace Root_ {
    
    export namespace tokens {
        
        export namespace D {
            
            export type semantic = null
            
            export namespace syntactic {
                
                export type word = null
                
                export type symbol_ = null
            }
            
            export type syntactic = 
                | readonly ['word', syntactic.word]
                | readonly ['symbol', syntactic.symbol_]
        }
        
        export type D = 
            | readonly ['semantic', D.semantic]
            | readonly ['syntactic', D.syntactic]
    }
    
    export type tokens = p_.Dictionary<
        tokens.D
    >
    
    export namespace productions {
        
        export type D = Value_
    }
    
    export type productions = p_.Dictionary<
        productions.D
    >
}

type Root_ = {
    readonly 'tokens': Root_.tokens
    readonly 'productions': Root_.productions
}

// exported root types
export { 
    type Value_ as Value, 
    type Root_ as Root, 
}
