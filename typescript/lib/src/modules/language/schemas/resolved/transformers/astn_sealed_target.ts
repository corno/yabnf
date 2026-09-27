import * as p_ from 'pareto-core/transformer'

// schemas
import * as s_source from "../schema.js"
import * as s_target from "astn-core/modules/serialization/schemas/sealed_target/schema"

// serializer dependencies
import * as ser_primitives from "liana-core/modules/serialization/schemas/primitives/serializers"

export namespace declarations {
    
    export type Value = p_.Transformer<
        s_source.Value,
        s_target.Value
    >
    
    export type Root = p_.Transformer<
        s_source.Root,
        s_target.Value
    >
}

// implementations

export const Value: declarations.Value = (
    $,
) => ['state', p_.from.state($).decide(
    (
        $,
    ): s_target.Value.state => {
        switch ($[0]) {
            case 'component': return p_.option($, (
                $,
            ) => ({
                'option': 'component',
                'value': ['text', {
                    'delimiter': ['quote', null],
                    'value': $,
                }],
            }))
            case 'group': return p_.option($, (
                $,
            ) => ({
                'option': 'group',
                'value': ['group', ['verbose', p_.literal.dictionary({
                    "properties": p_.change_context(
                        $['properties'],
                        (
                            $,
                        ) => ['dictionary', p_.from.dictionary($).map(
                            (
                                $,
                                id,
                            ) => Value(
                                $,
                            ),
                        )],
                    ),
                })]],
            }))
            case 'token': return p_.option($, (
                $,
            ) => ({
                'option': 'token',
                'value': ['text', {
                    'delimiter': ['quote', null],
                    'value': $,
                }],
            }))
            case 'list': return p_.option($, (
                $,
            ) => ({
                'option': 'list',
                'value': ['group', ['verbose', p_.literal.dictionary({
                    "item": p_.change_context(
                        $['item'],
                        (
                            $,
                        ) => Value(
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
                                "trailing allowed": p_.change_context(
                                    $['trailing allowed'],
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
            case 'optional': return p_.option($, (
                $,
            ) => ({
                'option': 'optional',
                'value': Value(
                    $,
                ),
            }))
            case 'state': return p_.option($, (
                $,
            ) => ({
                'option': 'state',
                'value': ['group', ['verbose', p_.literal.dictionary({
                    "options": p_.change_context(
                        $['options'],
                        (
                            $,
                        ) => ['dictionary', p_.from.dictionary($).map(
                            (
                                $,
                                id,
                            ) => Value(
                                $,
                            ),
                        )],
                    ),
                })]],
            }))
            default: return p_.exhaustive($[0])
        }
    },
)]

export const Root: declarations.Root = (
    $,
) => ['group', ['verbose', p_.literal.dictionary({
    "tokens": p_.change_context(
        $['tokens'],
        (
            $,
        ) => ['dictionary', p_.from.dictionary($).map(
            (
                $,
                id,
            ) => ['state', p_.from.state($).decide(
                (
                    $,
                ): s_target.Value.state => {
                    switch ($[0]) {
                        case 'semantic': return p_.option($, (
                            $,
                        ) => ({
                            'option': 'semantic',
                            'value': ['nothing', null],
                        }))
                        case 'syntactic': return p_.option($, (
                            $,
                        ) => ({
                            'option': 'syntactic',
                            'value': ['state', p_.from.state($).decide(
                                (
                                    $,
                                ): s_target.Value.state => {
                                    switch ($[0]) {
                                        case 'word': return p_.option($, (
                                            $,
                                        ) => ({
                                            'option': 'word',
                                            'value': ['nothing', null],
                                        }))
                                        case 'symbol': return p_.option($, (
                                            $,
                                        ) => ({
                                            'option': 'symbol',
                                            'value': ['nothing', null],
                                        }))
                                        default: return p_.exhaustive($[0])
                                    }
                                },
                            )],
                        }))
                        default: return p_.exhaustive($[0])
                    }
                },
            )],
        )],
    ),
    "productions": p_.change_context(
        $['productions'],
        (
            $,
        ) => ['dictionary', p_.from.dictionary($).map(
            (
                $,
                id,
            ) => Value(
                $,
            ),
        )],
    ),
})]]
