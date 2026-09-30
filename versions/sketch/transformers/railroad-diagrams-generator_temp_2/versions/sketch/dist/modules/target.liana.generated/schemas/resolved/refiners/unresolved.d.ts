import * as p_ from 'pareto-core/refiner';
import * as s_target from "../schema.js";
import * as s_source from "../../unresolved/schema.js";
import * as s_error from "liana-core/modules/resolved_document_deserialization/schemas/resolving/schema";
export declare namespace declarations {
    type Diagram = p_.Refiner<s_target.Diagram, s_error.Error, s_source.Diagram>;
    type Root = p_.Refiner<s_target.Root, s_error.Error, s_source.Root>;
    type Component = p_.Refiner<s_target.Component, s_error.Error, s_source.Component>;
}
export declare const Diagram: declarations.Diagram;
export declare const Root: declarations.Root;
export declare const Component: declarations.Component;
