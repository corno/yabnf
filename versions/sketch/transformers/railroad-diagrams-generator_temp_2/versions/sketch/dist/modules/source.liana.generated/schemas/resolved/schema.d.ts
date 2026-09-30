import * as p_ from 'pareto-core/schema';
declare namespace Expression_ {
    namespace alternation {
        namespace alternatives {
            type D = Expression_;
        }
        type alternatives = p_.Dictionary<alternatives.D>;
    }
    type alternation = {
        readonly 'alternatives': alternation.alternatives;
    };
    type keyword = string;
    type nonterminal = string;
    type optional = Expression_;
    namespace repetition {
        type item = Expression_;
        namespace separation {
            namespace O {
                type separator = string;
                type trailing_separator_allowed = boolean;
            }
            type O = {
                readonly 'separator': O.separator;
                readonly 'trailing separator allowed': O.trailing_separator_allowed;
            };
        }
        type separation = p_.Optional_Value<separation.O>;
    }
    type repetition = {
        readonly 'item': repetition.item;
        readonly 'separation': repetition.separation;
    };
    namespace sequence {
        namespace elements {
            type D = Expression_;
        }
        type elements = p_.Dictionary<elements.D>;
    }
    type sequence = {
        readonly 'elements': sequence.elements;
    };
    type terminal = string;
}
type Expression_ = readonly ['alternation', Expression_.alternation] | readonly ['keyword', Expression_.keyword] | readonly ['nonterminal', Expression_.nonterminal] | readonly ['optional', Expression_.optional] | readonly ['repetition', Expression_.repetition] | readonly ['sequence', Expression_.sequence] | readonly ['terminal', Expression_.terminal];
declare namespace Root_ {
    namespace terminals {
        type D = null;
    }
    type terminals = p_.Dictionary<terminals.D>;
    namespace keywords {
        type D = string;
    }
    type keywords = p_.Dictionary<keywords.D>;
    namespace nonterminals {
        type D = Expression_;
    }
    type nonterminals = p_.Dictionary<nonterminals.D>;
}
type Root_ = {
    readonly 'terminals': Root_.terminals;
    readonly 'keywords': Root_.keywords;
    readonly 'nonterminals': Root_.nonterminals;
};
export { type Expression_ as Expression, type Root_ as Root, };
