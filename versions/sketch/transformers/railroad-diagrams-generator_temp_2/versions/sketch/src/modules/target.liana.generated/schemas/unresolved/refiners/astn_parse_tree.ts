import * as p_ from 'pareto-core/refiner'

// schemas
import * as s_target from "../schema.js"
import * as s_source from "astn-core/modules/deserialization/schemas/parse_tree/schema"
import * as s_error from "liana-core/modules/value_unmarshalling/schemas/unmarshalling/schema"

// refiner dependencies
import * as r_unmarshalled_from_parse_tree from "liana-core/modules/value_unmarshalling/schemas/unmarshalled_value/refiners/astn_parse_tree"

export namespace declarations {
    
    export type Diagram = p_.Refiner<
        s_target.Diagram,
        s_error.Error,
        s_source.Value
    >
    
    export type Root = p_.Refiner<
        s_target.Root,
        s_error.Error,
        s_source.Value
    >
    
    export type Component = p_.Refiner<
        s_target.Component,
        s_error.Error,
        s_source.Value
    >
}

// implementations

export const Diagram: declarations.Diagram = (
    $,
    abort,
) => p_.from.list(r_unmarshalled_from_parse_tree.List(
    $,
    abort,
)['items']).map(
    (
        $,
    ) => p_.change_context(
        $['value'],
        (
            $,
        ) => Component(
            $,
            abort,
        ),
    ),
)

export const Root: declarations.Root = (
    $,
    abort,
) => p_.change_context(
    r_unmarshalled_from_parse_tree.State(
        $,
        abort,
    ),
    (
        $,
    ) => p_.from.text($['option']['token']['value']).to_state(
        (
            $text,
        ): s_target.Root => {
            switch ($text) {
                case "one diagram": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['one diagram', Diagram(
                        $,
                        abort,
                    )],
                )
                case "multiple diagrams": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['multiple diagrams', p_.change_context(
                        r_unmarshalled_from_parse_tree.Dictionary(
                            $,
                            abort,
                        ),
                        (
                            $,
                        ) => p_.from.dictionary($['entries']).map(
                            (
                                $,
                                id,
                            ) => Diagram(
                                $,
                                abort,
                            ),
                        ),
                    )],
                )
                default: return abort(
                    ['liana', {
                        'type': ['state', ['unknown option', $['option']['token']['value']]],
                        'range': $['option']['range'],
                    }],
                )
            }
        },
    ),
)

