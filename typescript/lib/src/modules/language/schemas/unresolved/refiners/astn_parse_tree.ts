import * as p_ from 'pareto-core/refiner'

// schemas
import * as s_target from "../schema.js"
import * as s_source from "astn-core/modules/deserialization/schemas/parse_tree/schema"
import * as s_error from "liana-core/modules/value_unmarshalling/schemas/unmarshalling/schema"

// refiner dependencies
import * as r_unmarshalled_from_parse_tree from "liana-core/modules/value_unmarshalling/schemas/unmarshalled_value/refiners/astn_parse_tree"

export namespace declarations {
    
    export type Value = p_.Refiner<
        s_target.Value,
        s_error.Error,
        s_source.Value
    >
    
    export type Root = p_.Refiner<
        s_target.Root,
        s_error.Error,
        s_source.Value
    >
}

// implementations

export const Value: declarations.Value = (
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
        ): s_target.Value => {
            switch ($text) {
                case "component": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['component', r_unmarshalled_from_parse_tree.Text(
                        $,
                        abort,
                    )],
                )
                case "group": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['group', p_.change_context(
                        r_unmarshalled_from_parse_tree.Verbose_Group(
                            $,
                            abort,
                            {
                                'expected properties': p_.literal.dictionary({
                                    "properties": null,
                                }),
                            },
                        ),
                        (
                            $,
                        ) => ({
                            'properties': p_.change_context(
                                r_unmarshalled_from_parse_tree.Property(
                                    $,
                                    abort,
                                    {
                                        'id': 'properties',
                                    },
                                ),
                                (
                                    $,
                                ) => p_.change_context(
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
                                        ) => Value(
                                            $,
                                            abort,
                                        ),
                                    ),
                                ),
                            ),
                        }),
                    )],
                )
                case "token": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['token', r_unmarshalled_from_parse_tree.Text(
                        $,
                        abort,
                    )],
                )
                case "list": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['list', p_.change_context(
                        r_unmarshalled_from_parse_tree.Verbose_Group(
                            $,
                            abort,
                            {
                                'expected properties': p_.literal.dictionary({
                                    "item": null,
                                    "separation": null,
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
                                ) => Value(
                                    $,
                                    abort,
                                ),
                            ),
                            'separation': p_.change_context(
                                r_unmarshalled_from_parse_tree.Property(
                                    $,
                                    abort,
                                    {
                                        'id': 'separation',
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
                                    ) => p_.change_context(
                                        r_unmarshalled_from_parse_tree.Verbose_Group(
                                            $,
                                            abort,
                                            {
                                                'expected properties': p_.literal.dictionary({
                                                    "separator": null,
                                                    "trailing allowed": null,
                                                }),
                                            },
                                        ),
                                        (
                                            $,
                                        ) => ({
                                            'separator': p_.change_context(
                                                r_unmarshalled_from_parse_tree.Property(
                                                    $,
                                                    abort,
                                                    {
                                                        'id': 'separator',
                                                    },
                                                ),
                                                (
                                                    $,
                                                ) => r_unmarshalled_from_parse_tree.Text(
                                                    $,
                                                    abort,
                                                ),
                                            ),
                                            'trailing allowed': p_.change_context(
                                                r_unmarshalled_from_parse_tree.Property(
                                                    $,
                                                    abort,
                                                    {
                                                        'id': 'trailing allowed',
                                                    },
                                                ),
                                                (
                                                    $,
                                                ) => r_unmarshalled_from_parse_tree.Boolean(
                                                    $,
                                                    abort,
                                                    {
                                                        'type': ['true/false', null],
                                                    },
                                                ),
                                            ),
                                        }),
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
                    ) => ['optional', Value(
                        $,
                        abort,
                    )],
                )
                case "state": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['state', p_.change_context(
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
                                ) => p_.change_context(
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
                                        ) => Value(
                                            $,
                                            abort,
                                        ),
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

export const Root: declarations.Root = (
    $,
    abort,
) => p_.change_context(
    r_unmarshalled_from_parse_tree.Verbose_Group(
        $,
        abort,
        {
            'expected properties': p_.literal.dictionary({
                "tokens": null,
                "productions": null,
            }),
        },
    ),
    (
        $,
    ) => ({
        'tokens': p_.change_context(
            r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'tokens',
                },
            ),
            (
                $,
            ) => p_.change_context(
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
                            ): s_target.Root.tokens.D => {
                                switch ($text) {
                                    case "semantic": return p_.change_context(
                                        $['value'],
                                        (
                                            $,
                                        ) => ['semantic', r_unmarshalled_from_parse_tree.Nothing(
                                            $,
                                            abort,
                                        )],
                                    )
                                    case "syntactic": return p_.change_context(
                                        $['value'],
                                        (
                                            $,
                                        ) => ['syntactic', p_.change_context(
                                            r_unmarshalled_from_parse_tree.State(
                                                $,
                                                abort,
                                            ),
                                            (
                                                $,
                                            ) => p_.from.text($['option']['token']['value']).to_state(
                                                (
                                                    $text,
                                                ): s_target.Root.tokens.D.syntactic => {
                                                    switch ($text) {
                                                        case "word": return p_.change_context(
                                                            $['value'],
                                                            (
                                                                $,
                                                            ) => ['word', r_unmarshalled_from_parse_tree.Nothing(
                                                                $,
                                                                abort,
                                                            )],
                                                        )
                                                        case "symbol": return p_.change_context(
                                                            $['value'],
                                                            (
                                                                $,
                                                            ) => ['symbol', r_unmarshalled_from_parse_tree.Nothing(
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
            ),
        ),
        'productions': p_.change_context(
            r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'productions',
                },
            ),
            (
                $,
            ) => p_.change_context(
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
                    ) => Value(
                        $,
                        abort,
                    ),
                ),
            ),
        ),
    }),
)
