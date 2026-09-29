import * as p_ from 'pareto-core/refiner'

// schemas
import * as s_target from "../schema.js"
import * as s_source from "../../unresolved/schema.js"
import * as s_error from "liana-core/modules/resolved_document_deserialization/schemas/resolving/schema"

export namespace declarations {
    
    export type Diagram = p_.Refiner<
        s_target.Diagram,
        s_error.Error,
        s_source.Diagram
    >
    
    export type Root = p_.Refiner<
        s_target.Root,
        s_error.Error,
        s_source.Root
    >
    
    export type Component = p_.Refiner<
        s_target.Component,
        s_error.Error,
        s_source.Component
    >
}

// implementations

export const Diagram: declarations.Diagram = (
    $,
    abort,
) => p_.from.list($).map(
    (
        $,
    ) => Component(
        $,
        abort,
    ),
)

export const Root: declarations.Root = (
    $,
    abort,
) => p_.from.state($).decide(
    (
        $,
    ): s_target.Root => {
        switch ($[0]) {
            case 'one diagram': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['one diagram', Diagram(
                    $,
                    abort,
                )],
            ))
            case 'multiple diagrams': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['multiple diagrams', p_.from.dictionary($).map(
                    (
                        $,
                        id,
                    ) => Diagram(
                        $,
                        abort,
                    ),
                )],
            ))
            default: return p_.exhaustive($[0])
        }
    },
)

export const Component: declarations.Component = (
    $,
    abort,
) => p_.from.state($).decide(
    (
        $,
    ): s_target.Component => {
        switch ($[0]) {
            case 'terminal': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['terminal', $],
            ))
            case 'non terminal': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['non terminal', $],
            ))
            case 'comment': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['comment', $],
            ))
            case 'skip': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['skip', null],
            ))
            case 'sequence': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['sequence', p_.from.list($).map(
                    (
                        $,
                    ) => Component(
                        $,
                        abort,
                    ),
                )],
            ))
            case 'choice': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['choice', {
                    'options': p_.change_context(
                        $['options'],
                        (
                            $,
                        ) => p_.from.list($).map(
                            (
                                $,
                            ) => Component(
                                $,
                                abort,
                            ),
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
                ) => ['optional', {
                    'item': p_.change_context(
                        $['item'],
                        (
                            $,
                        ) => Component(
                            $,
                            abort,
                        ),
                    ),
                    'skip': p_.change_context(
                        $['skip'],
                        (
                            $,
                        ) => p_.from.state($).decide(
                            (
                                $,
                            ): s_target.Component.optional.skip => {
                                switch ($[0]) {
                                    case 'normal': return p_.option($, (
                                        $,
                                    ) => p_.change_context(
                                        $,
                                        (
                                            $,
                                        ) => ['normal', null],
                                    ))
                                    case 'skip in line': return p_.option($, (
                                        $,
                                    ) => p_.change_context(
                                        $,
                                        (
                                            $,
                                        ) => ['skip in line', null],
                                    ))
                                    default: return p_.exhaustive($[0])
                                }
                            },
                        ),
                    ),
                }],
            ))
            case 'one or more': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['one or more', {
                    'item': p_.change_context(
                        $['item'],
                        (
                            $,
                        ) => Component(
                            $,
                            abort,
                        ),
                    ),
                    'repeat': p_.change_context(
                        $['repeat'],
                        (
                            $,
                        ) => p_.from.optional($).map(
                            (
                                $,
                            ) => Component(
                                $,
                                abort,
                            ),
                        ),
                    ),
                }],
            ))
            case 'zero or more': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['zero or more', {
                    'item': p_.change_context(
                        $['item'],
                        (
                            $,
                        ) => Component(
                            $,
                            abort,
                        ),
                    ),
                    'repeat': p_.change_context(
                        $['repeat'],
                        (
                            $,
                        ) => p_.from.optional($).map(
                            (
                                $,
                            ) => Component(
                                $,
                                abort,
                            ),
                        ),
                    ),
                    'skip': p_.change_context(
                        $['skip'],
                        (
                            $,
                        ) => p_.from.state($).decide(
                            (
                                $,
                            ): s_target.Component.zero_or_more.skip => {
                                switch ($[0]) {
                                    case 'normal': return p_.option($, (
                                        $,
                                    ) => p_.change_context(
                                        $,
                                        (
                                            $,
                                        ) => ['normal', null],
                                    ))
                                    case 'skip in line': return p_.option($, (
                                        $,
                                    ) => p_.change_context(
                                        $,
                                        (
                                            $,
                                        ) => ['skip in line', null],
                                    ))
                                    default: return p_.exhaustive($[0])
                                }
                            },
                        ),
                    ),
                }],
            ))
            default: return p_.exhaustive($[0])
        }
    },
)
