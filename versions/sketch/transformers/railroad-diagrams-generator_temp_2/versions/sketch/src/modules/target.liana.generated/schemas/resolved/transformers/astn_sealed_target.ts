import * as p_ from 'pareto-core/transformer'

// schemas
import * as s_source from "../schema.js"
import * as s_target from "astn-core/modules/serialization/schemas/sealed_target/schema"

// serializer dependencies
import * as ser_primitives from "liana-core/modules/serialization/schemas/primitives/serializers"

export namespace declarations {
    
    export type Diagram = p_.Transformer<
        s_source.Diagram,
        s_target.Value
    >
    
    export type Root = p_.Transformer<
        s_source.Root,
        s_target.Value
    >
    
    export type Component = p_.Transformer<
        s_source.Component,
        s_target.Value
    >
}

// implementations

export const Diagram: declarations.Diagram = (
    $,
) => ['list', p_.from.list($).map(
    (
        $,
    ) => Component(
        $,
    ),
)]

export const Root: declarations.Root = (
    $,
) => ['state', p_.from.state($).decide(
    (
        $,
    ): s_target.Value.state => {
        switch ($[0]) {
            case 'one diagram': return p_.option($, (
                $,
            ) => ({
                'option': 'one diagram',
                'value': Diagram(
                    $,
                ),
            }))
            case 'multiple diagrams': return p_.option($, (
                $,
            ) => ({
                'option': 'multiple diagrams',
                'value': ['dictionary', p_.from.dictionary($).map(
                    (
                        $,
                        id,
                    ) => Diagram(
                        $,
                    ),
                )],
            }))
            default: return p_.exhaustive($[0])
        }
    },
)]

export const Component: declarations.Component = (
    $,
) => ['state', p_.from.state($).decide(
    (
        $,
    ): s_target.Value.state => {
        switch ($[0]) {
            case 'terminal': return p_.option($, (
                $,
            ) => ({
                'option': 'terminal',
                'value': ['text', {
                    'delimiter': ['quote', null],
                    'value': $,
                }],
            }))
            case 'non terminal': return p_.option($, (
                $,
            ) => ({
                'option': 'non terminal',
                'value': ['text', {
                    'delimiter': ['quote', null],
                    'value': $,
                }],
            }))
            case 'comment': return p_.option($, (
                $,
            ) => ({
                'option': 'comment',
                'value': ['text', {
                    'delimiter': ['quote', null],
                    'value': $,
                }],
            }))
            case 'skip': return p_.option($, (
                $,
            ) => ({
                'option': 'skip',
                'value': ['nothing', null],
            }))
            case 'sequence': return p_.option($, (
                $,
            ) => ({
                'option': 'sequence',
                'value': ['list', p_.from.list($).map(
                    (
                        $,
                    ) => Component(
                        $,
                    ),
                )],
            }))
            case 'choice': return p_.option($, (
                $,
            ) => ({
                'option': 'choice',
                'value': ['group', ['verbose', p_.literal.dictionary({
                    "options": p_.change_context(
                        $['options'],
                        (
                            $,
                        ) => ['list', p_.from.list($).map(
                            (
                                $,
                            ) => Component(
                                $,
                            ),
                        )],
                    ),
                })]],
            }))
            case 'optional': return p_.option($, (
                $,
            ) => ({
                'option': 'optional',
                'value': ['group', ['verbose', p_.literal.dictionary({
                    "item": p_.change_context(
                        $['item'],
                        (
                            $,
                        ) => Component(
                            $,
                        ),
                    ),
                    "skip": p_.change_context(
                        $['skip'],
                        (
                            $,
                        ) => ['state', p_.from.state($).decide(
                            (
                                $,
                            ): s_target.Value.state => {
                                switch ($[0]) {
                                    case 'normal': return p_.option($, (
                                        $,
                                    ) => ({
                                        'option': 'normal',
                                        'value': ['nothing', null],
                                    }))
                                    case 'skip in line': return p_.option($, (
                                        $,
                                    ) => ({
                                        'option': 'skip in line',
                                        'value': ['nothing', null],
                                    }))
                                    default: return p_.exhaustive($[0])
                                }
                            },
                        )],
                    ),
                })]],
            }))
            case 'one or more': return p_.option($, (
                $,
            ) => ({
                'option': 'one or more',
                'value': ['group', ['verbose', p_.literal.dictionary({
                    "item": p_.change_context(
                        $['item'],
                        (
                            $,
                        ) => Component(
                            $,
                        ),
                    ),
                    "repeat": p_.change_context(
                        $['repeat'],
                        (
                            $,
                        ) => ['optional', p_.from.optional($).decide(
                            (
                                $,
                            ): s_target.Value.optional => ['set', Component(
                                $,
                            )],
                            (): s_target.Value.optional => ['not set', null],
                        )],
                    ),
                })]],
            }))
            case 'zero or more': return p_.option($, (
                $,
            ) => ({
                'option': 'zero or more',
                'value': ['group', ['verbose', p_.literal.dictionary({
                    "item": p_.change_context(
                        $['item'],
                        (
                            $,
                        ) => Component(
                            $,
                        ),
                    ),
                    "repeat": p_.change_context(
                        $['repeat'],
                        (
                            $,
                        ) => ['optional', p_.from.optional($).decide(
                            (
                                $,
                            ): s_target.Value.optional => ['set', Component(
                                $,
                            )],
                            (): s_target.Value.optional => ['not set', null],
                        )],
                    ),
                    "skip": p_.change_context(
                        $['skip'],
                        (
                            $,
                        ) => ['state', p_.from.state($).decide(
                            (
                                $,
                            ): s_target.Value.state => {
                                switch ($[0]) {
                                    case 'normal': return p_.option($, (
                                        $,
                                    ) => ({
                                        'option': 'normal',
                                        'value': ['nothing', null],
                                    }))
                                    case 'skip in line': return p_.option($, (
                                        $,
                                    ) => ({
                                        'option': 'skip in line',
                                        'value': ['nothing', null],
                                    }))
                                    default: return p_.exhaustive($[0])
                                }
                            },
                        )],
                    ),
                })]],
            }))
            default: return p_.exhaustive($[0])
        }
    },
)]
