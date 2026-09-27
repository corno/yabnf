import * as p_ from 'pareto-core/query'

//interface dependencies
import type * as query_interfaces_file_in_file_out from "pareto-common/modules/file_in_file_out/queries/interfaces"

//data  types
import type * as s_file_in_file_out_query from "pareto-common/modules/file_in_file_out/schemas/query/schema"

//dependencies
import * as t_language_to_paragraph from "../../schemas/language/transformers/paragraph.js"
import * as r_language_from_list_of_characters from "../../modules/language/schemas/unresolved/refiners/list_of_characters.js"
import * as ser_deserialization_to_paragraph from "liana-core/modules/unresolved_document_deserialization/schemas/unresolved_document_deserialization/serializers"

//shorhands
import * as sh from "pareto-fountain-pen/modules/paragraph/schemas/paragraph/shorthands/target"

export const $$: p_.Query_Implementation<
    query_interfaces_file_in_file_out.operation,
    null,
    null
> = p_.query(
    (e, $s, $q) => e.refine(
        ($, abort): s_file_in_file_out_query.Result => ({
            'paragraph': t_language_to_paragraph.Root(
                r_language_from_list_of_characters.Root(
                    $.data,
                    ($) => abort({
                        'message': sh.ph.text(ser_deserialization_to_paragraph.Error($)),
                    }),
                    {
                        'tab size': 4
                    }
                )
            )
        })
    )
)
