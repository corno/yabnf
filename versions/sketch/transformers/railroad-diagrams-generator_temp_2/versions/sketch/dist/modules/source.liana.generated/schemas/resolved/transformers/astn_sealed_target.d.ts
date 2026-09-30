import * as p_ from 'pareto-core/transformer';
import * as s_source from "../schema.js";
import * as s_target from "astn-core/modules/serialization/schemas/sealed_target/schema";
export declare namespace declarations {
    type Expression = p_.Transformer<s_source.Expression, s_target.Value>;
    type Root = p_.Transformer<s_source.Root, s_target.Value>;
}
export declare const Expression: declarations.Expression;
export declare const Root: declarations.Root;
