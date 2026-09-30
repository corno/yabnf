import * as p_ from 'pareto-core/refiner'

// schemas
import * as s_target from "../schema.js"
import * as s_source from "astn-core/modules/deserialization/schemas/parse_tree/schema"
import * as s_error from "liana-core/modules/value_unmarshalling/schemas/unmarshalling/schema"

// refiner dependencies
import * as r_unmarshalled_from_parse_tree from "liana-core/modules/value_unmarshalling/schemas/unmarshalled_value/refiners/astn_parse_tree"

export namespace declarations {
    
    export type Expression = p_.Refiner<
        s_target.Expression,
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

export const Expression: declarations.Expression = (
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
        ): s_target.Expression => {
            switch ($text) {
                case "alternation": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['alternation', p_.change_context(
                        r_unmarshalled_from_parse_tree.Verbose_Group(
                            $,
                            abort,
                            {
                                'expected properties': p_.literal.dictionary({
                                    "alternatives": null,
                                }),
                            },
                        ),
                        (
                            $,
                        ) => ({
                            'alternatives': p_.change_context(
                                r_unmarshalled_from_parse_tree.Property(
                                    $,
                                    abort,
                                    {
                                        'id': 'alternatives',
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
                                        ) => Expression(
                                            $,
                                            abort,
                                        ),
                                    ),
                                ),
                            ),
                        }),
                    )],
                )
                case "keyword": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['keyword', r_unmarshalled_from_parse_tree.Text(
                        $,
                        abort,
                    )],
                )
                case "nonterminal": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['nonterminal', r_unmarshalled_from_parse_tree.Text(
                        $,
                        abort,
                    )],
                )
                case "optional": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['optional', Expression(
                        $,
                        abort,
                    )],
                )
                case "repetition": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['repetition', p_.change_context(
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
                                ) => Expression(
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
                                                    "trailing separator allowed": null,
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
                                            'trailing separator allowed': p_.change_context(
                                                r_unmarshalled_from_parse_tree.Property(
                                                    $,
                                                    abort,
                                                    {
                                                        'id': 'trailing separator allowed',
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
                case "sequence": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['sequence', p_.change_context(
                        r_unmarshalled_from_parse_tree.Verbose_Group(
                            $,
                            abort,
                            {
                                'expected properties': p_.literal.dictionary({
                                    "elements": null,
                                }),
                            },
                        ),
                        (
                            $,
                        ) => ({
                            'elements': p_.change_context(
                                r_unmarshalled_from_parse_tree.Property(
                                    $,
                                    abort,
                                    {
                                        'id': 'elements',
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
                                        ) => Expression(
                                            $,
                                            abort,
                                        ),
                                    ),
                                ),
                            ),
                        }),
                    )],
                )
                case "terminal": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['terminal', r_unmarshalled_from_parse_tree.Text(
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
                "terminals": null,
                "keywords": null,
                "nonterminals": null,
            }),
        },
    ),
    (
        $,
    ) => ({
        'terminals': p_.change_context(
            r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'terminals',
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
                    ) => r_unmarshalled_from_parse_tree.Nothing(
                        $,
                        abort,
                    ),
                ),
            ),
        ),
        'keywords': p_.change_context(
            r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'keywords',
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
                    ) => r_unmarshalled_from_parse_tree.Text(
                        $,
                        abort,
                    ),
                ),
            ),
        ),
        'nonterminals': p_.change_context(
            r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'nonterminals',
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
                    ) => Expression(
                        $,
                        abort,
                    ),
                ),
            ),
        ),
    }),
)
