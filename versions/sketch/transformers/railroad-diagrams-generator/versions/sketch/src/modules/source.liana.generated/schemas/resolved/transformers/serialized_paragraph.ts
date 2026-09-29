import * as p_ from 'pareto-core/transformer'

// schemas
import * as s_source from "../schema.js"
import * as s_target from "pareto-fountain-pen/modules/paragraph/schemas/serialized/schema"
import * as s_parameters from "pareto-fountain-pen/modules/paragraph/schemas/paragraph_serialization/schema"

// transformer dependencies
import * as t_to_sealed_target from "./astn_sealed_target.js"
import * as t_sealed_target_to_serialized_paragraph from "astn-core/modules/serialization/schemas/sealed_target/transformers/serialized_paragraph"

export namespace declarations {
    
    export type Expression = p_.Transformer_With_Parameter<
        s_source.Expression,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Root = p_.Transformer_With_Parameter<
        s_source.Root,
        s_target.Lines,
        s_parameters.Parameters
    >
}

// implementations

export const Expression: declarations.Expression = (
    $,
    $p,
) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Expression(
        $,
    ),
    $p,
)

export const Root: declarations.Root = (
    $,
    $p,
) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Root(
        $,
    ),
    $p,
)
