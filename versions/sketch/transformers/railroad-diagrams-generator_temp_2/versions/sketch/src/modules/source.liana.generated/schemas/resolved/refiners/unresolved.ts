import * as p_ from 'pareto-core/refiner'

// schemas
import * as s_target from "../schema.js"
import * as s_source from "../../unresolved/schema.js"
import * as s_error from "liana-core/modules/resolved_document_deserialization/schemas/resolving/schema"

export namespace declarations {
    
    export type Expression = p_.Refiner<
        s_target.Expression,
        s_error.Error,
        s_source.Expression
    >
    
    export type Root = p_.Refiner<
        s_target.Root,
        s_error.Error,
        s_source.Root
    >
}

// implementations

export const Expression: declarations.Expression = (
    $,
    abort,
) => p_.from.state($).decide(
    (
        $,
    ): s_target.Expression => {
        switch ($[0]) {
            case 'alternation': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['alternation', {
                    'alternatives': p_.change_context(
                        $['alternatives'],
                        (
                            $,
                        ) => p_.from.dictionary($).map(
                            (
                                $,
                                id,
                            ) => Expression(
                                $,
                                abort,
                            ),
                        ),
                    ),
                }],
            ))
            case 'keyword': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['keyword', $],
            ))
            case 'nonterminal': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['nonterminal', $],
            ))
            case 'optional': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['optional', Expression(
                    $,
                    abort,
                )],
            ))
            case 'repetition': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['repetition', {
                    'item': p_.change_context(
                        $['item'],
                        (
                            $,
                        ) => Expression(
                            $,
                            abort,
                        ),
                    ),
                    'separation': p_.change_context(
                        $['separation'],
                        (
                            $,
                        ) => p_.from.optional($).map(
                            (
                                $,
                            ) => ({
                                'separator': p_.change_context(
                                    $['separator'],
                                    (
                                        $,
                                    ) => $,
                                ),
                                'trailing separator allowed': p_.change_context(
                                    $['trailing separator allowed'],
                                    (
                                        $,
                                    ) => $,
                                ),
                            }),
                        ),
                    ),
                }],
            ))
            case 'sequence': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['sequence', {
                    'elements': p_.change_context(
                        $['elements'],
                        (
                            $,
                        ) => p_.from.dictionary($).map(
                            (
                                $,
                                id,
                            ) => Expression(
                                $,
                                abort,
                            ),
                        ),
                    ),
                }],
            ))
            case 'terminal': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['terminal', $],
            ))
            default: return p_.exhaustive($[0])
        }
    },
)

export const Root: declarations.Root = (
    $,
    abort,
) => ({
    'terminals': p_.change_context(
        $['terminals'],
        (
            $,
        ) => p_.from.dictionary($).map(
            (
                $,
                id,
            ) => null,
        ),
    ),
    'keywords': p_.change_context(
        $['keywords'],
        (
            $,
        ) => p_.from.dictionary($).map(
            (
                $,
                id,
            ) => $,
        ),
    ),
    'nonterminals': p_.change_context(
        $['nonterminals'],
        (
            $,
        ) => p_.from.dictionary($).map(
            (
                $,
                id,
            ) => Expression(
                $,
                abort,
            ),
        ),
    ),
})
