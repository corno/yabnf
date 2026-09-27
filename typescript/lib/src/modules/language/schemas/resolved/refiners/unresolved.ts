import * as p_ from 'pareto-core/refiner'

// schemas
import * as s_target from "../schema.js"
import * as s_source from "../../unresolved/schema.js"
import * as s_error from "liana-core/modules/resolved_document_deserialization/schemas/resolving/schema"

export namespace declarations {
    
    export type Value = p_.Refiner<
        s_target.Value,
        s_error.Error,
        s_source.Value
    >
    
    export type Root = p_.Refiner<
        s_target.Root,
        s_error.Error,
        s_source.Root
    >
}

// implementations

export const Value: declarations.Value = (
    $,
    abort,
) => p_.from.state($).decide(
    (
        $,
    ): s_target.Value => {
        switch ($[0]) {
            case 'component': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['component', $],
            ))
            case 'group': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['group', {
                    'properties': p_.change_context(
                        $['properties'],
                        (
                            $,
                        ) => p_.from.dictionary($).map(
                            (
                                $,
                                id,
                            ) => Value(
                                $,
                                abort,
                            ),
                        ),
                    ),
                }],
            ))
            case 'token': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['token', $],
            ))
            case 'list': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['list', {
                    'item': p_.change_context(
                        $['item'],
                        (
                            $,
                        ) => Value(
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
                                'trailing allowed': p_.change_context(
                                    $['trailing allowed'],
                                    (
                                        $,
                                    ) => $,
                                ),
                            }),
                        ),
                    ),
                }],
            ))
            case 'optional': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['optional', Value(
                    $,
                    abort,
                )],
            ))
            case 'state': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['state', {
                    'options': p_.change_context(
                        $['options'],
                        (
                            $,
                        ) => p_.from.dictionary($).map(
                            (
                                $,
                                id,
                            ) => Value(
                                $,
                                abort,
                            ),
                        ),
                    ),
                }],
            ))
            default: return p_.exhaustive($[0])
        }
    },
)

export const Root: declarations.Root = (
    $,
    abort,
) => ({
    'tokens': p_.change_context(
        $['tokens'],
        (
            $,
        ) => p_.from.dictionary($).map(
            (
                $,
                id,
            ) => p_.from.state($).decide(
                (
                    $,
                ): s_target.Root.tokens.D => {
                    switch ($[0]) {
                        case 'semantic': return p_.option($, (
                            $,
                        ) => p_.change_context(
                            $,
                            (
                                $,
                            ) => ['semantic', null],
                        ))
                        case 'syntactic': return p_.option($, (
                            $,
                        ) => p_.change_context(
                            $,
                            (
                                $,
                            ) => ['syntactic', p_.from.state($).decide(
                                (
                                    $,
                                ): s_target.Root.tokens.D.syntactic => {
                                    switch ($[0]) {
                                        case 'word': return p_.option($, (
                                            $,
                                        ) => p_.change_context(
                                            $,
                                            (
                                                $,
                                            ) => ['word', null],
                                        ))
                                        case 'symbol': return p_.option($, (
                                            $,
                                        ) => p_.change_context(
                                            $,
                                            (
                                                $,
                                            ) => ['symbol', null],
                                        ))
                                        default: return p_.exhaustive($[0])
                                    }
                                },
                            )],
                        ))
                        default: return p_.exhaustive($[0])
                    }
                },
            ),
        ),
    ),
    'productions': p_.change_context(
        $['productions'],
        (
            $,
        ) => p_.from.dictionary($).map(
            (
                $,
                id,
            ) => Value(
                $,
                abort,
            ),
        ),
    ),
})
