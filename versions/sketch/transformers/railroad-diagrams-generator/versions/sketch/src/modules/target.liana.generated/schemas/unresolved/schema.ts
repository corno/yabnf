import * as p_ from 'pareto-core/schema'

// types

namespace Diagram_ {
    
    export type L = Component_
}

type Diagram_ = p_.List<
    Diagram_.L
>

namespace Root_ {
    
    export type one_diagram = Diagram_
    
    export namespace multiple_diagrams {
        
        export type D = Diagram_
    }
    
    export type multiple_diagrams = p_.Dictionary<
        multiple_diagrams.D
    >
}

type Root_ = 
    | readonly ['one diagram', Root_.one_diagram]
    | readonly ['multiple diagrams', Root_.multiple_diagrams]

namespace Component_ {
    
    export type terminal = string
    
    export type non_terminal = string
    
    export type comment = string
    
    export type skip = null
    
    export namespace sequence {
        
        export type L = Component_
    }
    
    export type sequence = p_.List<
        sequence.L
    >
    
    export namespace choice {
        
        export namespace options {
            
            export type L = Component_
        }
        
        export type options = p_.List<
            options.L
        >
    }
    
    export type choice = {
        readonly 'options': choice.options
    }
    
    export namespace optional {
        
        export type item = Component_
        
        export namespace skip {
            
            export type normal = null
            
            export type skip_in_line = null
        }
        
        export type skip = 
            | readonly ['normal', skip.normal]
            | readonly ['skip in line', skip.skip_in_line]
    }
    
    export type optional = {
        readonly 'item': optional.item
        readonly 'skip': optional.skip
    }
    
    export namespace one_or_more {
        
        export type item = Component_
        
        export namespace repeat {
            
            export type O = Component_
        }
        
        export type repeat = p_.Optional_Value<
            repeat.O
        >
    }
    
    export type one_or_more = {
        readonly 'item': one_or_more.item
        readonly 'repeat': one_or_more.repeat
    }
    
    export namespace zero_or_more {
        
        export type item = Component_
        
        export namespace repeat {
            
            export type O = Component_
        }
        
        export type repeat = p_.Optional_Value<
            repeat.O
        >
        
        export namespace skip {
            
            export type normal = null
            
            export type skip_in_line = null
        }
        
        export type skip = 
            | readonly ['normal', skip.normal]
            | readonly ['skip in line', skip.skip_in_line]
    }
    
    export type zero_or_more = {
        readonly 'item': zero_or_more.item
        readonly 'repeat': zero_or_more.repeat
        readonly 'skip': zero_or_more.skip
    }
}

type Component_ = 
    | readonly ['terminal', Component_.terminal]
    | readonly ['non terminal', Component_.non_terminal]
    | readonly ['comment', Component_.comment]
    | readonly ['skip', Component_.skip]
    | readonly ['sequence', Component_.sequence]
    | readonly ['choice', Component_.choice]
    | readonly ['optional', Component_.optional]
    | readonly ['one or more', Component_.one_or_more]
    | readonly ['zero or more', Component_.zero_or_more]

// exported root types
export { 
    type Diagram_ as Diagram, 
    type Root_ as Root, 
    type Component_ as Component, 
}
