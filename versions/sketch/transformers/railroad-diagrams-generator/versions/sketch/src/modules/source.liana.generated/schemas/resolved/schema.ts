import * as p_ from 'pareto-core/schema'

// types

namespace Expression_ {
    
    export namespace alternation {
        
        export namespace alternatives {
            
            export type D = Expression_
        }
        
        export type alternatives = p_.Dictionary<
            alternatives.D
        >
    }
    
    export type alternation = {
        readonly 'alternatives': alternation.alternatives
    }
    
    export type keyword = string
    
    export type nonterminal = string
    
    export type optional = Expression_
    
    export namespace repetition {
        
        export type item = Expression_
        
        export namespace separation {
            
            export namespace O {
                
                export type separator = string
                
                export type trailing_separator_allowed = boolean
            }
            
            export type O = {
                readonly 'separator': O.separator
                readonly 'trailing separator allowed': O.trailing_separator_allowed
            }
        }
        
        export type separation = p_.Optional_Value<
            separation.O
        >
    }
    
    export type repetition = {
        readonly 'item': repetition.item
        readonly 'separation': repetition.separation
    }
    
    export namespace sequence {
        
        export namespace elements {
            
            export type D = Expression_
        }
        
        export type elements = p_.Dictionary<
            elements.D
        >
    }
    
    export type sequence = {
        readonly 'elements': sequence.elements
    }
    
    export type terminal = string
}

type Expression_ = 
    | readonly ['alternation', Expression_.alternation]
    | readonly ['keyword', Expression_.keyword]
    | readonly ['nonterminal', Expression_.nonterminal]
    | readonly ['optional', Expression_.optional]
    | readonly ['repetition', Expression_.repetition]
    | readonly ['sequence', Expression_.sequence]
    | readonly ['terminal', Expression_.terminal]

namespace Root_ {
    
    export namespace terminals {
        
        export type D = null
    }
    
    export type terminals = p_.Dictionary<
        terminals.D
    >
    
    export namespace keywords {
        
        export type D = string
    }
    
    export type keywords = p_.Dictionary<
        keywords.D
    >
    
    export namespace nonterminals {
        
        export type D = Expression_
    }
    
    export type nonterminals = p_.Dictionary<
        nonterminals.D
    >
}

type Root_ = {
    readonly 'terminals': Root_.terminals
    readonly 'keywords': Root_.keywords
    readonly 'nonterminals': Root_.nonterminals
}

// exported root types
export { 
    type Expression_ as Expression, 
    type Root_ as Root, 
}
