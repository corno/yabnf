import * as p_ from 'pareto-core/refiner';
import * as s_target from "../schema.js";
import * as s_source from "astn-core/modules/deserialization/schemas/list_of_characters/schema";
import * as s_error from "liana-core/modules/unresolved_document_deserialization/schemas/unresolved_document_deserialization/schema";
import * as s_parameters from "liana-core/modules/unresolved_document_deserialization/schemas/unresolved_document_deserialization/schema";
export declare namespace declarations {
    type Expression = p_.Refiner_With_Parameter<s_target.Expression, s_error.Error, s_source.List_Of_Characters, s_parameters.Parameters>;
    type Root = p_.Refiner_With_Parameter<s_target.Root, s_error.Error, s_source.List_Of_Characters, s_parameters.Parameters>;
}
export declare const Expression: declarations.Expression;
export declare const Root: declarations.Root;
