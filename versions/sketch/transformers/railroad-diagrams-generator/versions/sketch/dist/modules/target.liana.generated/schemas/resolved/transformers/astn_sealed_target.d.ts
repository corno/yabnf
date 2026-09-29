import * as p_ from 'pareto-core/transformer';
import * as s_source from "../schema.js";
import * as s_target from "astn-core/modules/serialization/schemas/sealed_target/schema";
export declare namespace declarations {
    type Diagram = p_.Transformer<s_source.Diagram, s_target.Value>;
    type Root = p_.Transformer<s_source.Root, s_target.Value>;
    type Component = p_.Transformer<s_source.Component, s_target.Value>;
}
export declare const Diagram: declarations.Diagram;
export declare const Root: declarations.Root;
export declare const Component: declarations.Component;
