import * as p_ from 'pareto-core/transformer'

import * as s_source from "./modules/source.liana.generated/schemas/unresolved/schema.js"
import * as s_target from "./modules/target.liana.generated/schemas/unresolved/schema.js"

namespace declarations {

    export type Root = p_.Transformer<
        s_source.Root,
        s_target.Root
    >

    export type Expression = p_.Transformer<
        s_source.Expression,
        s_target.Component
    >

}

export const Root: declarations.Root = ($) => ['multiple diagrams', p_.from.dictionary($.nonterminals).map(
    ($) => p_.literal.list([
        Expression($)
    ])
)]

export const Expression: declarations.Expression = ($) => p_.from.state($).decide(
    ($): s_target.Component => {
        switch ($[0]) {
            case 'alternation': return p_.option($, ($) => ['choice', {
                'options': p_.from.dictionary($.alternatives).convert_to_list(
                    ($, id): s_target.Component => ['sequence', p_.literal.list([
                        ['comment', "|" + id],
                        Expression($)
                    ])]
                )
            }])
            case 'keyword': return p_.option($, ($) => ['terminal', $])
            case 'nonterminal': return p_.option($, ($) => ['non terminal', $])
            case 'optional': return p_.option($, ($): s_target.Component => ['optional', {
                'item': Expression($),
                'skip': ['normal', null]
            }])
            case 'repetition': return p_.option($, ($): s_target.Component => ['zero or more', { //FIXME: handle the possible trailing separator
                'item': Expression($.item),
                'repeat': p_.from.optional($.separation).map(
                    ($): s_target.Component => ['terminal', $.separator],
                ),
                'skip': ['normal', null]
            }])
            case 'sequence': return p_.option($, ($): s_target.Component => ['sequence', p_.from.dictionary($.elements).convert_to_list(
                ($, id): s_target.Component => ['sequence', p_.literal.list([
                    ['comment', id],
                    Expression($)
                ])]
            )])
            case 'terminal': return p_.option($, ($) => ['terminal', $])
            // default: return p_.exhaustive($[0])
        }
    }
)