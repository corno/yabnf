import * as p_ from 'pareto-core/transformer';
import * as s_source from "../schema.js";
import * as s_target from "pareto-fountain-pen/modules/paragraph/schemas/serialized/schema";
import * as s_parameters from "pareto-fountain-pen/modules/paragraph/schemas/paragraph_serialization/schema";
export declare namespace declarations {
    type Expression = p_.Transformer_With_Parameter<s_source.Expression, s_target.Lines, s_parameters.Parameters>;
    type Root = p_.Transformer_With_Parameter<s_source.Root, s_target.Lines, s_parameters.Parameters>;
}
export declare const Expression: declarations.Expression;
export declare const Root: declarations.Root;
