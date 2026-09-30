import * as p_ from 'pareto-core/transformer'

// schemas
import * as s_source from "../schema.js"
import * as s_target from "astn-core/modules/serialization/schemas/sealed_target/schema"

// serializer dependencies
import * as ser_primitives from "liana-core/modules/serialization/schemas/primitives/serializers"

export namespace declarations {
    
    export type Expression = p_.Transformer<
        s_source.Expression,
        s_target.Value
    >
    
    export type Root = p_.Transformer<
        s_source.Root,
        s_target.Value
    >
}

// implementations

export const Expression: declarations.Expression = (
    $,
) => ['state', p_.from.state($).decide(
    (
        $,
    ): s_target.Value.state => {
        switch ($[0]) {
            case 'alternation': return p_.option($, (
                $,
            ) => ({
                'option': 'alternation',
                'value': ['group', ['verbose', p_.literal.dictionary({
                    "alternatives": p_.change_context(
                        $['alternatives'],
                        (
                            $,
                        ) => ['dictionary', p_.from.dictionary($).map(
                            (
                                $,
                                id,
                            ) => Expression(
                                $,
                            ),
                        )],
                    ),
                })]],
            }))
            case 'keyword': return p_.option($, (
                $,
            ) => ({
                'option': 'keyword',
                'value': ['text', {
                    'delimiter': ['quote', null],
                    'value': $,
                }],
            }))
            case 'nonterminal': return p_.option($, (
                $,
            ) => ({
                'option': 'nonterminal',
                'value': ['text', {
                    'delimiter': ['quote', null],
                    'value': $,
                }],
            }))
            case 'optional': return p_.option($, (
                $,
            ) => ({
                'option': 'optional',
                'value': Expression(
                    $,
                ),
            }))
            case 'repetition': return p_.option($, (
                $,
            ) => ({
                'option': 'repetition',
                'value': ['group', ['verbose', p_.literal.dictionary({
                    "item": p_.change_context(
                        $['item'],
                        (
                            $,
                        ) => Expression(
                            $,
                        ),
                    ),
                    "separation": p_.change_context(
                        $['separation'],
                        (
                            $,
                        ) => ['optional', p_.from.optional($).decide(
                            (
                                $,
                            ): s_target.Value.optional => ['set', ['group', ['verbose', p_.literal.dictionary({
                                "separator": p_.change_context(
                                    $['separator'],
                                    (
                                        $,
                                    ) => ['text', {
                                        'delimiter': ['quote', null],
                                        'value': $,
                                    }],
                                ),
                                "trailing separator allowed": p_.change_context(
                                    $['trailing separator allowed'],
                                    (
                                        $,
                                    ) => ['text', {
                                        'delimiter': ['none', null],
                                        'value': ser_primitives.true_false(
                                            $,
                                        ),
                                    }],
                                ),
                            })]]],
                            (): s_target.Value.optional => ['not set', null],
                        )],
                    ),
                })]],
            }))
            case 'sequence': return p_.option($, (
                $,
            ) => ({
                'option': 'sequence',
                'value': ['group', ['verbose', p_.literal.dictionary({
                    "elements": p_.change_context(
                        $['elements'],
                        (
                            $,
                        ) => ['dictionary', p_.from.dictionary($).map(
                            (
                                $,
                                id,
                            ) => Expression(
                                $,
                            ),
                        )],
                    ),
                })]],
            }))
            case 'terminal': return p_.option($, (
                $,
            ) => ({
                'option': 'terminal',
                'value': ['text', {
                    'delimiter': ['quote', null],
                    'value': $,
                }],
            }))
            default: return p_.exhaustive($[0])
        }
    },
)]

export const Root: declarations.Root = (
    $,
) => ['group', ['verbose', p_.literal.dictionary({
    "terminals": p_.change_context(
        $['terminals'],
        (
            $,
        ) => ['dictionary', p_.from.dictionary($).map(
            (
                $,
                id,
            ) => ['nothing', null],
        )],
    ),
    "keywords": p_.change_context(
        $['keywords'],
        (
            $,
        ) => ['dictionary', p_.from.dictionary($).map(
            (
                $,
                id,
            ) => ['text', {
                'delimiter': ['quote', null],
                'value': $,
            }],
        )],
    ),
    "nonterminals": p_.change_context(
        $['nonterminals'],
        (
            $,
        ) => ['dictionary', p_.from.dictionary($).map(
            (
                $,
                id,
            ) => Expression(
                $,
            ),
        )],
    ),
})]]
