#!/usr/bin/env node
import * as p_h from 'pareto-core-application/index';
import p_unreachable_code_path from 'pareto-core/transformer/specials/unreachable_code_path';
import * as transformer from "./transform.js";
import * as r_deserialize from "./modules/source.liana.generated/schemas/resolved/refiners/list_of_characters.js";
import * as r_resolve from "./modules/target.liana.generated/schemas/resolved/refiners/unresolved.js";
import * as t_serialize from "./modules/target.liana.generated/schemas/resolved/transformers/serialized_paragraph.js";
import * as ser_resolved_document_deserialization from "liana-core/modules/resolved_document_deserialization/schemas/resolved_document_deserialization/serializers";
import * as ser_resolving from "liana-core/modules/resolved_document_deserialization/schemas/resolving/serializers";
p_h.run_main_transformer(($, abort) => t_serialize.Root(r_resolve.Root(transformer.Root(r_deserialize.Root($, ($) => abort(ser_resolved_document_deserialization.Error($)), {
    'tab size': 4
})), ($) => p_unreachable_code_path("there is an error in the transformer logic: " + ser_resolving.Error($))), {
    'indentation': "    "
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE9BQU8sS0FBSyxHQUFHLE1BQU0sK0JBQStCLENBQUE7QUFDcEQsT0FBTyx1QkFBdUIsTUFBTSx3REFBd0QsQ0FBQTtBQUU1RixPQUFPLEtBQUssV0FBVyxNQUFNLGdCQUFnQixDQUFBO0FBRTdDLE9BQU8sS0FBSyxhQUFhLE1BQU0sa0ZBQWtGLENBQUE7QUFDakgsT0FBTyxLQUFLLFNBQVMsTUFBTSwwRUFBMEUsQ0FBQTtBQUNyRyxPQUFPLEtBQUssV0FBVyxNQUFNLHdGQUF3RixDQUFBO0FBQ3JILE9BQU8sS0FBSyxxQ0FBcUMsTUFBTSw0R0FBNEcsQ0FBQTtBQUNuSyxPQUFPLEtBQUssYUFBYSxNQUFNLG9GQUFvRixDQUFBO0FBR25ILEdBQUcsQ0FBQyxvQkFBb0IsQ0FDcEIsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUMxQixTQUFTLENBQUMsSUFBSSxDQUNWLFdBQVcsQ0FBQyxJQUFJLENBQ1osYUFBYSxDQUFDLElBQUksQ0FDZCxDQUFDLEVBQ0QsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDNUQ7SUFDSSxVQUFVLEVBQUUsQ0FBQztDQUNoQixDQUNKLENBQ0osRUFDRCxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsdUJBQXVCLENBQUMsOENBQThDLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUMxRyxFQUNEO0lBQ0ksYUFBYSxFQUFFLE1BQU07Q0FDeEIsQ0FDSixDQUNKLENBQUEifQ==