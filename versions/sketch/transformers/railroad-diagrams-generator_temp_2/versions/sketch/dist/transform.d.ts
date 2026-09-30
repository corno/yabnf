import * as p_ from 'pareto-core/transformer';
import * as s_source from "./modules/source.liana.generated/schemas/unresolved/schema.js";
import * as s_target from "./modules/target.liana.generated/schemas/unresolved/schema.js";
declare namespace declarations {
    type Root = p_.Transformer<s_source.Root, s_target.Root>;
    type Expression = p_.Transformer<s_source.Expression, s_target.Component>;
}
export declare const Root: declarations.Root;
export declare const Expression: declarations.Expression;
export {};