export const Component: declarations.Component = (
    $,
    abort,
) => p_.change_context(
    r_unmarshalled_from_parse_tree.State(
        $,
        abort,
    ),
    (
        $,
    ) => p_.from.text($['option']['token']['value']).to_state(
        (
            $text,
        ): s_target.Component => {
            switch ($text) {
                case "terminal": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['terminal', r_unmarshalled_from_parse_tree.Text(
                        $,
                        abort,
                    )],
                )
                case "non terminal": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['non terminal', r_unmarshalled_from_parse_tree.Text(
                        $,
                        abort,
                    )],
                )
                case "comment": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['comment', r_unmarshalled_from_parse_tree.Text(
                        $,
                        abort,
                    )],
                )
                case "skip": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['skip', r_unmarshalled_from_parse_tree.Nothing(
                        $,
                        abort,
                    )],
                )
                case "sequence": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['sequence', p_.from.list(r_unmarshalled_from_parse_tree.List(
                        $,
                        abort,
                    )['items']).map(
                        (
                            $,
                        ) => p_.change_context(
                            $['value'],
                            (
                                $,
                            ) => Component(
                                $,
                                abort,
                            ),
                        ),
                    )],
                )
                case "choice": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['choice', p_.change_context(
                        r_unmarshalled_from_parse_tree.Verbose_Group(
                            $,
                            abort,
                            {
                                'expected properties': p_.literal.dictionary({
                                    "options": null,
                                }),
                            },
                        ),
                        (
                            $,
                        ) => ({
                            'options': p_.change_context(
                                r_unmarshalled_from_parse_tree.Property(
                                    $,
                                    abort,
                                    {
                                        'id': 'options',
                                    },
                                ),
                                (
                                    $,
                                ) => p_.from.list(r_unmarshalled_from_parse_tree.List(
                                    $,
                                    abort,
                                )['items']).map(
                                    (
                                        $,
                                    ) => p_.change_context(
                                        $['value'],
                                        (
                                            $,
                                        ) => Component(
                                            $,
                                            abort,
                                        ),
                                    ),
                                ),
                            ),
                        }),
                    )],
                )
                case "optional": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['optional', p_.change_context(
                        r_unmarshalled_from_parse_tree.Verbose_Group(
                            $,
                            abort,
                            {
                                'expected properties': p_.literal.dictionary({
                                    "item": null,
                                    "skip": null,
                                }),
                            },
                        ),
                        (
                            $,
                        ) => ({
                            'item': p_.change_context(
                                r_unmarshalled_from_parse_tree.Property(
                                    $,
                                    abort,
                                    {
                                        'id': 'item',
                                    },
                                ),
                                (
                                    $,
                                ) => Component(
                                    $,
                                    abort,
                                ),
                            ),
                            'skip': p_.change_context(
                                r_unmarshalled_from_parse_tree.Property(
                                    $,
                                    abort,
                                    {
                                        'id': 'skip',
                                    },
                                ),
                                (
                                    $,
                                ) => p_.change_context(
                                    r_unmarshalled_from_parse_tree.State(
                                        $,
                                        abort,
                                    ),
                                    (
                                        $,
                                    ) => p_.from.text($['option']['token']['value']).to_state(
                                        (
                                            $text,
                                        ): s_target.Component.optional.skip => {
                                            switch ($text) {
                                                case "normal": return p_.change_context(
                                                    $['value'],
                                                    (
                                                        $,
                                                    ) => ['normal', r_unmarshalled_from_parse_tree.Nothing(
                                                        $,
                                                        abort,
                                                    )],
                                                )
                                                case "skip in line": return p_.change_context(
                                                    $['value'],
                                                    (
                                                        $,
                                                    ) => ['skip in line', r_unmarshalled_from_parse_tree.Nothing(
                                                        $,
                                                        abort,
                                                    )],
                                                )
                                                default: return abort(
                                                    ['liana', {
                                                        'type': ['state', ['unknown option', $['option']['token']['value']]],
                                                        'range': $['option']['range'],
                                                    }],
                                                )
                                            }
                                        },
                                    ),
                                ),
                            ),
                        }),
                    )],
                )
                case "one or more": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['one or more', p_.change_context(
                        r_unmarshalled_from_parse_tree.Verbose_Group(
                            $,
                            abort,
                            {
                                'expected properties': p_.literal.dictionary({
                                    "item": null,
                                    "repeat": null,
                                }),
                            },
                        ),
                        (
                            $,
                        ) => ({
                            'item': p_.change_context(
                                r_unmarshalled_from_parse_tree.Property(
                                    $,
                                    abort,
                                    {
                                        'id': 'item',
                                    },
                                ),
                                (
                                    $,
                                ) => Component(
                                    $,
                                    abort,
                                ),
                            ),
                            'repeat': p_.change_context(
                                r_unmarshalled_from_parse_tree.Property(
                                    $,
                                    abort,
                                    {
                                        'id': 'repeat',
                                    },
                                ),
                                (
                                    $,
                                ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                                    $,
                                    abort,
                                )['optional']).map(
                                    (
                                        $,
                                    ) => Component(
                                        $,
                                        abort,
                                    ),
                                ),
                            ),
                        }),
                    )],
                )
                case "zero or more": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['zero or more', p_.change_context(
                        r_unmarshalled_from_parse_tree.Verbose_Group(
                            $,
                            abort,
                            {
                                'expected properties': p_.literal.dictionary({
                                    "item": null,
                                    "repeat": null,
                                    "skip": null,
                                }),
                            },
                        ),
                        (
                            $,
                        ) => ({
                            'item': p_.change_context(
                                r_unmarshalled_from_parse_tree.Property(
                                    $,
                                    abort,
                                    {
                                        'id': 'item',
                                    },
                                ),
                                (
                                    $,
                                ) => Component(
                                    $,
                                    abort,
                                ),
                            ),
                            'repeat': p_.change_context(
                                r_unmarshalled_from_parse_tree.Property(
                                    $,
                                    abort,
                                    {
                                        'id': 'repeat',
                                    },
                                ),
                                (
                                    $,
                                ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                                    $,
                                    abort,
                                )['optional']).map(
                                    (
                                        $,
                                    ) => Component(
                                        $,
                                        abort,
                                    ),
                                ),
                            ),
                            'skip': p_.change_context(
                                r_unmarshalled_from_parse_tree.Property(
                                    $,
                                    abort,
                                    {
                                        'id': 'skip',
                                    },
                                ),
                                (
                                    $,
                                ) => p_.change_context(
                                    r_unmarshalled_from_parse_tree.State(
                                        $,
                                        abort,
                                    ),
                                    (
                                        $,
                                    ) => p_.from.text($['option']['token']['value']).to_state(
                                        (
                                            $text,
                                        ): s_target.Component.zero_or_more.skip => {
                                            switch ($text) {
                                                case "normal": return p_.change_context(
                                                    $['value'],
                                                    (
                                                        $,
                                                    ) => ['normal', r_unmarshalled_from_parse_tree.Nothing(
                                                        $,
                                                        abort,
                                                    )],
                                                )
                                                case "skip in line": return p_.change_context(
                                                    $['value'],
                                                    (
                                                        $,
                                                    ) => ['skip in line', r_unmarshalled_from_parse_tree.Nothing(
                                                        $,
                                                        abort,
                                                    )],
                                                )
                                                default: return abort(
                                                    ['liana', {
                                                        'type': ['state', ['unknown option', $['option']['token']['value']]],
                                                        'range': $['option']['range'],
                                                    }],
                                                )
                                            }
                                        },
                                    ),
                                ),
                            ),
                        }),
                    )],
                )
                default: return abort(
                    ['liana', {
                        'type': ['state', ['unknown option', $['option']['token']['value']]],
                        'range': $['option']['range'],
                    }],
                )
            }
        },
    ),
)
