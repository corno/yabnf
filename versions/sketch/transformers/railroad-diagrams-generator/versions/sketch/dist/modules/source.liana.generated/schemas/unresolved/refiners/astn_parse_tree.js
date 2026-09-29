import * as p_ from 'pareto-core/refiner';
// schemas
import * as s_target from "../schema.js";
import * as s_source from "astn-core/modules/deserialization/schemas/parse_tree/schema";
import * as s_error from "liana-core/modules/value_unmarshalling/schemas/unmarshalling/schema";
// refiner dependencies
import * as r_unmarshalled_from_parse_tree from "liana-core/modules/value_unmarshalling/schemas/unmarshalled_value/refiners/astn_parse_tree";
// implementations
export const Expression = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.State($, abort), ($) => p_.from.text($['option']['token']['value']).to_state(($text) => {
    switch ($text) {
        case "alternation": return p_.change_context($['value'], ($) => ['alternation', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group($, abort, {
                'expected properties': p_.literal.dictionary({
                    "alternatives": null,
                }),
            }), ($) => ({
                'alternatives': p_.change_context(r_unmarshalled_from_parse_tree.Property($, abort, {
                    'id': 'alternatives',
                }), ($) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary($, abort), ($) => p_.from.dictionary($['entries']).map(($, id) => Expression($, abort)))),
            }))]);
        case "keyword": return p_.change_context($['value'], ($) => ['keyword', r_unmarshalled_from_parse_tree.Text($, abort)]);
        case "nonterminal": return p_.change_context($['value'], ($) => ['nonterminal', r_unmarshalled_from_parse_tree.Text($, abort)]);
        case "optional": return p_.change_context($['value'], ($) => ['optional', Expression($, abort)]);
        case "repetition": return p_.change_context($['value'], ($) => ['repetition', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group($, abort, {
                'expected properties': p_.literal.dictionary({
                    "item": null,
                    "separation": null,
                }),
            }), ($) => ({
                'item': p_.change_context(r_unmarshalled_from_parse_tree.Property($, abort, {
                    'id': 'item',
                }), ($) => Expression($, abort)),
                'separation': p_.change_context(r_unmarshalled_from_parse_tree.Property($, abort, {
                    'id': 'separation',
                }), ($) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional($, abort)['optional']).map(($) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group($, abort, {
                    'expected properties': p_.literal.dictionary({
                        "separator": null,
                        "trailing separator allowed": null,
                    }),
                }), ($) => ({
                    'separator': p_.change_context(r_unmarshalled_from_parse_tree.Property($, abort, {
                        'id': 'separator',
                    }), ($) => r_unmarshalled_from_parse_tree.Text($, abort)),
                    'trailing separator allowed': p_.change_context(r_unmarshalled_from_parse_tree.Property($, abort, {
                        'id': 'trailing separator allowed',
                    }), ($) => r_unmarshalled_from_parse_tree.Boolean($, abort, {
                        'type': ['true/false', null],
                    })),
                })))),
            }))]);
        case "sequence": return p_.change_context($['value'], ($) => ['sequence', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group($, abort, {
                'expected properties': p_.literal.dictionary({
                    "elements": null,
                }),
            }), ($) => ({
                'elements': p_.change_context(r_unmarshalled_from_parse_tree.Property($, abort, {
                    'id': 'elements',
                }), ($) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary($, abort), ($) => p_.from.dictionary($['entries']).map(($, id) => Expression($, abort)))),
            }))]);
        case "terminal": return p_.change_context($['value'], ($) => ['terminal', r_unmarshalled_from_parse_tree.Text($, abort)]);
        default: return abort(['liana', {
                'type': ['state', ['unknown option', $['option']['token']['value']]],
                'range': $['option']['range'],
            }]);
    }
}));
export const Root = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group($, abort, {
    'expected properties': p_.literal.dictionary({
        "terminals": null,
        "keywords": null,
        "nonterminals": null,
    }),
}), ($) => ({
    'terminals': p_.change_context(r_unmarshalled_from_parse_tree.Property($, abort, {
        'id': 'terminals',
    }), ($) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary($, abort), ($) => p_.from.dictionary($['entries']).map(($, id) => r_unmarshalled_from_parse_tree.Nothing($, abort)))),
    'keywords': p_.change_context(r_unmarshalled_from_parse_tree.Property($, abort, {
        'id': 'keywords',
    }), ($) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary($, abort), ($) => p_.from.dictionary($['entries']).map(($, id) => r_unmarshalled_from_parse_tree.Text($, abort)))),
    'nonterminals': p_.change_context(r_unmarshalled_from_parse_tree.Property($, abort, {
        'id': 'nonterminals',
    }), ($) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary($, abort), ($) => p_.from.dictionary($['entries']).map(($, id) => Expression($, abort)))),
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN0bl9wYXJzZV90cmVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvc291cmNlLmxpYW5hLmdlbmVyYXRlZC9zY2hlbWFzL3VucmVzb2x2ZWQvcmVmaW5lcnMvYXN0bl9wYXJzZV90cmVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxFQUFFLE1BQU0scUJBQXFCLENBQUE7QUFFekMsVUFBVTtBQUNWLE9BQU8sS0FBSyxRQUFRLE1BQU0sY0FBYyxDQUFBO0FBQ3hDLE9BQU8sS0FBSyxRQUFRLE1BQU0sNkRBQTZELENBQUE7QUFDdkYsT0FBTyxLQUFLLE9BQU8sTUFBTSxxRUFBcUUsQ0FBQTtBQUU5Rix1QkFBdUI7QUFDdkIsT0FBTyxLQUFLLDhCQUE4QixNQUFNLDRGQUE0RixDQUFBO0FBaUI1SSxrQkFBa0I7QUFFbEIsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUE0QixDQUMvQyxDQUFDLEVBQ0QsS0FBSyxFQUNQLEVBQUUsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUNsQiw4QkFBOEIsQ0FBQyxLQUFLLENBQ2hDLENBQUMsRUFDRCxLQUFLLENBQ1IsRUFDRCxDQUNJLENBQUMsRUFDSCxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUNyRCxDQUNJLEtBQUssRUFDYyxFQUFFO0lBQ3JCLFFBQVEsS0FBSyxFQUFFLENBQUM7UUFDWixLQUFLLGFBQWEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FDeEMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUNWLENBQ0ksQ0FBQyxFQUNILEVBQUUsQ0FBQyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsY0FBYyxDQUNsQyw4QkFBOEIsQ0FBQyxhQUFhLENBQ3hDLENBQUMsRUFDRCxL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