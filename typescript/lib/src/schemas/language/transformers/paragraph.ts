import * as p_ from 'pareto-core/transformer'

import * as s_in from "../schema.js"
import * as s_out from "pareto-fountain-pen/modules/paragraph/schemas/paragraph/schema"

import * as sh from "pareto-fountain-pen/modules/paragraph/schemas/paragraph/shorthands/target"

namespace declarations {

    export type Root = p_.Transformer<
        s_in.Root,
        s_out.Paragraph
    >

    export type Value = p_.Transformer<
        s_in.Value,
        s_out.Phrase
    >

}

export const Root: declarations.Root = ($) => sh.pg.sentences(
    p_.literal.segmented_list([
        p_.from.dictionary($.tokens).convert_to_list(
            ($, id) => sh.sentence(
                p_.literal.list([
                    sh.ph.text("t_"),
                    sh.ph.text(id),
                    sh.ph.text(" ::="),
                    sh.ph.text(" \""),
                    sh.ph.text(id),
                    sh.ph.text("\""),
                ])
            )
        ),
        p_.from.dictionary($.productions).convert_to_list(
            ($, id) => sh.sentence(
                p_.literal.list([
                    sh.ph.text("p_"),
                    sh.ph.text(id),
                    sh.ph.text(" ::="),
                    Value($)
                ])
            )
        )
    ])
)

export const Value: declarations.Value = ($) => sh.ph.composed(
    p_.literal.list([
        sh.ph.text(" "),
        p_.from.state($).decide(
            ($) => {
                switch ($[0]) {
                    case 'component': return p_.option($, ($) => sh.ph.composed(
                        p_.literal.list([
                            sh.ph.text("p_"),
                            sh.ph.text($)
                        ])
                    ))
                    case 'group': return p_.option($, ($) => sh.ph.rich_paragraph(
                        p_.from.dictionary($.properties).convert_to_list(
                            ($, id) => sh.sentence(
                                p_.literal.list([
                                    sh.ph.text("/*"),
                                    sh.ph.text(id),
                                    sh.ph.text("*/ "),
                                    Value($)
                                ])
                            )
                        ),
                        sh.ph.text("()"),
                        sh.ph.text("( /*group*/"),
                        sh.ph.nothing(),
                        sh.ph.text(")"),
                    ))
                    case 'list': return p_.option($, ($) => sh.ph.composed(
                        p_.literal.list([
                            sh.ph.text("("),
                            Value($.item),
                            sh.ph.text(" )*")
                        ])
                    ))
                    case 'optional': return p_.option($, ($) => sh.ph.composed(
                        p_.literal.list([
                            sh.ph.text("( /*optional*/"),
                            Value($),
                            sh.ph.text(" )?")
                        ])
                    ))
                    case 'state': return p_.option($, ($) => sh.ph.rich_paragraph(
                        p_.from.dictionary($.options).convert_to_list(
                            ($, id) => sh.sentence(
                                p_.literal.list([
                                    sh.ph.text("/*"),
                                    sh.ph.text(id),
                                    sh.ph.text("*/ "),
                                    Value($)
                                ])
                            )
                        ),
                        sh.ph.text("FIXME_NO_OPTIONS"),
                        sh.ph.text("( /*state*/"),
                        sh.ph.text(" |"),
                        sh.ph.text(")"),
                    ))
                    case 'token': return p_.option($, ($) => sh.ph.composed(
                        p_.literal.list([
                            sh.ph.text("t_"),
                            sh.ph.text($)
                        ])
                    ))
                    default: return p_.exhaustive($[0])
                }
            }
        )
    ])
)