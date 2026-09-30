import * as p_ from 'pareto-core/refiner';
import * as s_target from "../schema.js";
import * as s_source from "astn-core/modules/deserialization/schemas/parse_tree/schema";
import * as s_error from "liana-core/modules/value_unmarshalling/schemas/unmarshalling/schema";
export declare namespace declarations {
    type Expression = p_.Refiner<s_target.Expression, s_error.Error, s_source.Value>;
    type Root = p_.Refiner<s_target.Root, s_error.Error, s_source.Value>;
}
export declare const Expression: declarations.Expression;
export declare const Root: declarations.Root;
