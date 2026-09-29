import * as p_ from 'pareto-core/refiner';
import * as s_target from "../schema.js";
import * as s_source from "../../unresolved/schema.js";
import * as s_error from "liana-core/modules/resolved_document_deserialization/schemas/resolving/schema";
export declare namespace declarations {
    type Expression = p_.Refiner<s_target.Expression, s_error.Error, s_source.Expression>;
    type Root = p_.Refiner<s_target.Root, s_error.Error, s_source.Root>;
}
export declare const Expression: declarations.Expression;
export declare const Root: declarations.Root;
