import * as p_ from 'pareto-core/refiner'

// schemas
import * as s_target from "../schema.js"
import * as s_source from "astn-core/modules/deserialization/schemas/list_of_characters/schema"
import * as s_error from "liana-core/modules/resolved_document_deserialization/schemas/resolved_document_deserialization/schema"
import * as s_parameters from "liana-core/modules/resolved_document_deserialization/schemas/resolved_document_deserialization/schema"

// refiner dependencies
import * as r_from_unresolved from "./unresolved.js"
import * as r_unresolved_from_list_of_characters from "../../unresolved/refiners/list_of_characters.js"

export namespace declarations {
    
    export type Diagram = p_.Refiner_With_Parameter<
        s_target.Diagram,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Root = p_.Refiner_With_Parameter<
        s_target.Root,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Component = p_.Refiner_With_Parameter<
        s_target.Component,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
}

// implementations

export const Diagram: declarations.Diagram = (
    $,
    abort,
    $p,
) => r_from_unresolved.Diagram(
    r_unresolved_from_list_of_characters.Diagram(
        $,
        (
            $,
        ) => abort(['unresolved document deserialization', $]),
        $p,
    ),
    (
        $,
    ) => abort(['resolving', $]),
)

export const Root: declarations.Root = (
    $,
    abort,
    $p,
) => r_from_unresolved.Root(
    r_unresolved_from_list_of_characters.Root(
        $,
        (
            $,
        ) => abort(['unresolved document deserialization', $]),
        $p,
    ),
    (
        $,
    ) => abort(['resolving', $]),
)

export const Component: declarations.Component = (
    $,
    abort,
    $p,
) => r_from_unresolved.Component(
    r_unresolved_from_list_of_characters.Component(
        $,
        (
            $,
        ) => abort(['unresolved document deserialization', $]),
        $p,
    ),
    (
        $,
    ) => abort(['resolving', $]),
)
