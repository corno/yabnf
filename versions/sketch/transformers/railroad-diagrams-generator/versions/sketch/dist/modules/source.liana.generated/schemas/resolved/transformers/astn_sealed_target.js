import * as p_ from 'pareto-core/transformer';
// schemas
import * as s_source from "../schema.js";
import * as s_target from "astn-core/modules/serialization/schemas/sealed_target/schema";
// serializer dependencies
import * as ser_primitives from "liana-core/modules/serialization/schemas/primitives/serializers";
// implementations
export const Expression = ($) => ['state', p_.from.state($).decide(($) => {
        switch ($[0]) {
            case 'alternation': return p_.option($, ($) => ({
                'option': 'alternation',
                'value': ['group', ['verbose', p_.literal.dictionary({
                            "alternatives": p_.change_context($['alternatives'], ($) => ['dictionary', p_.from.dictionary($).map(($, id) => Expression($))]),
                        })]],
            }));
            case 'keyword': return p_.option($, ($) => ({
                'option': 'keyword',
                'value': ['text', {
                        'delimiter': ['quote', null],
                        'value': $,
                    }],
            }));
            case 'nonterminal': return p_.option($, ($) => ({
                'option': 'nonterminal',
                'value': ['text', {
                        'delimiter': ['quote', null],
                        'value': $,
                    }],
            }));
            case 'optional': return p_.option($, ($) => ({
                'option': 'optional',
                'value': Expression($),
            }));
            case 'repetition': return p_.option($, ($) => ({
                'option': 'repetition',
                'value': ['group', ['verbose', p_.literal.dictionary({
                            "item": p_.change_context($['item'], ($) => Expression($)),
                            "separation": p_.change_context($['separation'], ($) => ['optional', p_.from.optional($).decide(($) => ['set', ['group', ['verbose', p_.literal.dictionary({
                                                "separator": p_.change_context($['separator'], ($) => ['text', {
                                                        'delimiter': ['quote', null],
                                                        'value': $,
                                                    }]),
                                                "trailing separator allowed": p_.change_context($['trailing separator allowed'], ($) => ['text', {
                                                        'delimiter': ['none', null],
                                                        'value': ser_primitives.true_false($),
                                                    }]),
                                            })]]], () => ['not set', null])]),
                        })]],
            }));
            case 'sequence': return p_.option($, ($) => ({
                'option': 'sequence',
                'value': ['group', ['verbose', p_.literal.dictionary({
                            "elements": p_.change_context($['elements'], ($) => ['dictionary', p_.from.dictionary($).map(($, id) => Expression($))]),
                        })]],
            }));
            case 'terminal': return p_.option($, ($) => ({
                'option': 'terminal',
                'value': ['text', {
                        'delimiter': ['quote', null],
                        'value': $,
                    }],
            }));
            default: return p_.exhaustive($[0]);
        }
    })];
export const Root = ($) => ['group', ['verbose', p_.literal.dictionary({
            "terminals": p_.change_context($['terminals'], ($) => ['dictionary', p_.from.dictionary($).map(($, id) => ['nothing', null])]),
            "keywords": p_.change_context($['keywords'], ($) => ['dictionary', p_.from.dictionary($).map(($, id) => ['text', {
                        'delimiter': ['quote', null],
                        'value': $,
                    }])]),
            "nonterminals": p_.change_context($['nonterminals'], ($) => ['dictionary', p_.from.dictionary($).map(($, id) => Expression($))]),
        })]];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN0bl9zZWFsZWRfdGFyZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvc291cmNlLmxpYW5hLmdlbmVyYXRlZC9zY2hlbWFzL3Jlc29sdmVkL3RyYW5zZm9ybWVycy9hc3RuX3NlYWxlZF90YXJnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQTtBQUU3QyxVQUFVO0FBQ1YsT0FBTyxLQUFLLFFBQVEsTUFBTSxjQUFjLENBQUE7QUFDeEMsT0FBTyxLQUFLLFFBQVEsTUFBTSw4REFBOEQsQ0FBQTtBQUV4RiwwQkFBMEI7QUFDMUIsT0FBTyxLQUFLLGNBQWMsTUFBTSxpRUFBaUUsQ0FBQTtBQWVqRyxrQkFBa0I7QUFFbEIsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUE0QixDQUMvQyxDQUFDLEVBQ0gsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FDbEMsQ0FDSSxDQUFDLEVBQ21CLEVBQUU7UUFDdEIsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNYLEtBQUssYUFBYSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUNwQyxDQUFDLEVBQ0gsRUFBRSxDQUFDLENBQUM7Z0JBQ0YsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQzs0QkFDakQsY0FBYyxFQUFFLEVBQUUsQ0FBQyxjQUFjLENBQzdCLENBQUMsQ0FBQyxjQUFjLENBQUMsRUFDakIsQ0FDSSxDQUFDLEVBQ0gsRUFBRSxDQUFDLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFD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